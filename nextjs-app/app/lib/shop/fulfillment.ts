import "server-only";

import type Stripe from "stripe";
import { studioUrl } from "@/sanity/lib/api";
import { getWriteClient, serverClient } from "@/sanity/lib/writeClient";
import {
  fulfillmentProductsQuery,
  shopLegalDocumentsQuery,
  shopSettingsQuery,
} from "@/sanity/queries/shop";
import type {
  FulfillmentProductsQueryResult,
  ShopLegalDocumentsQueryResult,
  ShopSettingsQueryResult,
} from "@/sanity.types";
import { sendMail, shopAdminEmail } from "@/app/lib/email";
import { getDeliveryFiles, uniqueFiles, type DeliveryFile } from "./delivery";
import { adminOrderEmail, customerOrderEmail, type OrderEmailData } from "./emails";
import { productKind, type ProductKind } from "./kinds";
import { renderVoucherPdf } from "./voucherPdf";
import { voucherCode, voucherDocId, voucherValidUntil } from "./vouchers";

type Line = {
  key: string;
  productId: string | null;
  title: string;
  kind: ProductKind;
  quantity: number;
  unitPrice: number;
};

export const orderIdForSession = (sessionId: string) => `order-${sessionId}`;
export const orderNumberForSession = (sessionId: string) => sessionId.slice(-8).toUpperCase();

/**
 * Idempotent: Stripe may deliver the same event several times. The order document is created
 * once (fixed _id) and emails are only sent while `emailsSentAt` is empty.
 */
