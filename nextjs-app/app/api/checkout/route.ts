import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { urlForImage } from "@/sanity/lib/utils";
import { serverClient } from "@/sanity/lib/writeClient";
import { checkoutProductsQuery, shopSettingsQuery } from "@/sanity/queries/shop";
import type { CheckoutProductsQueryResult, ShopSettingsQueryResult } from "@/sanity.types";
import {
  buildCheckoutLines,
  CheckoutError,
  summarizeLines,
  toMinorUnits,
} from "@/app/lib/shop/pricing";
import { deliveryOption } from "@/app/lib/shop/shipping";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const requestSchema = z.preprocess(
  // Accept the pre-2026-10 payload ({ items: Product[], customerEmail }) from carts still open in a browser.
  (raw) => {
    if (!raw || typeof raw !== "object") return raw;
    const body = raw as Record<string, unknown>;
    const items = Array.isArray(body.items)
      ? body.items.map((i: Record<string, unknown>) => ({
          id: i?.id ?? i?._id,
          quantity: i?.quantity ?? 1,
        }))
      : body.items;
    return { ...body, email: body.email ?? body.customerEmail, items };
  },
  z.object({
    email: z.email(),
    items: z
      .array(z.object({ id: z.string().min(1), quantity: z.number().int().min(1).max(50) }))
      .min(1)
      .max(50),
    delivery: z.enum(["packeta", "pickup"]).default("packeta"),
    packetaPoint: z
      .object({
        id: z.string().min(1).max(50),
        name: z.string().max(300),
        address: z.string().max(450),
      })
      .nullish(),
  }),
);

function errorResponse(message: string, status = 400, invalidIds?: string[]) {
  return NextResponse.json({ error: message, invalidIds }, { status });
}

export async function POST(req: NextRequest) {
  const parsed = requestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return errorResponse("Zkontrolujte prosím e-mail a obsah košíku.");
  }
  const { email, items, delivery, packetaPoint } = parsed.data;

  // Same host the customer is on: production, a Vercel preview or localhost.
  const baseUrl = req.nextUrl.origin;

  try {
    const [products, shop] = await Promise.all([
      serverClient.fetch<CheckoutProductsQueryResult>(checkoutProductsQuery, {
        ids: items.map((i) => i.id),
      }),
      serverClient.fetch<ShopSettingsQueryResult>(shopSettingsQuery),
    ]);
    const lines = buildCheckoutLines(items, products);
    const summary = summarizeLines(lines);
    const imageById = new Map(products.map((p) => [p._id, p.image]));

    const shipping = summary.hasPhysical ? deliveryOption(shop, delivery) : undefined;
    if (summary.hasPhysical && !shipping) {
      return errorResponse("Osobní odběr teď nenabízíme. Vyberte prosím doručení Zásilkovnou.");
    }
    if (shipping?.type === "packeta" && !packetaPoint) {
      return errorResponse("Pro dokončení objednávky vyberte výdejní místo Zásilkovny.");
    }
    if (shipping && shipping.price == null) {
      console.error("Shipping price is not set in Sanity (Settings → E-shop)");
      return errorResponse("Doprava teď nejde objednat. Kontaktujte nás prosím na info@medifree.cz.");
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      locale: "cs",
      success_url: `${baseUrl}/uspech?session_id={CHECKOUT_SESSION_ID}&types=${summary.kinds.join(",")}${
        shipping?.type === "pickup" ? "&delivery=pickup" : ""
      }`,
      cancel_url: `${baseUrl}/kosik`,
      customer_email: email,
      billing_address_collection: "required",
      invoice_creation: { enabled: true },
      line_items: lines.map((line) => {
        const imageUrl = urlForImage(imageById.get(line.productId))?.width(600).url();
        return {
          quantity: line.quantity,
          price_data: {
            currency: "czk",
            unit_amount: toMinorUnits(line.unitPrice),
            product_data: {
              name: line.title,
              images: imageUrl ? [imageUrl] : undefined,
              metadata: { product_id: line.productId, kind: line.kind },
            },
          },
        };
      }),
      metadata: {
        kinds: summary.kinds.join(","),
        ...(shipping ? { shipping_type: shipping.type, shipping_label: shipping.label } : {}),
        ...(shipping?.type === "packeta" && packetaPoint
          ? {
              packeta_point_id: packetaPoint.id,
              packeta_point_name: packetaPoint.name,
              packeta_point_address: packetaPoint.address,
            }
          : {}),
        ...(shipping?.type === "pickup" ? { pickup_address: shipping.address ?? "" } : {}),
      },
      custom_text: {
        submit: {
          message: "Odesláním objednávky souhlasíte s obchodními podmínkami Medifree.",
        },
      },
    };

    if (shipping) {
      params.phone_number_collection = { enabled: true };
      params.shipping_options = [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: shipping.label,
            fixed_amount: { amount: toMinorUnits(shipping.price ?? 0), currency: "czk" }, // checked above
          },
        },
      ];
    }

    if (summary.hasVoucher) {
      params.custom_fields = [
        {
          key: "dedication",
          label: { type: "custom", custom: "Věnování na poukaz (nepovinné)" },
          type: "text",
          optional: true,
          text: { maximum_length: 255 },
        },
      ];
    }

    // Requires the terms-of-service URL to be set in Stripe Dashboard → Settings → Public details.
    if (process.env.STRIPE_TERMS_CONSENT === "true") {
      params.consent_collection = { terms_of_service: "required" };
    }

    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof CheckoutError) {
      return errorResponse(err.message, 400, err.invalidIds);
    }
    console.error("Stripe checkout failed:", err);
    return errorResponse("Nastala chyba při přesměrování na platbu. Zkuste to prosím znovu.", 500);
  }
}
