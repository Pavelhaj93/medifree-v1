"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import AddToCartButton from "../../others/AddToCartButton";
import QuantityStepper from "../../others/QuantityStepper";
import { Button } from "../../ui/Button";
import { useCart, type CartProductInput } from "@/app/context/cartContext";
import { MAX_QUANTITY, productKind } from "@/app/lib/shop/kinds";

type Props = {
  product: CartProductInput & { isAvailable?: boolean | null };
  /** Shown in the confirmation, e.g. "Čokoláda, 1 kg". */
  variantName?: string | null;
};

export default function ProductPurchase({ product, variantName }: Props) {
  const kind = productKind(product.category);
  const [quantity, setQuantity] = useState(1);
  const [addedNote, setAddedNote] = useState<string | null>(null);
  const { isInCart } = useCart();
  const max = MAX_QUANTITY[kind];
  const unavailable = kind === "physical" && product.isAvailable === false;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
        {max > 1 && !unavailable && <QuantityStepper value={quantity} max={max} onChange={setQuantity} />}
        <AddToCartButton
          product={product}
          quantity={quantity}
          size="lg"
          className="rounded-full min-h-11 sm:min-w-56"
          onAdded={(added) =>
            setAddedNote(`${variantName ?? product.title ?? "Produkt"}${added > 1 ? ` (${added} ks)` : ""} je v košíku`)
          }
        />
        {isInCart(product._id) && (
          <Link href="/kosik">
            <Button variant="outline" size="lg" className="rounded-full min-h-11 w-full sm:w-auto">
              Přejít do košíku
            </Button>
          </Link>
        )}
      </div>
      {addedNote && (
        <p role="status" className="mt-3 flex items-center gap-1.5 text-sm text-green-800">
          <Check className="h-4 w-4" aria-hidden />
          {addedNote}
        </p>
      )}
    </div>
  );
}
