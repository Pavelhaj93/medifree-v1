"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../ui/Button";
import { ArrowLeft, CreditCard, ShoppingCart, Trash2, Truck } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import Image from "next/image";
import { Input } from "../../ui/Input";
import { urlForImage } from "@/sanity/lib/utils";
import { toast } from "sonner";
import { Cart, ShopSettingsQueryResult } from "@/sanity.types";
import CustomPortableText from "../../sanity/PortableText";
import { PortableTextBlock } from "next-sanity";
import QuantityStepper from "../../others/QuantityStepper";
import PacketaPointPicker from "./PacketaPointPicker";
import { formatPrice, MAX_QUANTITY } from "@/app/lib/shop/kinds";

const KIND_LABEL = {
  digital: "Ke stažení e-mailem",
  physical: "Doručení Zásilkovnou",
  voucher: "Dárkový poukaz e-mailem (PDF)",
} as const;

const CartClient = ({
  rest,
  shop,
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
  shop?: ShopSettingsQueryResult;
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
    totalLabel,
    termsText,
    shippingLabel = "Doprava",
    deliveryTitle = "Doprava",
    pickPointButtonText = "Vybrat výdejní místo",
    pickPointRequiredText = "Pro dokončení objednávky vyberte výdejní místo Zásilkovny.",
  } = rest;
  const {
    isLoaded,
    items,
    itemCount,
    total,
    hasPhysical,
    removeItem,
    setQuantity,
    packetaPoint,
    setPacketaPoint,
    syncWithServer,
  } = useCart();
  const [customerEmail, setCustomerEmail] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Prices and stock may have changed in Sanity since the items were added.
  const syncCart = useCallback(async (): Promise<boolean> => {
    if (items.length === 0) return true;
    try {
      const res = await fetch("/api/cart/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: items.map((i) => i.id) }),
      });
      if (!res.ok) return false;
      const { removed, repriced } = syncWithServer((await res.json()).products);
      if (removed.length) {
        toast.warning(`Z košíku jsme odebrali produkty, které už nejsou v nabídce: ${removed.join(", ")}.`);
      }
      if (repriced.length) {
        toast.info(`Změnila se cena: ${repriced.join(", ")}. V košíku je aktuální cena.`);
      }
      return removed.length === 0 && repriced.length === 0;
    } catch {
      return false;
    }
  }, [items, syncWithServer]);

  const syncedOnce = useRef(false);
  useEffect(() => {
    if (!isLoaded || syncedOnce.current) return;
    syncedOnce.current = true;
    void syncCart();
  }, [isLoaded, syncCart]);

  // Coming back from Stripe with the browser's Back button restores this page from the
  // back/forward cache with the button still in its "redirecting" state.
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => {
      if (e.persisted) setIsCheckingOut(false);
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const shippingNotConfigured = hasPhysical && shop?.packetaPrice == null;
  const shippingPrice = hasPhysical ? (shop?.packetaPrice ?? 0) : 0;
  const grandTotal = total + shippingPrice;
  const missingPoint = hasPhysical && !packetaPoint;
  const unavailableItems = items.filter((i) => i.unavailable);

  const handleCheckout = async () => {
    if (!customerEmail || !customerEmail.includes("@")) {
      toast.error("Prosím zadejte platnou e-mailovou adresu.");
      return;
    }
    if (missingPoint) {
      toast.error(pickPointRequiredText);
      return;
    }

    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customerEmail,
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
          packetaPoint: hasPhysical ? packetaPoint : null,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe checkout
        return;
      }
      toast.error(data.error ?? "Nastala chyba při přesměrování na platbu.");
      if (data.invalidIds?.length) await syncCart();
    } catch (err) {
      console.error(err);
      toast.error("Nastala chyba při přesměrování na platbu.");
    }
    setIsCheckingOut(false);
  };

  if (!isLoaded) {
    return (
      <div className="grid lg:grid-cols-3 gap-8" aria-busy="true" aria-label="Načítám košík">
        <div className="lg:col-span-2 h-80 rounded-xl bg-white shadow-md animate-pulse" />
        <div className="h-80 rounded-xl bg-white shadow-md animate-pulse" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-medium">
              {cartItemsTitle} ({itemCount})
            </h2>
          </div>

          <ul className="divide-y">
            {items.map((item) => {
              const imageUrl = urlForImage(item.image)?.width(320).height(320).fit("crop").url();
              const canChangeQuantity = MAX_QUANTITY[item.kind] > 1;
              return (
                <li key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6">
                  <div className="relative h-24 w-24 sm:h-40 sm:w-40 rounded-md overflow-hidden shrink-0 bg-gray-100">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={item.image?.alt ?? item.title}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <h3 className="font-medium">
                        {item.slug ? (
                          <Link href={`/e-shop/${item.slug}`} className="hover:text-primary">
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p className="font-medium whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">{KIND_LABEL[item.kind]}</p>
                    {item.unavailable && (
                      <p className="text-sm text-red-600 mt-1">
                        Momentálně není skladem – odeberte prosím produkt z košíku.
                      </p>
                    )}
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-500">{formatPrice(item.price)} za kus</p>
                    )}

                    <div className="flex flex-wrap items-center justify-end gap-4 w-full mt-6">
                      {canChangeQuantity && !item.unavailable && (
                        <QuantityStepper
                          value={item.quantity}
                          max={MAX_QUANTITY[item.kind]}
                          onChange={(q) => setQuantity(item.id, q)}
                        />
                      )}
                      <button
                        className="text-gray-400 hover:text-red-500 flex items-center cursor-pointer"
                        type="button"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">{removeButtonText}</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="p-6 bg-gray-50 flex items-center justify-between">
            <Link href="/e-shop" className="text-primary hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {continueShoppingText}
            </Link>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-28">
          <div className="p-6 border-b">
            <h2 className="text-xl font-medium">{orderSummaryTitle}</h2>
          </div>

          {hasPhysical && (
            <div className="p-6 border-b space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                {deliveryTitle}
              </h3>
              <div className="flex justify-between text-sm">
                <span>{shop?.packetaLabel ?? "Zásilkovna"}</span>
                {!shippingNotConfigured && (
                  <span className="whitespace-nowrap">{formatPrice(shippingPrice)}</span>
                )}
              </div>
              {shippingNotConfigured && (
                <p className="text-sm text-red-600">
                  Doprava teď nejde objednat. Kontaktujte nás prosím na info@medifree.cz.
                </p>
              )}
              {shop?.dispatchTime && (
                <p className="text-xs text-gray-500">{shop.dispatchTime}</p>
              )}
              <PacketaPointPicker
                value={packetaPoint}
                onChange={setPacketaPoint}
                buttonText={pickPointButtonText}
              />
            </div>
          )}

          <div className="p-6 space-y-4">
            {hasPhysical && (
              <>
                <div className="flex justify-between text-sm">
                  <span>{subtotalLabel}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{shippingLabel}</span>
                  <span>{formatPrice(shippingPrice)}</span>
                </div>
              </>
            )}

            <div className="pt-4 border-t flex justify-between font-medium">
              <span>{totalLabel}</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {emailLabel}
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={emailPlaceholder}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">{emailHelperText}</p>
            </div>

            {missingPoint && <p className="text-xs text-red-600 mb-3">{pickPointRequiredText}</p>}
            {unavailableItems.length > 0 && (
              <p className="text-xs text-red-600 mb-3">
                V košíku je produkt, který není skladem. Odeberte ho prosím.
              </p>
            )}

            <Button
              className="w-full"
              onClick={handleCheckout}
              disabled={
                isCheckingOut ||
                !customerEmail ||
                missingPoint ||
                shippingNotConfigured ||
                unavailableItems.length > 0
              }
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {isCheckingOut ? checkingOutText : checkoutButtonText}
            </Button>

            <div className="prose text-xs text-gray-500">
              <CustomPortableText value={termsText as PortableTextBlock[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