export async function fulfillCheckoutSession(stripe: Stripe, sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    return { status: "not-paid" as const };
  }

  const write = getWriteClient();
  const orderId = orderIdForSession(session.id);
  const existing = await write.getDocument<{ emailsSentAt?: string }>(orderId);
  if (existing?.emailsSentAt) {
    return { status: "already-fulfilled" as const };
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });

  const lines: Line[] = lineItems.data.map((item, index) => {
    const product = item.price?.product as Stripe.Product | undefined;
    const productId = product?.metadata?.product_id || null;
    return {
      key: `line-${index}`,
      productId,
      title: item.description ?? product?.name ?? "Produkt",
      kind: (product?.metadata?.kind as ProductKind) || productKind(product?.metadata?.category),
      quantity: item.quantity ?? 1,
      unitPrice: (item.price?.unit_amount ?? 0) / 100,
    };
  });

  const productIds = lines.map((l) => l.productId).filter((id): id is string => !!id);
  const [products, settings, legalDocuments] = await Promise.all([
    serverClient.fetch<FulfillmentProductsQueryResult>(fulfillmentProductsQuery, { ids: productIds }),
    serverClient.fetch<ShopSettingsQueryResult>(shopSettingsQuery),
    serverClient.fetch<ShopLegalDocumentsQueryResult>(shopLegalDocumentsQuery),
  ]);
  const productById = new Map(products.map((p) => [p._id, p]));

  const createdAt = new Date(session.created * 1000);
  const customerEmail = session.customer_details?.email ?? session.customer_email;
  if (!customerEmail) throw new Error(`Session ${session.id} has no customer email`);

  const customer = {
    name: session.customer_details?.name ?? null,
    email: customerEmail,
    phone: session.customer_details?.phone ?? null,
  };
  const hasPhysical = lines.some((l) => l.kind === "physical");
  const meta = session.metadata ?? {};
  const shipping = hasPhysical
    ? {
        label: meta.shipping_label || settings?.packetaLabel || "Zásilkovna",
        price: (session.shipping_cost?.amount_total ?? 0) / 100,
        pointId: meta.packeta_point_id ?? "",
        pointName: meta.packeta_point_name ?? "",
        pointAddress: meta.packeta_point_address ?? "",
      }
    : null;
  const total = (session.amount_total ?? 0) / 100;
  const orderNumber = orderNumberForSession(session.id);

  await write.createIfNotExists({
    _id: orderId,
    _type: "order",
    orderNumber,
    // Digital-only orders need no action from Medifree.
    status: hasPhysical ? "new" : "completed",
    createdAt: createdAt.toISOString(),
    livemode: session.livemode,
    stripeSessionId: session.id,
    customer,
    shipping: shipping
      ? {
          method: shipping.label,
          price: shipping.price,
          packetaPointId: shipping.pointId,
          packetaPointName: shipping.pointName,
          packetaPointAddress: shipping.pointAddress,
        }
      : undefined,
    items: lines.map((l) => ({
      _key: l.key,
      _type: "orderItem",
      product: l.productId ? { _type: "reference", _ref: l.productId, _weak: true } : undefined,
      title: l.title,
      kind: l.kind,
      quantity: l.quantity,
      unitPrice: l.unitPrice,
    })),
    total,
  });

  // Vouchers: one document + one PDF per piece. Codes are deterministic, so retries reuse them.
  const dedication =
    session.custom_fields?.find((f) => f.key === "dedication")?.text?.value?.trim() || null;
  const voucherSecret = process.env.VOUCHER_SECRET ?? "";
  const vouchers: OrderEmailData["vouchers"] = [];
  const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
  const downloads: DeliveryFile[] = [];

  for (const [lineIndex, line] of lines.entries()) {
    const product = line.productId ? productById.get(line.productId) : undefined;

    if (line.kind === "digital" && product) {
      downloads.push(...getDeliveryFiles(product));
    }

    if (line.kind !== "voucher") continue;

    for (const guide of product?.voucherGuides ?? []) {
      downloads.push(...getDeliveryFiles(guide));
    }

    const validUntil = voucherValidUntil(createdAt, product?.voucherValidityMonths ?? 12);
    for (let piece = 0; piece < line.quantity; piece++) {
      const code = voucherCode(voucherSecret, session.id, lineIndex, piece);
      await write.createIfNotExists({
        _id: voucherDocId(session.id, lineIndex, piece),
        _type: "voucher",
        code,
        status: "valid",
        validUntil,
        title: line.title,
        product: line.productId ? { _type: "reference", _ref: line.productId, _weak: true } : undefined,
        dedication: dedication ?? undefined,
        buyerName: customer.name ?? undefined,
        buyerEmail: customer.email,
        order: { _type: "reference", _ref: orderId, _weak: true },
        purchasedAt: createdAt.toISOString(),
        livemode: session.livemode,
      });
      vouchers.push({ code, title: line.title, validUntil, dedication });
      attachments.push({
        filename: `darkovy-poukaz-${code}.pdf`,
        contentType: "application/pdf",
        content: await renderVoucherPdf({
          code,
          title: line.title,
          includes: product?.voucherIncludes,
          dedication,
          validUntil,
          backgroundUrl: product?.voucherBackgroundUrl,
        }),
      });
    }
  }

  const emailData: OrderEmailData = {
    orderNumber,
    customer,
    lines: lines.map(({ title, kind, quantity, unitPrice }) => ({ title, kind, quantity, unitPrice })),
    shipping,
    total,
    dispatchTime: settings?.dispatchTime,
    downloads: uniqueFiles(downloads),
    vouchers,
    voucherRedeemInfo: settings?.voucherRedeemInfo,
    legalDocuments: legalDocuments ?? [],
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.medifree.cz",
    // studioUrl falls back to localhost when NEXT_PUBLIC_SANITY_STUDIO_URL is missing; a link
    // to localhost in a production email would only confuse Medifree.
    studioOrderUrl:
      process.env.NODE_ENV === "production" && studioUrl.includes("localhost")
        ? null
        : `${studioUrl.replace(/\/$/, "")}/intent/edit/id=${orderId};type=order/`,
  };

  const customerMail = customerOrderEmail(emailData);
  await sendMail({
    to: customer.email,
    replyTo: shopAdminEmail(),
    subject: customerMail.subject,
    html: customerMail.html,
    attachments,
  });

  if (hasPhysical || vouchers.length > 0) {
    const adminMail = adminOrderEmail(emailData);
    await sendMail({
      to: shopAdminEmail(),
      replyTo: customer.email,
      subject: adminMail.subject,
      html: adminMail.html,
      attachments,
    });
  }

  await write.patch(orderId).set({ emailsSentAt: new Date().toISOString() }).commit();
  return { status: "fulfilled" as const, orderId };
}
