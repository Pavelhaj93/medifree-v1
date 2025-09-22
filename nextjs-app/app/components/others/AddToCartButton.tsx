"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/Button";
import { useCart } from "@/app/context/cartContext";
import { Product } from "@/sanity.types";
import { cn } from "@/app/lib/utils";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem, itemExists } = useCart();

  return (
    <Button
      size="sm"
      variant={itemExists(product.title) ? "secondary" : "primary"}
      className="rounded-full"
      onClick={() => addItem(product)}
      disabled={itemExists(product.title)}
    >
      <ShoppingCart className="mr-2 h-2 w-2" />
      {itemExists(product.title) ? "V košíku" : "Přidat do košíku"}
    </Button>
  );
};

export default AddToCartButton;
