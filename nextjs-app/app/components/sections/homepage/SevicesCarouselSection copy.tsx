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

const carouselItems = [
  {
    id: 1,
    title: "Vitamíny a minerály",
    text: "Zjištění hladiny a doplnění vitamínů a minerálů pro optimální fungování organismu",
    image: "/images/services2/1.jpg",
  },
  {
    id: 2,
    title: "Metabolismus",
    text: "Diagnostika stavu metabolismu a jeho optimalizace pro lepší energetickou bilanci",
    image: "/images/services2/6.jpg",
  },
  {
    id: 3,
    title: "Glykemická křivka",
    text: "Stabilizace glykemické křivky a zlepšení energetické hladiny během dne",
    image: "/images/services2/2.jpg",
  },
  {
    id: 4,
    title: "Buněčná energie",
    text: "Zlepšení funkce mitochondrií a buněčné energie pro vyšší vitalitu",
    image: "/images/services2/4.jpg",
  },
  {
    id: 5,
    title: "Imunitní systém",
    text: "Snížení chronického zánětu a podpora imunitního systému",
    image: "/images/services2/5.jpg",
  },
  {
    id: 6,
    title: "Tělesná kompozice",
    text: "Redukce tuku a navýšení svalové hmoty pomocí cílených strategií",
    image: "/images/services2/6.jpg",
  },
  {
    id: 7,
    title: "Prevence onemocnění",
    text: "Snížení rizika civilizačních onemocnění prostřednictvím preventivní péče",
    image: "/images/services2/7.jpg",
  },
  {
    id: 8,
    title: "Individuální plán",
    text: "Plán na míru dle Vašeho denního režimu a osobních preferencí",
    image: "/images/services2/8.jpg",
  },
  {
    id: 9,
    title: "Detoxikace",
    text: "Snížení expozice toxinům z prostředí a podpora přirozené detoxikace",
    image: "/images/services2/3.jpg",
  },
  {
    id: 10,
    title: "Hormonální rovnováha",
    text: "Hormonální rovnováha a optimalizace pro lepší celkové zdraví",
    image: "/images/services2/2.jpg",
  },
  {
    id: 11,
    title: "Laboratorní výsledky",
    text: "Konzultace laboratorních výsledků a jejich praktická interpretace",
    image: "/images/services2/2.jpg",
  },
  {
    id: 12,
    title: "Pohybový režim",
    text: "Doporučení pohybového režimu přizpůsobeného vašim možnostem",
    image: "/images/services2/6.jpg",
  },
  {
    id: 13,
    title: "Nervový systém",
    text: "Regulace nervového systému pro lepší stresovou odolnost",
    image: "/images/health-bg-3.jpg",
  },
  {
    id: 14,
    title: "Spánek a regenerace",
    text: "Optimalizace spánku a regenerace pro maximální obnovu organismu",
    image: "/images/health-bg-5.jpg",
  },
  {
    id: 15,
    title: "Mindfulness",
    text: "Kultivace pozornosti a mindfulness pro duševní pohodu",
    image: "/images/health-bg-3.jpg",
  },
];

export function ServicesCarouselSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

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
                  className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group overflow-hidden p-0">
                    <CardContent className="p-0 relative h-[450px]">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Gradient overlay dark on bottom, and light on top */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-white/90  text-lg group-hover:text-white transition-colors duration-300">
                          {item.text}
                        </p>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
