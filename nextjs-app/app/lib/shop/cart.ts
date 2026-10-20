import { productKind } from "./kinds";

type ReconcilableItem = {
  id: string;
  title: string;
  price: number;
  unavailable?: boolean;
};

export type ServerProduct = {
  _id: string;
  title: string | null;
  price: number | null;
  category: string | null;
  isAvailable?: boolean | null;
};

/**
 * Brings a browser cart in line with Sanity: current prices and titles, products that no
 * longer exist are dropped and out-of-stock physical products are flagged.
 */
export function reconcileCart<T extends ReconcilableItem>(items: T[], products: ServerProduct[]) {
  const byId = new Map(products.map((p) => [p._id, p]));
  const removed: string[] = [];
  const repriced: string[] = [];

  let changed = false;
  const next = items.flatMap((item) => {
    const product = byId.get(item.id);
    if (!product || product.price == null || !product.title) {
      removed.push(item.title);
      changed = true;
      return [];
    }
    if (product.price !== item.price) repriced.push(product.title);
    const unavailable =
      productKind(product.category) === "physical" && product.isAvailable === false;
    if (
      product.price !== item.price ||
      product.title !== item.title ||
      unavailable !== Boolean(item.unavailable)
    ) {
      changed = true;
    }
    return [{ ...item, title: product.title, price: product.price, unavailable }];
  });

  return { items: next, removed, repriced, changed };
}
