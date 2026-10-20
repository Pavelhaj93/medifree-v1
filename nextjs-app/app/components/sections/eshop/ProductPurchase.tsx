"use client";

import { useState } from "react";
import Link from "next/link";
import AddToCartButton from "../../others/AddToCartButton";
import QuantityStepper from "../../others/QuantityStepper";
import { Button } from "../../ui/Button";
import { useCart, type CartProductInput } from "@/app/context/cartContext";
import { MAX_QUANTITY, productKind } from "@/app/lib/shop/kinds";

type Props = {
  product: CartProductInput & { isAvailable?: boolean | null };
};

export default function ProductPurchase({ product }: Props) {
  const kind = productKind(product.category);
  const [quantity, setQuantity] = useState(1);
  const { isInCart } = useCart();
  const max = MAX_QUANTITY[kind];
  const unavailable = kind === "physical" && product.isAvailable === false;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      {max > 1 && !unavailable && (
        <QuantityStepper value={quantity} max={max} onChange={setQuantity} />
      )}
      <AddToCartButton product={product} quantity={quantity} size="lg" className="rounded-full" />
      {isInCart(product._id) && (
        <Link href="/kosik">
          <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto">
            Přejít do košíku
          </Button>
        </Link>
      )}
    </div>
  );
}
