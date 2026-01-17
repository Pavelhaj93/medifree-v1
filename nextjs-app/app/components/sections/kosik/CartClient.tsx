"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { ArrowLeft, CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import Image from "next/image";
import { Input } from "../../ui/Input";
import { urlForImage } from "@/sanity/lib/utils";
import { toast } from "sonner";
import { Cart } from "@/sanity.types";
import CustomPortableText from "../../sanity/PortableText";
import { PortableTextBlock } from "next-sanity";

const CartClient = ({
  rest,
}: {
  rest: Omit<
    Cart,
    | "badgeText"
    | "contactButtonText"
    | "faqButtonText"
    | "pageTitle"
    | "supportDescription"
    | "supportTitle"
  >;
}) => {
  const {
    cartItemsTitle,
    checkingOutText,
    checkoutButtonText,
    continueShoppingText,
    emailHelperText,
    emailLabel,
    emailPlaceholder,
    emptyCartButtonText,
    emptyCartDescription,
    emptyCartTitle,
    orderSummaryTitle,
    removeButtonText,
    subtotalLabel,
    taxLabel,
    termsText,
    totalLabel,
  } = rest;
  const { items, removeItem, clearCart, subtotal, tax, total } = useCart();
  const [customerEmail, setCustomerEmail] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!customerEmail || !customerEmail.includes("@")) {
      toast.error(
        "Prosím zadejte platnou emailovou adresu pro doručení ebooků."
      );
      return;
    }

    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customerEmail }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe checkout
      }
    } catch (err) {
      console.error(err);
      toast.error("Nastala chyba při přesměrování na platbu.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-2xl font-medium mb-4">{emptyCartTitle}</h2>
          <p className="text-gray-600 mb-8">{emptyCartDescription}</p>
          <Link href="/e-shop">
            <Button variant="primary">{emptyCartButtonText}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium">
                  {cartItemsTitle} (
                  {items.reduce((total, item) => total + 1, 0)})
                </h2>
              </div>

              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item?._id} className="p-6 flex gap-6">
                    <div className="relative h-40 w-40 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={
                          urlForImage(item?.image)
                            ?.width(160)
                            .height(160)
                            .fit("crop")
                            .url()!
                        }
                        alt={item?.image?.alt ?? item?.title ?? ""}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item?.title}</h3>
                        <p className="font-medium">
                          {(item?.price ?? 0 * 1).toFixed(2)} Kč
                        </p>
                      </div>

                      {/* <p className="text-sm text-gray-500 mt-1">{item.type}</p> */}

                      <div className="flex justify-end w-full mt-6">
                        {/* <div className="flex items-center border rounded-full mr-4">
                                  <button
                                    className="p-1 hover:bg-gray-100 rounded-l-full cursor-pointer"
                                    type="button"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="px-4 text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    className="p-1 hover:bg-gray-100 rounded-r-full cursor-pointer"
                                    type="button"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div> */}

                        <button
                          className="text-gray-400 hover:text-red-500 flex items-center cursor-pointer"
                          type="button"
                          onClick={() => removeItem(item?._id ?? "")}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="text-sm">{removeButtonText}</span>
                        </button>
                      </div>

                      {/* <div className="text-sm text-gray-500">
                                {item.price.toFixed(2)} Kč za kus
                              </div> */}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-gray-50 flex items-center justify-between">
                <Link
                  href="/eshop"
                  className="text-primary hover:underline flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {continueShoppingText}
                </Link>

                {/* TODO: maybe add later the promo code input */}
                {/* <div className="flex items-center gap-4">
                  <Input
                    placeholder="Promo kód"
                    className="rounded-full border-gray-200 focus:border-primary focus:ring-primary w-40"
                  />
                  <Button variant="outline" className="rounded-full">
                    Použít
                  </Button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-28">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium">{orderSummaryTitle}</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>{subtotalLabel}</span>
                  <span>{subtotal.toFixed(2)} Kč</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>{taxLabel}</span>
                  <span>{tax.toFixed(2)} Kč</span>
                </div>

                <div className="pt-4 border-t flex justify-between font-medium">
                  <span>{totalLabel}</span>
                  <span>{total.toFixed(2)} Kč</span>
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {emailLabel}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={emailPlaceholder}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {emailHelperText}
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !customerEmail}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isCheckingOut ? checkingOutText : checkoutButtonText}
                </Button>

                <p className="prose text-xs text-gray-500">
                  <CustomPortableText
                    value={termsText as PortableTextBlock[]}
                  />
                </p>
              </div>
            </div>

            {/* Product Recommendations */}
            {/* <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b">
                      <h2 className="text-lg font-medium">Doporučené produkty</h2>
                    </div>
          
                    <div className="p-6 space-y-6">
                      <div className="flex gap-4">
                        <div className="relative h-16 w-12 rounded-md overflow-hidden shrink-0">
                          <Image
                            src="/placeholder.svg?height=64&width=48"
                            alt="Daily Mindfulness Workbook"
                            fill
                            className="object-cover"
                          />
                        </div>
          
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">
                            Daily Mindfulness Workbook
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">$14.99</p>
                          <Button
                            variant="link"
                            className="text-primary p-0 h-auto text-sm mt-1"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
          
                      <div className="flex gap-4">
                        <div className="relative h-16 w-12 rounded-md overflow-hidden shrink-0">
                          <Image
                            src="/placeholder.svg?height=64&width=48"
                            alt="Relationship Communication Guide"
                            fill
                            className="object-cover"
                          />
                        </div>
          
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">
                            Relationship Communication Guide
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">$12.99</p>
                          <Button
                            variant="link"
                            className="text-primary p-0 h-auto text-sm mt-1"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartClient;
