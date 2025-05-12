import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { services } from "@/app/lib/data/services";

export type ServiceItemProps = {
  id: string;
  tag: string;
  title: string;
  description: string;
  features: { id: number; label: string }[];
  idealFor: string;
  imageSrc: string;
  price: string;
  buttonText?: string;
  reverse?: boolean;
};

export function ServiceItemSection({
  id,
  tag,
  title,
  description,
  features,
  idealFor,
  imageSrc,
  price,
  buttonText = "Book a Session",
  reverse = false,
}: ServiceItemProps) {
  return (
    <section
      id={id}
      className={`py-12 md:py-16 ${reverse ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`relative h-[400px] rounded-2xl overflow-hidden ${
              reverse ? "md:order-2" : ""
            }`}
          >
            <Image src={imageSrc} alt={title} fill className="object-cover" />
          </div>
          <div>
            <Badge variant="primary" className="inline-block mb-4">
              {tag}
            </Badge>
            <h2 className="text-3xl font-medium mb-6">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>

            <div className="space-y-4 mb-8">
              <h3 className="font-medium text-lg">Co služba zahrnuje:</h3>
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature.id} className="flex items-start">
                    <Check className="h-5 w-5 text-priamry mr-2 shrink-0" />
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`${
                reverse ? "bg-white" : "bg-gray-50"
              } p-6 rounded-2xl shadow mb-8 `}
            >
              <h3 className="font-medium text-lg mb-2">Ideální pro:</h3>
              <p className="text-gray-600">{idealFor}</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-500">Cena:</p>
                <p className="text-2xl font-medium">{price}</p>
              </div>
              <Button variant="secondary" className="flex items-center">
                {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesItemSection() {
  return (
    <>
      {services.map((service, index) => (
        <ServiceItemSection
          key={service.id}
          id={service.id}
          tag={service.tag}
          title={service.title}
          description={service.description}
          features={service.features}
          idealFor={service.idealFor}
          imageSrc={service.imageSrc}
          price={service.price}
          buttonText={service.buttonText ?? "Objednat službu"}
          reverse={index % 2 === 1} // Reverse the order for every second service
        />
      ))}
    </>
  );
}
