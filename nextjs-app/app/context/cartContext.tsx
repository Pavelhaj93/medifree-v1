"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  clampQuantity,
  MAX_QUANTITY,
  productKind,
  type ProductKind,
} from "@/app/lib/shop/kinds";
import { reconcileCart, type ServerProduct } from "@/app/lib/shop/cart";

type CartImage = { asset?: { _ref?: string } | null; alt?: string | null } | null;

export type CartItem = {
  id: string;
  kind: ProductKind;
  title: string;
  price: number;
  quantity: number;
  category?: string | null;
  slug?: string | null;
  image?: CartImage;
  /** Physical product that went out of stock after it was added. */
  unavailable?: boolean;
};

export type AddResult = { added: number; max: number };

export type PacketaPoint = { id: string; name: string; address: string };

/** Anything product-shaped coming from a Sanity query. */
export type CartProductInput = {
  _id: string;
  title?: string | null;
  price?: number | null;
  category?: string | null;
  slug?: string | { current?: string } | null;
  image?: unknown;
};

type CartContextType = {
  /** False until the saved cart has been read from localStorage. */
  isLoaded: boolean;
  items: CartItem[];
  itemCount: number;
  total: number;
  hasPhysical: boolean;
  hasVoucher: boolean;
  addItem: (product: CartProductInput, quantity?: number) => AddResult;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  packetaPoint: PacketaPoint | null;
  setPacketaPoint: (point: PacketaPoint | null) => void;
  syncWithServer: (products: ServerProduct[]) => { removed: string[]; repriced: string[] };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "__medifree-cart-v2";
const LEGACY_KEY = "__medifree-cart";

function toCartItem(product: CartProductInput, quantity: number): CartItem {
  const kind = productKind(product.category);
  const slug = typeof product.slug === "string" ? product.slug : product.slug?.current;
  return {
    id: product._id,
    kind,
    title: product.title ?? "",
    price: product.price ?? 0,
    quantity: clampQuantity(kind, quantity),
    category: product.category ?? null,
    slug: slug ?? null,
    image: (product.image as CartImage) ?? null,
  };
}

function loadCart(): { items: CartItem[]; packetaPoint: PacketaPoint | null } {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { items: parsed.items ?? [], packetaPoint: parsed.packetaPoint ?? null };
    }
    // Carts saved before quantities existed held whole product objects.
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      localStorage.removeItem(LEGACY_KEY);
      const products = (JSON.parse(legacy) as CartProductInput[]).filter((p) => p?._id);
      return { items: products.map((p) => toCartItem(p, 1)), packetaPoint: null };
    }
  } catch {
    // Corrupt or unavailable storage: start with an empty cart.
  }
  return { items: [], packetaPoint: null };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [packetaPoint, setPacketaPoint] = useState<PacketaPoint | null>(null);
  const [loaded, setLoaded] = useState(false);
  // Latest items for callbacks that must report what actually happened (e.g. capped quantity).
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    const saved = loadCart();
    setItems(saved.items);
    setPacketaPoint(saved.packetaPoint);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, packetaPoint }));
    } catch {
      // Storage full or blocked: the cart still works for this visit.
    }
  }, [items, packetaPoint, loaded]);

  const addItem = useCallback((product: CartProductInput, quantity = 1): AddResult => {
    const kind = productKind(product.category);
    const current = itemsRef.current.find((i) => i.id === product._id)?.quantity ?? 0;
    const added = clampQuantity(kind, current + quantity) - current;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product._id);
      if (existing) {
        return prev.map((i) =>
          i.id === product._id
            ? { ...i, quantity: clampQuantity(i.kind, i.quantity + quantity) }
            : i,
        );
      }
      return [...prev, toCartItem(product, quantity)];
    });
    return { added: Math.max(added, 0), max: MAX_QUANTITY[kind] };
  }, []);

  const syncWithServer = useCallback((products: ServerProduct[]) => {
    const result = reconcileCart(itemsRef.current, products);
    if (result.changed) setItems(result.items);
    return { removed: result.removed, repriced: result.repriced };
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: clampQuantity(i.kind, quantity) } : i)),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    // Child effects (the success page) run before the provider has loaded the saved cart,
    // so clear storage directly; otherwise the load would bring the old items back.
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_KEY);
    } catch {}
    setItems([]);
    setPacketaPoint(null);
  }, []);

  const value = useMemo<CartContextType>(() => {
    const isInCart = (id: string) => items.some((i) => i.id === id);
    return {
      isLoaded: loaded,
      items,
      itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      hasPhysical: items.some((i) => i.kind === "physical"),
      hasVoucher: items.some((i) => i.kind === "voucher"),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      isInCart,
      packetaPoint,
      setPacketaPoint,
      syncWithServer,
    };
  }, [loaded, items, packetaPoint, addItem, setQuantity, removeItem, clearCart, syncWithServer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
