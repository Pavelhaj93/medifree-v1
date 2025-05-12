import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function NewsletterSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Získejte 15% slevu na první nákup
          </h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Přihlaste se k odběru novinek a získejte exkluzivní nabídky,
            informace o nových produktech a tipy pro duševní pohodu přímo do
            vaší e-mailové schránky.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Zadejte svůj e-mail"
              className="rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
            />
            <Button className="text-primary" variant="secondary">
              Odebírat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
