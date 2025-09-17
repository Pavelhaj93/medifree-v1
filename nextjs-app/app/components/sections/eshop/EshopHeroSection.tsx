import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";

export default function EshopHeroSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto">
        <div className="border-t-8 border-secondary" />
        <div className="border-t-8 border-primary w-2/5" />
        <div className="px-4 md:px-10 py-16 text-center">
          <Badge className="mb-6">Digitální obchod</Badge>

          <h1 className="text-4xl md:text-5xl font-medium mb-6">
            Naše produkty
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl mx-auto mb-8">
            Objevte naši nabídku doporučení jak si zlepšit zdraví, vitalitu,
            energii a duševní pohodu. Vše z pohodlí domova v online formě.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary">Zobrazit všechny produkty</Button>
            <Button variant="outline">Zobrazit e-knihy</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
