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
import {
  featuredProductQuery,
  gdprQuery,
  termsAndConditionsQuery,
} from "@/sanity/queries";

export const metadata = {
  title: "Košík - Medifree",
  description:
    "Prohlédněte si položky ve vašem košíku a pokračujte k pokladně. Upravte množství, odstraňte položky nebo přidejte další produkty před dokončením nákupu.",
};

export default async function CartPage() {
  const { data: gdpr } = await sanityFetch({
    query: gdprQuery,
  });

  const { data: termsAndConditions } = await sanityFetch({
    query: termsAndConditionsQuery,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section>
        <div className="container mx-auto px-4 md:px-10 py-16 md:py-32">
          <div className="flex justify-center mb-8">
            <Badge>Košík</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-medium text-center mb-12">
            Váš košík
          </h1>

          <CartClient gdpr={gdpr} termsAndConditions={termsAndConditions} />

          {/* Customer Support */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-medium mb-4">Potřebujete pomoc?</h2>
            <p className="text-gray-600 mb-6">
              Pokud máte jakékoli dotazy nebo potřebujete pomoc s vaší
              objednávkou, neváhejte se obrátit na náš tým zákaznické podpory.
              Jsme tu, abychom vám pomohli!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Kontaktujte nás
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full">
                <Link href="/casto-kladene-otazky">Často kladené otázky</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
