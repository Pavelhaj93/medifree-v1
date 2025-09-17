import { Badge } from "@/app/components/ui/Badge";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <Badge variant="primary">Zákaznické recenze</Badge>
        </div>
        <h2 className="text-3xl font-medium mb-12 text-center">
          Co o o nás říkají naši zákazníci
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-xs">
            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            </div>
            <p className="text-gray-600 mb-4">
              &quot;E-book Hledání rovnováhy úplně změnil můj přístup ke
              zvládání stresu. Techniky jsou praktické a snadno použitelné v
              každodenním životě.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium">Sára J.</p>
                <p className="text-sm text-gray-500">
                  Zakoupila Hledání rovnováhy
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xs">
            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            </div>
            <p className="text-gray-600 mb-4">
              &quot;Balíček meditací byl zlomovým bodem pro mé úzkosti. Každé
              ráno si pustím jednu nahrávku a zaznamenal jsem výrazné zlepšení
              hladiny stresu.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium">Michal T.</p>
                <p className="text-sm text-gray-500">
                  Zakoupil Meditační balíček
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xs">
            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            </div>
            <p className="text-gray-600 mb-4">
              &quot;Cvičení v pracovním sešitu mi pomohla vytvořit si
              pravidelnou praxi mindfulness. Denní formát mi usnadňuje udržet si
              disciplínu.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium">Eliška R.</p>
                <p className="text-sm text-gray-500">
                  Zakoupila Pracovní sešit mindfulness
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
