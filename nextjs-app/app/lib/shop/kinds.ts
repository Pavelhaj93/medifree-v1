export type ProductKind = "digital" | "physical" | "voucher";

export const PHYSICAL_CATEGORY = "Fyzické produkty";
export const VOUCHER_CATEGORY = "Dárkové poukazy";

// Same order as the category list in the Studio product schema.
export const PRODUCT_CATEGORIES = [
  "Ebooky",
  "Audionahrávky",
  "Video kurzy",
  "Ebook + Audio",
  "Balíčky",
  PHYSICAL_CATEGORY,
  VOUCHER_CATEGORY,
];

export function productKind(category?: string | null): ProductKind {
  if (category === PHYSICAL_CATEGORY) return "physical";
  if (category === VOUCHER_CATEGORY) return "voucher";
  return "digital";
}

// Digital goods are delivered once per order, so buying two copies makes no sense.
export const MAX_QUANTITY: Record<ProductKind, number> = {
  digital: 1,
  physical: 20,
  voucher: 10,
};

export function clampQuantity(kind: ProductKind, quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY[kind]);
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("cs-CZ", { maximumFractionDigits: 2 })} Kč`;
}
