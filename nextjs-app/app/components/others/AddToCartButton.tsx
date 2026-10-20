"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { useCart, type CartProductInput } from "@/app/context/cartContext";
import { productKind } from "@/app/lib/shop/kinds";

type Props = {
  product?: (CartProductInput & { isAvailable?: boolean | null }) | null;
  quantity?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
};

const AddToCartButton = ({ product, quantity = 1, size = "sm", className }: Props) => {
  const { addItem, isInCart } = useCart();

  if (!product) {
    return null;
  }

  const kind = productKind(product.category);
  const unavailable = kind === "physical" && product.isAvailable === false;
  // Digital products can only be bought once; physical goods and vouchers add up.
  const alreadyBought = kind === "digital" && isInCart(product._id);

  const label = unavailable ? "Nedostupné" : alreadyBought ? "V košíku" : "Přidat do košíku";

  return (
    <Button
      size={size}
      variant={alreadyBought || unavailable ? "secondary" : "primary"}
      className={className ?? "rounded-full"}
      disabled={alreadyBought || unavailable}
      onClick={() => {
        const { added, max } = addItem(product, quantity);
        if (added === 0) {
          toast.warning(`V košíku už máte maximum (${max} ks).`);
        } else if (added < quantity) {
          toast.warning(`Do košíku jsme přidali ${added} ks – víc než ${max} ks najednou objednat nejde.`);
        } else {
          toast.success(`${product.title ?? "Produkt"} je v košíku`);
        }
      }}
    >
      <ShoppingCart className="mr-2 h-2 w-2" />
      {label}
    </Button>
  );
};

export default AddToCartButton;
