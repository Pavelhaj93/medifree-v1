"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../../ui/Button";
import { ArrowLeft, CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import Image from "next/image";
import { Input } from "../../ui/Input";

const CartClient = () => {
  const { items, removeItem, clearCart, subtotal, tax, total } = useCart();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe checkout
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-2xl font-medium mb-4">Váš košík je prázdný</h2>
          <p className="text-gray-600 mb-8">
            Vypadá to, že jste do svého košíku zatím nepřidali žádné položky.
            Prozkoumejte náš obchod a najděte digitální zdroje, které podpoří
            vaši cestu ke zdraví a duševní pohodě.
          </p>
          <Link href="/eshop">
            <Button variant="primary">Prozkoumat obchod</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium">
                  Položek v košíku (
                  {items.reduce((total, item) => total + 1, 0)})
                </h2>
              </div>

              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item?._id} className="p-6 flex gap-6">
                    <div className="relative h-40 w-40 rounded-md overflow-hidden shrink-0">
                      <Image
                        // @ts-ignore
                        src={item?.image.asset.url as string}
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
                          <span className="text-sm">Odstranit</span>
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
                  Pokračovat v nákupu
                </Link>

                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Promo kód"
                    className="rounded-full border-gray-200 focus:border-primary focus:ring-primary w-40"
                  />
                  <Button variant="outline" className="rounded-full">
                    Použít
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-28">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium">Shrnutí objednávky</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Mezisoučet</span>
                  <span>{subtotal.toFixed(2)} Kč</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>DPH (21%)</span>
                  <span>{tax.toFixed(2)} Kč</span>
                </div>

                <div className="pt-4 border-t flex justify-between font-medium">
                  <span>Celkem</span>
                  <span>{total.toFixed(2)} Kč</span>
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                <Button className="w-full mb-4" onClick={handleCheckout}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pokračovat k platbě
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Pokračováním k pokladně souhlasíte s našimi{" "}
                  <Link href="#" className="underline">
                    Obchodními podmínkami
                  </Link>{" "}
                  a{" "}
                  <Link href="#" className="underline">
                    Zásadami ochrany osobních údajů
                  </Link>
                  .
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
