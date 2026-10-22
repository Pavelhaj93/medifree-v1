type GroupableProduct = {
  _id: string;
  price: number | null;
  isAvailable?: boolean | null;
  variantGroup?: string | null;
  variantLabel?: string | null;
};

export type ProductListEntry<T> = {
  product: T;
  /** All products of the flavor group (just the product itself when it has no group). */
  members: T[];
  /** Number of distinct flavors in the group. */
  variantCount: number;
  minPrice: number | null;
};

/**
 * One entry per flavor group (plus every product without a group), in the order the first
 * member appears. The group is represented by its cheapest available flavor.
 */
export function groupVariants<T extends GroupableProduct>(products: T[]): ProductListEntry<T>[] {
  const groups = new Map<string, T[]>();
  const order: (string | T)[] = [];

  for (const product of products) {
    const key = product.variantGroup?.trim();
    if (!key) {
      order.push(product);
      continue;
    }
    if (!groups.has(key)) {
      groups.set(key, []);
      order.push(key);
    }
    groups.get(key)!.push(product);
  }

  return order.map((entry) => {
    if (typeof entry !== "string") {
      return { product: entry, members: [entry], variantCount: 1, minPrice: entry.price };
    }
    const members = groups.get(entry)!;
    const byPrice = [...members].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    const representative = byPrice.find((m) => m.isAvailable !== false) ?? byPrice[0];
    return {
      product: representative,
      members,
      variantCount: new Set(members.map((m) => m.variantLabel ?? m._id)).size,
      minPrice: byPrice[0].price,
    };
  });
}

export function pricePer100g(price: number | null | undefined, netWeight: number | null | undefined) {
  if (!price || !netWeight) return null;
  return Math.round((price / netWeight) * 100);
}

/** "500 g" → 500, "1 kg" → 1000, so packs can be sorted by size. Unknown formats sort last. */
export function packGrams(pack?: string | null) {
  const m = pack?.replace(",", ".").match(/([\d.]+)\s*(kg|g)/i);
  if (!m) return Number.MAX_SAFE_INTEGER;
  return parseFloat(m[1]) * (m[2].toLowerCase() === "kg" ? 1000 : 1);
}
