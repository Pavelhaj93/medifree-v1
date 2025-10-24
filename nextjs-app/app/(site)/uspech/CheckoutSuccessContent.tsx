"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/cartContext";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Download, ArrowRight, Home } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

export default function CheckoutSuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [hasCleared, setHasCleared] = useState(false);

  useEffect(() => {
    // Clear the cart only once when the component mounts
    if (!hasCleared) {
      clearCart();
      setHasCleared(true);
    }
  }, [clearCart, hasCleared]);

  // Get session ID from URL params if available (for future order tracking)
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-[calc(100dvh-14.5rem)] bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Platba byla úspěšná!
        </h1>

        <p className="text-gray-600 mb-6">
          Děkujeme za váš nákup. Vaše objednávka byla úspěšně zpracována.
        </p>

        {/* Ebook Delivery Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <Download className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">Doručení ebooků</span>
          </div>
          <p className="text-sm text-blue-800">
            Zakoupené ebooky vám byly odeslány na váš email. Pokud email
            nevidíte, zkontrolujte složku spam.
          </p>
        </div>

        {/* Order Details */}
        {sessionId && (
          <div className="text-xs text-gray-500 mb-6">
            Číslo objednávky: {sessionId.slice(-8).toUpperCase()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/e-shop">
            <Button className="w-full" variant="primary">
              <ArrowRight className="w-4 h-4 mr-2" />
              Pokračovat v nákupu
            </Button>
          </Link>

          <Link href="/">
            <Button className="w-full" variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Zpět na hlavní stránku
            </Button>
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Máte problémy s objednávkou?{" "}
            <Link href="/kontakt" className="text-blue-600 hover:text-blue-500">
              Kontaktujte nás
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
