"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselItems = [
  {
    id: 1,
    text: "Zjištění hladiny a doplnění vitamínů a minerálů.",
    author: "Dr. Sarah Johnson",
    category: "On Healing",
  },
  {
    id: 2,
    text: "Diagnostika stavu metabolismu a jeho optimalizace.",
    author: "Mental Health Advocate",
    category: "On Strength",
  },
  {
    id: 3,
    text: "Stabilizace glykemické křivky a zlepšení energetické hladiny.",
    author: "Mindify Team",
    category: "On Self-Care",
  },
  {
    id: 4,
    text: "Zlepšení funkce mitochondrií a buněčné energie.",
    author: "Dr. Sarah Johnson",
    category: "On Progress",
  },
  {
    id: 5,
    text: "Snížení chronického zánětu a podpora imunitního systému.",
    author: "Mental Health Community",
    category: "On Acceptance",
  },
  {
    id: 6,
    text: "Redukce tuku a navýšení svalové hmoty.",
    author: "Therapy Insights",
    category: "On Vulnerability",
  },
  {
    id: 7,
    text: "Snížení rizika civilizačních onemocnění.",
    author: "Carl Rogers",
    category: "On Self-Acceptance",
  },
  {
    id: 8,
    text: "Plán na míru dle Vašeho denního režimu a preferencí.",
    author: "Mindful Living",
    category: "On Journey",
  },
  {
    id: 9,
    text: "Snížení expozice toxinům z prostředí",
    author: "Environmental Health Expert",
    category: "On Awareness",
  },
  {
    id: 10,
    text: "Hormonální rovnováha a optimalizace",
    author: "Hormonal Health Expert",
    category: "On Balance",
  },
  {
    id: 11,
    text: "Konzultace laboratorních výsledků",
    author: "Laboratory Expert",
    category: "On Testing",
  },
  {
    id: 12,
    text: "Doporučení pohybového režimu",
    author: "Fitness Expert",
    category: "On Movement",
  },
  {
    id: 13,
    text: "Regulace nervového systému",
    author: "Neurobiology Expert",
    category: "On Regulation",
  },
  {
    id: 14,
    text: "Optimalizace spánku a regenerace",
    author: "Sleep Expert",
    category: "On Recovery",
  },
  {
    id: 15,
    text: "Kultivace pozornosti",
    author: "Mindfulness Expert",
    category: "On Awareness",
  },
];

export function ServicesCarouselSection() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-10 py-16 md:py-32">
        <Carousel setApi={setApi} plugins={[Autoplay({})]}>
          <CarouselContent>
            {carouselItems.map((item) => (
              <CarouselItem className="basis-1/3" key={item.id}>
                {item.text}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
