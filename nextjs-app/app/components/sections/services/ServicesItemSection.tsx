import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Service } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText } from "next-sanity";

export function ServiceItemSection({
  _id,
  tag,
  title,
  description,
  content,
  price,
  priceType,
  image,
  reverse = false,
}: Service & { reverse?: boolean }) {
  console.log("image", image);
  return (
    <section
      id={_id}
      className={`py-12 md:py-16 ${reverse ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`relative h-[400px] rounded-2xl overflow-hidden ${
              reverse ? "md:order-2" : ""
            }`}
          >
            <Image
              src={
                urlForImage(image)
                  ?.width(800)
                  .height(600)
                  .fit("crop")
                  .url() as string
              }
              alt={image?.alt || title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Badge variant="primary" className="inline-block mb-4">
              {tag}
            </Badge>
            <h2 className="text-3xl font-medium mb-6">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>

            <div className="space-y-4 mb-8">
              <h3 className="font-medium text-lg">Co služba zahrnuje:</h3>
              {/* rich text */}
              <div className="prose prose-lg max-w-none">
                <PortableText value={content ?? []} />
              </div>
            </div>

            <div className="flex items-end justify-between">
              {(price || priceType) && (
                <div>
                  <p className="text-sm text-gray-500">Cena:</p>
                  <p className="text-2xl font-medium">
                    {/* Dont display the unit behind. */}
                    {price?.toLocaleString("cs-CZ", {
                      style: "currency",
                      currency: "CZK",
                      maximumFractionDigits: 0,
                    })}
                    {priceType}
                  </p>
                </div>
              )}
              <Button variant="secondary" className="flex items-center">
                Objednat službu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesItemSection({
  services,
}: {
  services: Service[];
}) {
  return (
    <>
      {services.map((service, index) => (
        <ServiceItemSection
          key={service._id}
          {...service}
          reverse={index % 2 === 1} // Reverse the order for every second service
        />
      ))}
    </>
  );
}
