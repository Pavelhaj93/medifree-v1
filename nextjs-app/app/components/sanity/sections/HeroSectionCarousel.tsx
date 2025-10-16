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
import { urlForImage } from "@/sanity/lib/utils";

type HeroSectionCarouselProps = {
  block: {
    _type: string;
    _key: string;
    heading?: string;
    subheading?: string;
    badge?: string;
    images?: Array<{
      asset?: any;
      alt?: string;
    }>;
    showBookButton?: boolean;
  };
};

export default function HeroSectionCarousel({
  block,
}: HeroSectionCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const {
    heading = "Váš prostor pro zdraví a rovnováhu",
    subheading = "Nabízíme celostní terapeutické přístupy, které vás podpoří na cestě k plnohodnotnému životu.",
    badge = "Medifree",
    images = [],
    showBookButton = true,
  } = block;

  return (
    <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
      {images.length > 0 && (
        <Carousel
          plugins={[plugin.current]}
          className="absolute inset-0 h-screen w-full"
          opts={{ loop: true }}
        >
          <CarouselContent className="h-screen">
            {images.map((image, idx) => (
              <CarouselItem key={idx} className="relative h-full w-full">
                <Image
                  src={
                    urlForImage(image)
                      ?.height(1600)
                      .width(2400)
                      .fit("crop")
                      .auto("format")
                      .quality(100)
                      .url() as string
                  }
                  sizes="100vw"
                  fill
                  alt={image?.alt || "Hero image"}
                  priority={idx === 0}
                  quality={100}
                  className="object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative container mx-auto h-full justify-center items-center my-auto px-4 md:px-10 text-center md:text-left text-white pb-10 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10">
          <div className="max-w-3xl">
            {badge && (
              <Badge variant="primary" className="mb-4 inline-block">
                {badge}
              </Badge>
            )}
            <h1 className="text-5xl md:text-6xl leading-tight mb-8">
              {heading}
            </h1>
            <p className="text-lg md:text-xl mb-8">{subheading}</p>
            {showBookButton && <BookButton />}
          </div>
        </div>
      </div>
    </section>
  );
}
