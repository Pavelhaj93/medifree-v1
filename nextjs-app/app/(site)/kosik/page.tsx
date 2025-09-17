import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

// Mock cart data - in a real app, this would come from a state management solution
const cartItems = [
  {
    id: 1,
    title: "Finding balance: Průvodce duševní pohodou",
    price: 400,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=80",
    type: "Ebook",
  },
  {
    id: 2,
    title: "Úleva od úzkosti - Meditační balíček",
    price: 250,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=80",
    type: "Audio",
  },
  {
    id: 3,
    title: "Zdravý spánek - Meditační balíček",
    price: 250,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=80",
    type: "Audio",
  },
  {
    id: 4,
    title: "Zdravý spánek - Meditační balíček",
    price: 250,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=80",
    type: "Audio",
  },
];

export default function CartPage() {
  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.21; // 21% tax rate
  const total = subtotal + tax;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section>
        <div className="container mx-auto">
          <div className="border-t-8 border-secondary" />
          <div className="border-t-8 border-primary w-2/5" />
          <div className="px-4 md:px-10 py-16">
            <div className="flex justify-center mb-8">
              <Badge>Košík</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-medium text-center mb-12">
              Váš košík
            </h1>

            {cartItems.length === 0 ? (
              <div className="max-w-md mx-auto text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-8 w-8 text-gray-500" />
                </div>
                <h2 className="text-2xl font-medium mb-4">
                  Váš košík je prázdný
                </h2>
                <p className="text-gray-600 mb-8">
                  Vypadá to, že jste do svého košíku zatím nepřidali žádné
                  položky. Prozkoumejte náš obchod a najděte digitální zdroje,
                  které podpoří vaši cestu ke zdraví a duševní pohodě.
                </p>
                <Link href="/eshop">
                  <Button variant="primary">Prozkoumat obchod</Button>
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-medium">
                        Položek v košíku (
                        {cartItems.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
                        )
                      </h2>
                    </div>

                    <ul className="divide-y">
                      {cartItems.map((item) => (
                        <li key={item.id} className="p-6 flex gap-6">
                          <div className="relative h-40 w-40 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                // item.image ||
                                "/images/eshop/book_placeholder.png"
                              }
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.title}</h3>
                              <p className="font-medium">
                                {(item.price * item.quantity).toFixed(2)} Kč
                              </p>
                            </div>

                            <p className="text-sm text-gray-500 mt-1">
                              {item.type}
                            </p>

                            {/* <div className="flex items-center justify-between mt-6">
                              <div className="flex items-center">
                                <div className="flex items-center border rounded-full mr-4">
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
                                </div>

                                <button
                                  className="text-gray-400 hover:text-red-500 flex items-center cursor-pointer"
                                  type="button"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  <span className="text-sm">Odstranit</span>
                                </button>
                              </div>

                              <div className="text-sm text-gray-500">
                                {item.price.toFixed(2)} Kč za kus
                              </div>
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
                        Continue Shopping
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
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-28">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-medium">
                        Shrnutí objednávky
                      </h2>
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
                      <Button className="w-full mb-4">
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
                  {/* <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b">
                      <h2 className="text-lg font-medium">Doporučené produkty</h2>
                    </div>
          
                    <div className="p-6 space-y-6">
                      <div className="flex gap-4">
                        <div className="relative h-16 w-12 rounded-md overflow-hidden flex-shrink-0">
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
                        <div className="relative h-16 w-12 rounded-md overflow-hidden flex-shrink-0">
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

            {/* Customer Support */}
            <div className="mt-16 max-w-3xl mx-auto text-center">
              <h2 className="text-xl font-medium mb-4">Potřebujete pomoc?</h2>
              <p className="text-gray-600 mb-6">
                Pokud máte jakékoli dotazy nebo potřebujete pomoc s vaší
                objednávkou, neváhejte se obrátit na náš tým zákaznické podpory.
                Jsme tu, abychom vám pomohli!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Kontaktujte nás
                  </Button>
                </Link>
                <Button variant="outline" className="rounded-full">
                  <Link href="/faq">Často kladené otázky</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
