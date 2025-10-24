import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import React from "react";

type HeroSectionProps = {
  badge?: string;
  title: string;
  description: string;
  buttons?: { label: string; href: string; variant?: "primary" | "outline" }[];
  className?: string;
  children?: React.ReactNode;
};

export default function HeroSection({
  badge,
  title,
  description,
  buttons = [],
  className = "",
  children,
}: HeroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 md:py-16 ${className}`}
    >
      {/* Background decorative elements */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4 md:px-10 text-center">
        {/* Badge with enhanced styling */}
        {badge && (
          <div className="mb-8 opacity-0 animate-fade-in">
            <Badge variant="primary" className="mb-6">
              {badge}
            </Badge>
          </div>
        )}

        {/* Title with gradient text */}
        <div className="mb-8 opacity-0 animate-fade-in-up animation-delay-200">
          <h1 className="text-4xl md:text-5xl font-medium mb-6 text-primary">
            {title}
          </h1>
          {/* Subtle underline decoration */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Description with better typography */}
        <div className="mb-12 opacity-0 animate-fade-in-up animation-delay-400">
          <p className="text-gray-600 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Enhanced buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 opacity-0 animate-fade-in-up animation-delay-600">
          {buttons.map((btn, idx) => (
            <Button key={idx} variant={btn.variant ?? "primary"} asChild>
              <Link href={btn.href}>{btn.label}</Link>
            </Button>
          ))}
        </div>

        {/* Children content */}
        {children && (
          <div className="opacity-0 animate-fade-in-up animation-delay-800">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
