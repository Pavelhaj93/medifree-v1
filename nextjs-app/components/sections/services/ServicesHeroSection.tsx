import Image from "next/image";
import Link from "next/link";
import type { ServiceItemProps } from "./ServicesItemSection";

import { services } from "@/app/lib/data/services";
import { Badge } from "@/components/ui/Badge";

const ServiceCard = (service: ServiceItemProps) => {
  return (
    <Link
      href={`#${service.id}`}
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[#8D3F38]/10 flex items-center justify-center mb-4 overflow-hidden">
        <Image
          src={service.imageSrc}
          alt={service.title}
          width={120}
          height={120}
        />
      </div>
      <h3 className="font-medium text-xl mb-4">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
    </Link>
  );
};

export default function ServicesHeroSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto ">
        <div className="border-t-8 border-secondary" />
        <div className="border-t-8 border-primary w-2/5" />
        <div className="py-12 md:py-16 px-4 ">
          <div className="flex justify-center mb-8 ">
            <Badge>Naše služby</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-center mb-6">
            Co nabízíme
          </h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Naše terapeutické přístupy kombinují psychologii, fyzioterapii a
            výživu. Pomáháme lidem najít cestu k sobě a zlepšit kvalitu jejich
            života. Naše služby zahrnují individuální terapie, skupinové sezení
            a online konzultace.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                tag={service.tag}
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc}
                features={service.features}
                idealFor={service.idealFor}
                price={service.price}
                buttonText={service.buttonText}
                reverse={service.reverse}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
