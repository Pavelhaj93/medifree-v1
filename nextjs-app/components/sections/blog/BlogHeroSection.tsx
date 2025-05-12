import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

export function BlogHeroSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto ">
        <div className="border-t-8 border-secondary" />
        <div className="border-t-8 border-primary w-2/5" />
        <div className="px-4 md:px-10 py-16 text-center">
          <Badge variant="primary" className="mb-6">
            Medifree blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-medium mb-6">
            Články o duševním a fyzickém zdraví
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Objevte články, tipy a zdroje, které vám pomohou na vaší cestě k
            duševnímu zdraví a objevte praktické strategie pro každodenní
            pohodu.
          </p>
          {/* <div className="max-w-md mx-auto relative">
          <Input
            type="search"
            placeholder="Vyhledejte články..."
            className="rounded-full pl-12 pr-4 py-6 border-gray-200 focus:border-[#8D3F38] focus:ring-[#8D3F38]"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
        </div> */}
        </div>
      </div>
    </section>
  );
}
