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
    <section className={`bg-white py-8 md:py-16 ${className}`}>
      <div className="container mx-auto px-4 md:px-10 text-center">
        {badge && (
          <Badge variant="primary" className="mb-6">
            {badge}
          </Badge>
        )}

        <h1 className="text-4xl md:text-5xl font-medium mb-6">{title}</h1>

        <p className="text-gray-600 text-lg md:text-xl mx-auto mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((btn, idx) => (
            <Button key={idx} variant={btn.variant ?? "primary"} asChild>
              <Link href={btn.href}>{btn.label}</Link>
            </Button>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
