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

// What the customer sees in the e-shop menu and filter (product.shopCategory). Independent of the
// product type above, which only decides delivery. Same order as the list in the Studio product schema.
export const SHOP_CATEGORIES = [
  { value: "Výhodné balíčky", hint: "Zvýhodněné sady produktů" },
  { value: "Diagnostika", hint: "Senzory, glukometry a další měření" },
  { value: "Doplňky stravy", hint: "Doplňky pro každodenní podporu" },
  { value: "Spánek a cirkadiánní rytmus", hint: "Pro kvalitní spánek a zdravý denní rytmus" },
  { value: "Non-toxic", hint: "Produkty bez zbytečné chemie" },
  { value: VOUCHER_CATEGORY, hint: "PDF poukaz e-mailem" },
  { value: "Ostatní", hint: "Další užitečné pomůcky" },
  { value: "Digitální obsah", hint: "E-booky, webináře, vedené meditace" },
] as const;

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
