import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/app/components/ui/Badge";
import { Service } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

const ServiceCard = (service: Service & { reverse?: boolean }) => {
  return (
    <Link
      href={`#${service._id}`}
      className="bg-white p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 overflow-hidden">
        <Image
          src={
            urlForImage(service.image)
              ?.width(120)
              .height(120)
              .fit("crop")
              .url() as string
          }
          alt={service.image?.alt || service.title}
          width={120}
          height={120}
        />
      </div>
      <h3 className="font-medium text-xl mb-4">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
    </Link>
  );
};

export default function ServicesHeroSection({
  services,
}: {
  services: Service[];
}) {
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
            Naším cílem je edukace o individuálních potřebách Vašeho organismu.
            Zjistíte, co potřevbujete právě Vy, jaké parametry sledovat a jakým
            způsobem je udržovat v optimálním rozmezí.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service._id}
                {...service}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
