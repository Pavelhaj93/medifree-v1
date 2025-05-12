import { Badge } from "@/components/ui/Badge";

export default function ContactFAQSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-10 py-16 md:pb-32 ">
        <div className="text-center">
          <Badge className="mb-6" variant="primary">
            FAQ
          </Badge>
        </div>
        <h2 className="text-3xl font-medium mb-12 text-center">
          Často kladené otázky
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-medium text-lg mb-2">
              Jak rychle si mohu domluvit schůzku?
            </h3>
            <p className="text-gray-600">
              Obvykle lze nové klienty objednat do 1–2 týdnů. Pokud jste v
              krizi, obraťte se prosím okamžitě na tísňovou linku nebo
              záchrannou službu.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-medium text-lg mb-2">
              Jaké platební metody přijímáte?
            </h3>
            <p className="text-gray-600">
              Přijímám všechny hlavní kreditní karty, HSA/FSA karty a bankovní
              převody. Platba je splatná při poskytnutí služby.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-medium text-lg mb-2">Přijímáte pojištění?</h3>
            <p className="text-gray-600">
              Jsem poskytovatel mimo síť. Mohu vám vystavit doklad (superbill),
              který můžete předložit své pojišťovně k případnému proplacení.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-medium text-lg mb-2">
              Jaké jsou vaše podmínky pro zrušení schůzky?
            </h3>
            <p className="text-gray-600">
              Vyžaduji oznámení o zrušení alespoň 24 hodin předem. Pozdní
              zrušení nebo nedostavení se může být účtováno v plné výši.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
