"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

// Helper function to get animation classes
export function getAnimationClasses(
  isInView: boolean,
  animation:
    | "fade-in"
    | "fade-in-up"
    | "slide-in-left"
    | "slide-in-right" = "fade-in-up",
  delay?: number
): string {
  const baseClasses = "transition-all duration-800 ease-out";
  const delayClass = delay ? `animation-delay-${delay}` : "";

  if (!isInView) {
    switch (animation) {
      case "fade-in":
        return `${baseClasses} opacity-0 ${delayClass}`;
      case "fade-in-up":
        return `${baseClasses} opacity-0 translate-y-8 ${delayClass}`;
      case "slide-in-left":
        return `${baseClasses} opacity-0 -translate-x-8 ${delayClass}`;
      case "slide-in-right":
        return `${baseClasses} opacity-0 translate-x-8 ${delayClass}`;
      default:
        return `${baseClasses} opacity-0 ${delayClass}`;
    }
  }

  return `${baseClasses} opacity-100 translate-y-0 translate-x-0 ${delayClass}`;
}
