// generate full screen video section
"use client";

import { Video } from "@/sanity.types";
import { useEffect, useRef, useState } from "react";

export const HomepageVideoSection = ({ video }: { video: Video }) => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    const target =
      typeof window !== "undefined" && window.innerWidth >= 768
        ? desktopVideoRef.current
        : mobileVideoRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  useEffect(() => {
    const target =
      typeof window !== "undefined" && window.innerWidth >= 768
        ? desktopVideoRef.current
        : mobileVideoRef.current;

    if (!target) return;

    if (isInView) {
      target.play().catch(() => {});
    } else {
      target.pause();
    }
  }, [isInView]);

  return (
    <section
      id="videoSection"
      className="relative w-full overflow-hidden md:h-auto"
    >
      {/* Desktop Video */}
      <div className="hidden md:block w-full h-full">
        <video
          ref={desktopVideoRef}
          src="https://cdn.sanity.io/files/rmirl1zi/test/2cc4c85392c4ff6c1ab4e99f6d8da00c2a1a06e3.mp4"
          className="w-full h-full max-h-screen pointer-events-none bg-black"
          autoPlay
          loop
          playsInline
          muted
          controls={false}
        />
      </div>

      {/* Mobile Video */}
      {/* <div className="block md:hidden relative w-full h-full">
        <video
          ref={mobileVideoRef}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_auto:video,q_auto/rukll0mxoskxhl3dgxlz`}
          className="w-full h-full max-h-screen pointer-events-none bg-black"
          autoPlay
          loop
          playsInline
          muted
          controls={false}
        />
      </div> */}
    </section>
  );
};
