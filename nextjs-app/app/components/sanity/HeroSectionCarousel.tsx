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
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import { iconMap } from "@/app/components/sanity/iconMap";

type HeroSectionCarouselBlock = {
  pictures?: Array<any>;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  showBookButton?: boolean;
  button?: {
    text?: string;
    linkType?: "page" | "url";
    page?: { slug?: { current: string } };
    url?: string;
    icon?: string;
  };
};

export default function HeroSectionCarousel({
  block,
}: {
  block: HeroSectionCarouselBlock;
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  // Icon rendering (Lucide, mapped)
  const Icon = block.button?.icon ? iconMap[block.button.icon] : undefined;

  // Determine button link based on linkType
  const buttonHref =
    block.button?.linkType === "url"
      ? block.button?.url
      : block.button?.page?.slug?.current
        ? `/${block.button.page.slug.current}`
        : undefined;

  const isExternal = block.button?.linkType === "url";

  return (
    <section className="relative h-175 flex items-center justify-center overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="absolute inset-0 h-screen w-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-screen">
          {block.pictures?.map((src: any, idx: number) => (
            <CarouselItem key={idx} className="relative h-full w-full">
              <Image
                src={
                  urlForImage(src)
                    ?.height(1600)
                    .width(2400)
                    .fit("crop")
                    .auto("format")
                    .quality(90)
                    .url() as string
                }
                sizes="100vw"
                fill
                alt={src?.alt || block.badgeText || "Medifree"}
                priority={idx === 0}
                quality={100}
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
            <Badge
              variant="primary"
              className="mb-4 inline-block opacity-0 animate-fade-in"
            >
              {block.badgeText || "Medifree"}
            </Badge>
            <h1 className="text-5xl md:text-6xl leading-tight mb-8 opacity-0 animate-fade-in-up animation-delay-200">
              {block.title || "Váš prostor pro zdraví a rovnováhu"}
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-400">
              {block.subtitle ||
                "Nabízíme celostní terapeutické přístupy, které vás podpoří na cestě k plnohodnotnému životu."}
            </p>
            {buttonHref && block.button?.text && (
              <div className="opacity-0 animate-fade-in-up animation-delay-600">
                <Link
                  href={buttonHref}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-primary/90 transition"
                >
                  {block.button.text}
                  {Icon && <Icon size={20} />}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
