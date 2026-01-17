import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";

import { PortableTextBlock } from "next-sanity";
import CustomPortableText from "./PortableText";

type ServiceCardBlockProps = {
  tag: string;
  title: string;
  description: string;
  content: PortableTextBlock[];
  price?: number;
  priceType?: string;
  image: any;
  reverseLayout?: boolean;
  backgroundColor?: "white" | "gray";
  buttonText?: string;
  buttonUrl?: string;
  _key: string;
};

export default function ServiceCardBlock({
  block,
}: {
  block: ServiceCardBlockProps;
}) {
  const {
    tag,
    title,
    description,
    content,
    price,
    priceType,
    image,
    reverseLayout = false,
    backgroundColor = "gray",
    buttonText = "Objednat službu",
    buttonUrl,
    _key,
  } = block;

  const bgClass = backgroundColor === "white" ? "bg-white" : "bg-gray-50";
  const defaultBookingUrl = "https://cal.com/medifree";

  return (
    <section id={_key} className={bgClass}>
      <div className="container mx-auto px-4 md:px-10 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 ">
          <div
            className={`relative h-100 rounded-2xl lg:sticky lg:top-32 overflow-hidden opacity-0 animate-fade-in-up animation-delay-200 ${
              reverseLayout ? "md:order-2" : ""
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
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="opacity-0 animate-fade-in-up animation-delay-400">
            <Badge variant="primary" className="inline-block mb-4">
              {tag}
            </Badge>
            <h2 className="text-3xl font-medium mb-6">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>

            <div className="prose prose-lg max-w-none mb-8">
              <CustomPortableText value={content as PortableTextBlock[]} />
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
              <Button variant="secondary" className="flex items-center" asChild>
                <Link href={buttonUrl || defaultBookingUrl}>
                  {buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
