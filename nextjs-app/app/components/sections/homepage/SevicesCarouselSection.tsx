"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/app/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { allHomepageServicesQuery } from "@/sanity/lib/queries";
import { HomepageService } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

export function ServicesCarouselSection({
  services,
}: {
  services: HomepageService[];
}) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-white px-6 py-2 mb-6 shadow-xs">
            <span className="text-primary font-medium text-sm">
              NAŠE SLUŽBY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Co pro vás můžeme udělat
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Komplexní péče zaměřená na optimalizaci vašeho zdraví a životního
            stylu
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {services.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group overflow-hidden p-0">
                    <CardContent className="p-0 relative h-[450px]">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={
                            urlForImage(item.image)
                              ?.width(600)
                              .height(450)
                              .fit("crop")
                              .url() as string
                          }
                          alt={item.image?.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Gradient overlay dark on bottom, and light on top */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-white/90  text-lg group-hover:text-white transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all duration-300" />
            <CarouselNext className="hidden md:flex -right-12 bg-white border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all duration-300" />
          </Carousel>
        </div>

        {/* Statistics below carousel */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-medium text-primary mb-2">
              15+
            </div>
            <p className="text-gray-600">Specializovaných služeb</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-medium text-primary mb-2">
              500+
            </div>
            <p className="text-gray-600">Spokojených klientů</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-medium text-primary mb-2">
              98%
            </div>
            <p className="text-gray-600">Úspěšnost léčby</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
