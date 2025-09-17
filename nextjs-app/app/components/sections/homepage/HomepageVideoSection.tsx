"use client";

import { Video } from "@/sanity.types";
import { useEffect, useRef, useState } from "react";

export const HomepageVideoSection = ({ video }: { video: Video }) => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    const target = desktopVideoRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    const vid = desktopVideoRef.current;
    if (!vid) return;

    if (isInView) {
      // Attempt to start playback when visible
      vid.play().catch((err) => {
        // Autoplay with sound might be blocked until user interaction
        console.warn("Autoplay blocked:", err);
      });
    } else {
      vid.pause();
    }
  }, [isInView]);

  return (
    <section id="videoSection" className="relative w-full overflow-hidden">
      <video
        ref={desktopVideoRef}
        src="https://cdn.sanity.io/files/rmirl1zi/test/2cc4c85392c4ff6c1ab4e99f6d8da00c2a1a06e3.mp4"
        className="w-full h-full max-h-screen bg-black"
        controls // show native controls
        playsInline // keep it inline on iOS
        // no muted → audio enabled
        loop
      />
    </section>
  );
};
