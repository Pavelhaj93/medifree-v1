"use client";

import Image from "next/image";
import Link from "next/link";
import { Headphones, Instagram } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { michaelaInstagram, sharedInstagram } from "@/app/lib/social-links";
import { useInView, getAnimationClasses } from "@/app/hooks/useInView";

export default function SocialConnectSection() {
  const { ref: leftRef, isInView: leftInView } = useInView();
  const { ref: rightRef, isInView: rightInView } = useInView({
    threshold: 0.2,
  });

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side – hlavní výzva k akci */}
          <div
            ref={leftRef}
            className={`flex-1 max-w-xl items-center flex-col flex md:block ${getAnimationClasses(leftInView, "fade-in-up")}`}
          >
            <Badge variant="primary" className="mb-4">
              POSLOUCHEJTE A SLEDUJTE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Buďte součástí naší komunity
            </h2>
            <p className="text-gray-600 mb-8">
              Sledujte nás na sociálních sítích a zůstaňte v obraze s novinkami
              i inspirací pro zdravý životní styl.
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              {/* <Link
                href="#"
                className="bg-white text-black rounded-full px-5 py-2.5 flex items-center hover:shadow border border-black transition"
              >
                <Image
                  src="/icons/hero-hero.svg"
                  alt="HeroHero"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                HeroHero
              </Link> */}

              <Link
                href={sharedInstagram}
                className="bg-pink-600 text-white rounded-full px-5 py-2.5 flex items-center hover:bg-pink-700 transition"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Instagram
              </Link>
            </div>
          </div>

          {/* Right side – jen vizuál / podcast */}
          <div
            ref={rightRef}
            className={`flex-1 flex justify-center ${getAnimationClasses(rightInView, "fade-in", 400)}`}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <Image
                src="/images/homepage/podcast.png"
                alt="Mindful Moments Podcast"
                fill
                className="object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-full shadow-md">
                <Headphones className="size-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
