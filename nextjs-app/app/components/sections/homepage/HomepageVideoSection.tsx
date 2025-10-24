"use client";

import { VideoQueryResult } from "@/sanity.types";
import { useEffect, useRef, useState } from "react";

export const HomepageVideoSection = ({
  video,
}: {
  video: VideoQueryResult;
}) => {
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

    vid.volume = 0.2;

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
    <section
      id="videoSection"
      className="relative w-full overflow-hidden opacity-0 animate-fade-in"
    >
      {video?.videoFile?.asset?.url && (
        <video
          ref={desktopVideoRef}
          src={video?.videoFile?.asset?.url}
          className="w-full h-full max-h-screen bg-black"
          controls
          playsInline
          loop
        />
      )}
    </section>
  );
};
