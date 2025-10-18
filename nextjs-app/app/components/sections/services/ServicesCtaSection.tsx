import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/utils";
import { CalendarClock } from "lucide-react";
import Link from "next/link";

export default function ServicesCtaSection({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={cn("bg-gray-50", className)}>
      <div className="container mx-auto px-4 md:px-10 py-8 md:py-16">
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-white  mb-4">
            Připraveni vykročit na cestu změny?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90 text-white ">
            Udělejte první krok k pozitivní změně díky bezplatné 15minutové
            konzultaci. Probereme vaše potřeby a zjistíme, zda je náš přístup
            pro vás ten pravý.
          </p>
          <Button variant="secondary" asChild>
            <Link href="https://cal.com/medifree">
              Rezervujte si bezplatnou konzultaci
              <CalendarClock className="inline mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
