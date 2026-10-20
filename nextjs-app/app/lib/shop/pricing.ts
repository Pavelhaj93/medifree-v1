import { clampQuantity, productKind, type ProductKind } from "./kinds";

export type CheckoutRequestItem = { id: string; quantity: number };

export type PricedProduct = {
  _id: string;
  title: string | null;
  category: string | null;
  price: number | null;
  isAvailable?: boolean | null;
};

export type CheckoutLine = {
  productId: string;
  title: string;
  kind: ProductKind;
  quantity: number;
  unitPrice: number;
};

export class CheckoutError extends Error {
  constructor(
    message: string,
    /** Cart items the customer has to remove (deleted or out of stock). */
    readonly invalidIds: string[] = [],
  ) {
    super(message);
  }
}

/**
 * Turns what the browser asked for into priced lines using only data from Sanity.
 * Throws CheckoutError with a customer-facing Czech message when something is off.
 */
export function buildCheckoutLines(
  requested: CheckoutRequestItem[],
  products: PricedProduct[],
): CheckoutLine[] {
  const quantities = new Map<string, number>();
  for (const item of requested) {
    quantities.set(item.id, (quantities.get(item.id) ?? 0) + item.quantity);
  }

  const byId = new Map(products.map((p) => [p._id, p]));
  const lines: CheckoutLine[] = [];

  const missing: string[] = [];
  const unavailable: { id: string; title: string }[] = [];

  for (const [id, quantity] of quantities) {
    const product = byId.get(id);
    if (!product || product.price == null || !product.title) {
      missing.push(id);
      continue;
    }
    const kind = productKind(product.category);
    if (kind === "physical" && product.isAvailable === false) {
      unavailable.push({ id, title: product.title });
      continue;
    }
    lines.push({
      productId: product._id,
      title: product.title,
      kind,
      quantity: clampQuantity(kind, quantity),
      unitPrice: product.price,
    });
  }

  if (unavailable.length > 0) {
    const titles = unavailable.map((u) => `„${u.title}“`).join(", ");
    throw new CheckoutError(
      `${titles} momentálně není skladem. Odeberte to prosím z košíku.`,
      [...unavailable.map((u) => u.id), ...missing],
    );
  }
  if (missing.length > 0) {
    throw new CheckoutError(
      "Některý produkt v košíku už není v nabídce. Odeberte ho prosím z košíku.",
      missing,
    );
  }

  return lines;
}

export function summarizeLines(lines: CheckoutLine[]) {
  const kinds = Array.from(new Set(lines.map((l) => l.kind))).sort();
  return {
    kinds,
    hasPhysical: kinds.includes("physical"),
    hasVoucher: kinds.includes("voucher"),
    hasDigital: kinds.includes("digital"),
    itemsTotal: lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
  };
}

export function toMinorUnits(amountCzk: number): number {
  return Math.round(amountCzk * 100);
}
