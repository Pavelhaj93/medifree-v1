"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/Carousel";
import { Badge } from "@/app/components/ui/Badge";
import { BookButton } from "@/app/components/others/BookButton";

const images = [
  "/images/homepage/hero_1.jpg",
  "/images/homepage/hero_2.jpg",
  "/images/homepage/hero_3.jpg",
];

export default function HeroSectionCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
      {/* Carousel background */}
      <Carousel
        plugins={[plugin.current]}
        className="absolute inset-0 h-screen w-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-screen">
          {images.map((src, idx) => (
            <CarouselItem key={idx} className="relative h-full w-full">
              <Image
                src={src}
                alt={`Hero background ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative container mx-auto h-full justify-center items-center my-auto px-4 md:px-10 text-center md:text-left text-white pb-10 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4 inline-block">
              Medifree
            </Badge>
            <h1 className="text-5xl md:text-6xl leading-tight mb-8">
              Váš prostor pro zdraví a rovnováhu
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Nabízíme celostní terapeutické přístupy, které vás podpoří na
              cestě k plnohodnotnému životu.
            </p>
            <BookButton />
          </div>
        </div>
      </div>
    </section>
  );
}
