import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Cart as CartProps } from "@/sanity.types";
import CartClient from "../sections/kosik/CartClient";

export default async function Cart({ block }: { block: CartProps }) {
  const {
    badgeText,
    contactButtonText,
    faqButtonText,
    pageTitle,
    supportDescription,
    supportTitle,
    ...rest
  } = block ?? {};
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section>
        <div className="container mx-auto px-4 md:px-10 py-16 md:py-32">
          <div className="flex justify-center mb-8">
            <Badge>{badgeText}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-medium text-center mb-12">
            {pageTitle}
          </h1>

          <CartClient rest={rest} />

          {/* Customer Support */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-medium mb-4">{supportTitle}</h2>
            <p className="text-gray-600 mb-6">{supportDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {contactButtonText}
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full">
                <Link href="/casto-kladene-otazky">{faqButtonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
