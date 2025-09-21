"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/Button";
import { useCart } from "@/app/context/cartContext";
import { Product } from "@/sanity.types";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <Button
      size="sm"
      variant="primary"
      className="rounded-full"
      onClick={() => addItem(product)}
    >
      <ShoppingCart className="mr-2 h-2 w-2" />
      Přidat do košíku
    </Button>
  );
};

export default AddToCartButton;
