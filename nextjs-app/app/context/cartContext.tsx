"use client";

import { Product } from "@/sanity.types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

type CartContextType = {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
  itemExists: (title: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartKey = "__medifree-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(cartKey);
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(items));
    if (items.length > 0) {
      const last = items[items.length - 1];
    }
  }, [items]);

  const addItem = (item: Product) => {
    console.log("Adding item to cart:", item.title);
    setItems((prev) => {
      const exists = prev.find((i) => i?.title === item?.title);
      if (exists) return prev; // don’t add duplicates
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i?._id !== id));
  };

  const itemExists = (title: string) => {
    return items.some((i) => i?.title === title);
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + (i?.price ?? 0), 0);
  const tax = total - total / 1.21;
  const subtotal = total / 1.21;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        subtotal,
        tax,
        total,
        itemExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
