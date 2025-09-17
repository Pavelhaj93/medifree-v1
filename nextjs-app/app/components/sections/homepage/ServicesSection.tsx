import Image from "next/image";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { BookButton } from "@/app/components/others/BookButton";

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const services: Service[] = [
  {
    id: 1,
    title: "Konzultace online",
    description: "Získejte přístup k odborné péči z pohodlí vašeho domova.",
    image: "/images/services/telemedicine.png",
  },
  {
    id: 2,
    title: "Individuální úprava životního stylu",
    description:
      "Naše služby zahrnují individuální úpravy životního stylu, které vám pomohou dosáhnout vašich cílů a zlepšit kvalitu vašeho života.",
    image: "/images/services/lifestyle.png",
  },
  {
    id: 3,
    title: "Monitorace hladiny cukru v krvi",
    description:
      "Naše služby zahrnují kontinuální monitoraci hladiny cukru v krvi, která vám pomůže lépe řídit vaše zdraví a prevenci onemocnění.",
    image: "/images/services/glucose.png",
  },
  {
    id: 4,
    title: "Konzultace laboratorních vyšetření",
    description:
      "Naše služby zahrnují doporučení a konzultace laboratorních vyšetření, které vám pomohou lépe porozumět vašemu zdraví a potřebám.",
    image: "/images/services/lab.png",
  },
];

interface ServiceProps {
  title: string;
  description: string;
  image: string;
}

const Service = ({ title, description, image }: ServiceProps) => {
  return (
    <div className="flex-col md:flex-row flex gap-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="md:w-24 w-full md:h-full h-24 relative rounded-t-2xl md:rounded-l-2xl shrink-0 overflow-hidden">
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-white to-black opacity-40" />
        {/* image */}
        <Image
          src={image}
          alt="Couples Therapy"
          width={200}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export function ServicesSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-10 py-16 md:py-32">
        <div className="mb-16">
          <Badge variant="primary" className="mb-8">
            NAŠE SLUŽBY
          </Badge>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-4xl md:text-5xl mb-4 md:mb-0">
              Co pro vás můžeme udělat?
            </h2>
            <BookButton />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Service
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button className="mt-8" variant="secondary" asChild>
            <Link href="/nase-sluzby">Zobrazit všechny služby</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
