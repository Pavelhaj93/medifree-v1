import { Badge } from "@/app/components/ui/Badge";
import { HeroSection as HeroSectionProps } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

export default function HeroSection({ block }: { block: HeroSectionProps }) {
  const { title, subtitle, badgeText, primaryButton, secondaryButton, cards } =
    block ?? {};

  return (
    <section
      className={`relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-green-50 py-8 md:py-16`}
    >
      ]{/* Background decorative elements */}
      <div className="absolute container mx-auto px-4 md:px-10 text-center inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-green-100 rounded-2xl opacity-40 rotate-45 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-20 h-20 bg-green-200 rounded-2xl opacity-30 rotate-12 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      <div className="relative container mx-auto px-4 md:px-10 text-center">
        {/* Badge with enhanced styling */}
        {badgeText && (
          <div className="mb-8 opacity-0 animate-fade-in">
            <Badge variant="primary" className="mb-6">
              {badgeText}
            </Badge>
          </div>
        )}

        {/* Title with gradient text */}
        <div className="mb-8 opacity-0 animate-fade-in-up animation-delay-200">
          {title && (
            <h1 className="text-4xl md:text-5xl font-medium mb-6 text-primary">
              {title}
            </h1>
          )}
          {/* Subtle underline decoration */}
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-green-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Description with better typography */}
        <div className="mb-12 opacity-0 animate-fade-in-up animation-delay-400">
          {subtitle && (
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              {subtitle}
            </p>
          )}
        </div>

        {/* Enhanced buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 opacity-0 animate-fade-in-up animation-delay-600">
          {primaryButton && (
            <Button variant="primary" asChild>
              <Link href={primaryButton.url}>{primaryButton.text}</Link>
            </Button>
          )}
          {secondaryButton && (
            <Button variant="secondary" asChild>
              <Link href={secondaryButton.url}>{secondaryButton.text}</Link>
            </Button>
          )}
        </div> */}

        {/* Children content */}
        {cards && (
          <div className="opacity-0 animate-fade-in-up animation-delay-800">
            <div className="grid md:grid-cols-3 gap-6 opacity-0 animate-fade-in animation-delay-600">
              {cards.map((card, index) => (
                <Link
                  key={card.slug.current}
                  href={`#${card.slug.current}`}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={
                        urlForImage(card.image)
                          ?.width(120)
                          .height(120)
                          .fit("crop")
                          .url() as string
                      }
                      alt={card.image?.alt || card.title}
                      width={120}
                      height={120}
                    />
                  </div>
                  <h3 className="font-medium text-xl mb-4">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
