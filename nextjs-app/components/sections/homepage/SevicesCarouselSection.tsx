"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselItems = [
  {
    id: 1,
    text: "Zjištění hladiny a doplnění vitamínů a minerálů",
  },
  {
    id: 2,
    text: "Diagnostika stavu metabolismu a jeho optimalizace",
  },
  {
    id: 3,
    text: "Stabilizace glykemické křivky a zlepšení energetické hladiny",
  },
  {
    id: 4,
    text: "Zlepšení funkce mitochondrií a buněčné energie",
  },
  {
    id: 5,
    text: "Snížení chronického zánětu a podpora imunitního systému",
  },
  {
    id: 6,
    text: "Redukce tuku a navýšení svalové hmoty",
  },
  {
    id: 7,
    text: "Snížení rizika civilizačních onemocnění",
  },
  {
    id: 8,
    text: "Plán na míru dle Vašeho denního režimu a preferencí",
  },
  {
    id: 9,
    text: "Snížení expozice toxinům z prostředí",
  },
  {
    id: 10,
    text: "Hormonální rovnováha a optimalizace",
  },
  {
    id: 11,
    text: "Konzultace laboratorních výsledků",
  },
  {
    id: 12,
    text: "Doporučení pohybového režimu",
  },
  {
    id: 13,
    text: "Regulace nervového systému",
  },
  {
    id: 14,
    text: "Optimalizace spánku a regenerace",
  },
  {
    id: 15,
    text: "Kultivace pozornosti",
  },
];

export function ServicesCarouselSection() {
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-white px-6 py-2 mb-6 shadow-sm">
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
              {carouselItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full bg-primary shadow-sm hover:shadow-md transition-all duration-300 border-0 group">
                    <CardContent className="p-8 flex items-center justify-center h-full min-h-[140px]">
                      <p className="text-white text-center leading-relaxed font-medium text-lg group-hover:text-secondary transition-colors duration-300">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-md transition-all duration-300" />
            <CarouselNext className="hidden md:flex -right-12 bg-white border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-md transition-all duration-300" />
          </Carousel>
        </div>

        {/* Optional: Simple dots indicator */}
        {/* <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(carouselItems.length / 3) }).map(
            (_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-primary transition-colors duration-300 cursor-pointer"
              />
            )
          )}
        </div> */}
      </div>
    </section>
  );
}
