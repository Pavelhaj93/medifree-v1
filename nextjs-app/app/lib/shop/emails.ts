import { escapeHtml, escapeMultiline } from "@/app/lib/html";
import { formatPrice, type ProductKind } from "./kinds";
import type { DeliveryFile } from "./delivery";
import type { DeliveryType } from "./shipping";
import { formatCzechDate } from "./vouchers";

export type OrderEmailData = {
  orderNumber: string;
  customer: { name?: string | null; email: string; phone?: string | null };
  lines: { title: string; kind: ProductKind; quantity: number; unitPrice: number }[];
  shipping?: {
    /** Missing on orders created before personal pickup existed: those are Zásilkovna. */
    type?: DeliveryType;
    label: string;
    price: number;
    pointName: string;
    /** Zásilkovna point address, or the pickup address. */
    pointAddress: string;
    pointId: string;
    /** How personal pickup works (Settings → E-shop). */
    info?: string | null;
  } | null;
  total: number;
  dispatchTime?: string | null;
  downloads: DeliveryFile[];
  vouchers: { code: string; title: string; validUntil: string; dedication?: string | null }[];
  voucherRedeemInfo?: string | null;
  legalDocuments: { title: string | null; url: string | null }[];
  siteUrl: string;
  studioOrderUrl?: string | null;
};

const BRAND = "#034c4c";
const ACCENT = "#e3f5f7";

function layout(title: string, body: string, siteUrl: string) {
  return `
<div style="background:#f5f9f9;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1b2b2b;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
    <div style="background:${BRAND};color:#ffffff;padding:20px 28px;font-size:20px;font-weight:bold;">Medifree</div>
    <div style="padding:28px;">
      <h1 style="font-size:22px;margin:0 0 16px;">${escapeHtml(title)}</h1>
      ${body}
      <hr style="margin:28px 0 16px;border:none;height:1px;background:#e5eded;">
      <p style="color:#5e7373;font-size:13px;margin:0;">S pozdravem<br>Tým Medifree<br>
        <a href="${escapeHtml(siteUrl)}" style="color:${BRAND};">www.medifree.cz</a></p>
    </div>
  </div>
</div>`;
}

function section(title: string, inner: string) {
  return `<h2 style="font-size:16px;margin:24px 0 8px;color:${BRAND};">${escapeHtml(title)}</h2>${inner}`;
}

