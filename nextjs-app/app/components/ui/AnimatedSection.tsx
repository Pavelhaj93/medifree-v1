"use client";

import { ReactNode } from "react";
import { useInView, getAnimationClasses } from "@/app/hooks/useInView";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fade-in" | "fade-in-up" | "slide-in-left" | "slide-in-right";
  delay?: number;
  threshold?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold });

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses(isInView, animation, delay)} ${className}`}
    >
      {children}
    </div>
  );
}
