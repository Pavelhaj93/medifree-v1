"use client";

import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/app/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { AllHomepageServicesQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { Badge } from "../../ui/Badge";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";

export function ServicesCarouselSection({
  services,
}: {
  services: AllHomepageServicesQueryResult;
}) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className=" bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-10">
        <div className="text-center mb-4">
          <AnimatedSection animation="fade-in" className="mb-6">
            <Badge variant={"primary"}>NAŠE SLUŽBY</Badge>
          </AnimatedSection>
          <AnimatedSection animation="fade-in-up" delay={200}>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Co pro vás můžeme udělat
            </h2>
          </AnimatedSection>
          <AnimatedSection animation="fade-in-up" delay={400}>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Komplexní péče zaměřená na optimalizaci vašeho zdraví a životního
              stylu
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection
          animation="fade-in"
          delay={600}
          className="max-w-7xl mx-auto"
        >
          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center gap-4 mb-6 md:hidden">
            <button
              onClick={() => api?.scrollPrev()}
              className="p-3 rounded-full bg-white border border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!api?.canScrollPrev()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="p-3 rounded-full bg-white border border-gray-200 hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!api?.canScrollNext()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Next slide</span>
            </button>
          </div>

          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {services.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group overflow-hidden p-0">
                    <CardContent className="p-0 relative h-[450px]">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={
                            urlForImage(item.image)
                              ?.width(600)
                              .height(900)
                              .fit("crop")
                              .quality(100)
                              .url() as string
                          }
                          alt={item.image?.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 288px"
                          quality={100}
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

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index + 1 === current
                    ? "bg-primary w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </AnimatedSection>

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
