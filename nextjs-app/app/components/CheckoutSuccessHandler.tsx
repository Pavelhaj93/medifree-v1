"use client";

import { useCart } from "@/app/context/cartContext";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutSuccessHandler() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const checkoutStatus = searchParams.get("checkout");

    if (checkoutStatus === "success") {
      // Clear the cart after successful checkout
      clearCart();

      // Show success message
      toast.success("Objednávka byla úspěšně dokončena! Děkujeme za nákup.");

      // Clean up the URL by removing the checkout parameter
      const url = new URL(window.location.href);
      url.searchParams.delete("checkout");
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [searchParams, clearCart, router]);

  return null; // This component doesn't render anything
}
