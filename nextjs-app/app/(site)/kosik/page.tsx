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
import CartClient from "@/app/components/sections/kosik/CartClient";
import { sanityFetch } from "@/sanity/lib/live";
import { featuredProductQuery } from "@/sanity/queries";

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
        <div className="container mx-auto px-4 md:px-10 py-16">
          <div className="flex justify-center mb-8">
            <Badge>Košík</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-medium text-center mb-12">
            Váš košík
          </h1>

          <CartClient />

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
      </section>
    </div>
  );
}
