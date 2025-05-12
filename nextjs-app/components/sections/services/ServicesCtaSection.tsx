import { Button } from "@/components/ui/Button";

export default function ServicesCtaSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-white  mb-4">
            Připraveni vykročit na cestu změny?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90 text-white ">
            Udělejte první krok k pozitivní změně díky bezplatné 15minutové
            konzultaci. Probereme vaše potřeby a zjistíme, zda je náš přístup
            pro vás ten pravý.
          </p>
          <Button variant="secondary">
            Rezervujte si bezplatnou konzultaci
          </Button>
        </div>
      </div>
    </section>
  );
}
