import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/app/components/ui/Card";
import { urlForImage } from "@/sanity/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/Carousel";
import { Badge } from "@/app/components/ui/Badge";

export type MediaCard = {
  image?: any;
  title: string;
  description?: string;
  link?: string;
};

export type MediaCardsCarouselBlock = {
  badge?: string;
  title?: string;
  subtitle?: string;
  cards: MediaCard[];
};

export default function MediaCardsCarousel({
  block,
}: {
  block: MediaCardsCarouselBlock;
}) {
  const [current, setCurrent] = React.useState(0);
  const [count] = React.useState(block.cards.length);
  const carouselRef = React.useRef<any>(null);

  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-10">
        <div className="text-center mb-4 md:mb-12">
          {block.badge && (
            <Badge variant="primary" className="mb-6">
              {block.badge}
            </Badge>
          )}
          {block.title && (
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              {block.title}
            </h2>
          )}
          {block.subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">{block.subtitle}</p>
          )}
        </div>
        <Carousel
          ref={carouselRef}
          className="w-full"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {block.cards.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group overflow-hidden p-0">
                  <CardContent className="p-0 relative h-122.5">
                    {/* Background Image */}
                    {item.image && (
                      <div className="absolute inset-0">
                        <Image
                          src={
                            urlForImage(item.image)
                              ?.width(800)
                              .height(600)
                              .fit("crop")
                              .auto("format")
                              .quality(90)
                              .url() as string
                          }
                          alt={item.image?.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 288px"
                          quality={100}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    )}
                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                      <h3 className="text-2xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-white/90 text-lg group-hover:text-white transition-colors duration-300">
                          {item.description}
                        </p>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-full font-semibold shadow hover:bg-primary/90 transition"
                        >
                          Více
                        </a>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all duration-300" />
          <CarouselNext className="hidden md:flex -right-12 bg-white border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all duration-300" />
        </Carousel>
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === current
                  ? "bg-primary w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