function itemsTable(data: OrderEmailData) {
  const rows = data.lines
    .map(
      (l) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #eef3f3;">${l.quantity}× ${escapeHtml(l.title)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eef3f3;text-align:right;white-space:nowrap;">${formatPrice(l.unitPrice * l.quantity)}</td>
      </tr>`,
    )
    .join("");
  const shippingRow = data.shipping
    ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eef3f3;">Doprava: ${escapeHtml(data.shipping.label)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eef3f3;text-align:right;">${formatPrice(data.shipping.price)}</td></tr>`
    : "";
  return `<table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}${shippingRow}
    <tr><td style="padding:10px 0;font-weight:bold;">Celkem</td>
      <td style="padding:10px 0;font-weight:bold;text-align:right;white-space:nowrap;">${formatPrice(data.total)}</td></tr>
  </table>`;
}

function downloadsList(files: DeliveryFile[]) {
  return `<ul style="padding-left:18px;margin:0;">${files
    .map(
      (f) =>
        `<li style="margin:6px 0;"><a href="${escapeHtml(f.url)}" style="color:${BRAND};">${escapeHtml(f.label)}</a></li>`,
    )
    .join("")}</ul>`;
}

function vouchersList(data: OrderEmailData) {
  return `<table style="width:100%;border-collapse:collapse;font-size:15px;">${data.vouchers
    .map(
      (v) => `<tr><td style="padding:10px 12px;background:${ACCENT};border-radius:8px;">
        <div style="font-family:'Courier New',monospace;font-size:18px;font-weight:bold;letter-spacing:2px;">${escapeHtml(v.code)}</div>
        <div style="font-size:13px;color:#5e7373;">${escapeHtml(v.title)} · platný do ${formatCzechDate(v.validUntil)}${
          v.dedication ? ` · věnování: „${escapeHtml(v.dedication)}“` : ""
        }</div></td></tr><tr><td style="height:8px;"></td></tr>`,
    )
    .join("")}</table>`;
}

export function customerOrderEmail(data: OrderEmailData) {
  const hasPhysical = !!data.shipping;
  const parts: string[] = [
    `<p style="margin:0 0 8px;">Děkujeme za vaši objednávku č. <strong>${escapeHtml(data.orderNumber)}</strong>. Platba proběhla v pořádku.</p>`,
    section("Shrnutí objednávky", itemsTable(data)),
  ];

  if (data.downloads.length > 0) {
    parts.push(
      section(
        "Ke stažení",
        `<p style="margin:0 0 8px;">Vaše soubory a videa jsou připravené – stačí kliknout na odkaz:</p>${downloadsList(data.downloads)}`,
      ),
    );
  }

  if (data.vouchers.length > 0) {
    parts.push(
      section(
        data.vouchers.length > 1 ? "Dárkové poukazy" : "Dárkový poukaz",
        `<p style="margin:0 0 10px;">${
          data.vouchers.length > 1 ? "Poukazy najdete" : "Poukaz najdete"
        } v příloze jako PDF – můžete ho vytisknout nebo poslat obdarovanému.</p>
        ${vouchersList(data)}
        ${data.voucherRedeemInfo ? `<p style="margin:8px 0 0;">${escapeMultiline(data.voucherRedeemInfo)}</p>` : ""}`,
      ),
    );
  }

  if (hasPhysical && data.shipping?.type === "pickup") {
    parts.push(
      section(
        "Osobní odběr",
        `<p style="margin:0;">${escapeHtml(data.shipping.label)}<br>
          <strong>${escapeHtml(data.shipping.pointAddress)}</strong></p>
        ${data.shipping.info ? `<p style="margin:8px 0 0;">${escapeMultiline(data.shipping.info)}</p>` : ""}`,
      ),
    );
  } else if (hasPhysical && data.shipping) {
    parts.push(
      section(
        "Doručení",
        `<p style="margin:0;">${escapeHtml(data.shipping.label)}<br>
          <strong>${escapeHtml(data.shipping.pointName)}</strong><br>${escapeHtml(data.shipping.pointAddress)}</p>
        ${data.dispatchTime ? `<p style="margin:8px 0 0;">${escapeHtml(data.dispatchTime)}. Jakmile zásilku předáme Zásilkovně, pošle vám e-mail se sledováním zásilky.</p>` : ""}`,
      ),
    );
  }

  const legalLinks = data.legalDocuments
    .filter((d) => d.url)
    .map((d) => `<a href="${escapeHtml(d.url)}" style="color:${BRAND};">${escapeHtml(d.title)}</a>`)
    .join(", ");
  parts.push(
    section(
      "Obchodní podmínky",
      `<p style="margin:0;font-size:14px;color:#5e7373;">Objednávka se řídí našimi obchodními podmínkami${
        legalLinks ? ` (${legalLinks})` : ""
      }. Najdete v nich i poučení o odstoupení od smlouvy a reklamační řád. Na tento e-mail můžete odpovědět, pokud máte jakýkoli dotaz.</p>`,
    ),
  );

  return {
    subject: `Potvrzení objednávky č. ${data.orderNumber} – Medifree`,
    html: layout("Děkujeme za objednávku", parts.join(""), data.siteUrl),
  };
}

export function adminOrderEmail(data: OrderEmailData) {
  const parts: string[] = [
    `<p style="margin:0 0 8px;">Objednávka č. <strong>${escapeHtml(data.orderNumber)}</strong></p>`,
    section(
      "Zákazník",
      `<p style="margin:0;">${escapeHtml(data.customer.name || "–")}<br>${escapeHtml(data.customer.email)}<br>${escapeHtml(
        data.customer.phone || "telefon neuveden",
      )}</p>`,
    ),
    section("Položky", itemsTable(data)),
  ];

  if (data.shipping?.type === "pickup") {
    parts.push(
      section(
        "Osobní odběr – připravit k vyzvednutí",
        `<p style="margin:0;">Zákazník si zboží vyzvedne osobně (${escapeHtml(data.shipping.pointAddress)}).
          Až bude objednávka připravená, domluvte s ním termín – e-mailem nebo na telefonu výše.</p>`,
      ),
    );
  } else if (data.shipping) {
    parts.push(
      section(
        "Zásilkovna – údaje pro podání zásilky",
        `<p style="margin:0;">Výdejní místo: <strong>${escapeHtml(data.shipping.pointName)}</strong><br>
          ${escapeHtml(data.shipping.pointAddress)}<br>ID místa: <strong>${escapeHtml(data.shipping.pointId)}</strong></p>`,
      ),
    );
  }

  if (data.vouchers.length > 0) {
    parts.push(section("Vystavené poukazy", vouchersList(data)));
  }

  if (data.studioOrderUrl) {
    parts.push(
      `<p style="margin:24px 0 0;"><a href="${escapeHtml(data.studioOrderUrl)}" style="display:inline-block;background:${BRAND};color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;">Otevřít objednávku v Sanity</a></p>`,
    );
  }

  const what = [
    data.shipping ? (data.shipping.type === "pickup" ? "osobní odběr" : "zboží k odeslání") : null,
    data.vouchers.length ? "dárkový poukaz" : null,
  ]
    .filter(Boolean)
    .join(" + ");

  return {
    subject: `Nová objednávka č. ${data.orderNumber}${what ? ` (${what})` : ""}`,
    html: layout("Nová objednávka z e-shopu", parts.join(""), data.siteUrl),
  };
}
