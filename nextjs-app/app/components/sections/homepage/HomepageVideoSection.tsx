"use client";

import { VideoQueryResult } from "@/sanity.types";
import { useEffect, useRef, useState } from "react";

export const HomepageVideoSection = ({
  video,
}: {
  video: VideoQueryResult;
}) => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Temporary type cast until mobileVideoFile is added to Sanity and types are regenerated
  const videoData = video as any;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    const target = sectionRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    const desktopVid = desktopVideoRef.current;
    const mobileVid = mobileVideoRef.current;

    if (desktopVid) {
      desktopVid.volume = 0.2;
      if (isInView) {
        desktopVid.play().catch((err) => {
          console.warn("Desktop autoplay blocked:", err);
        });
      } else {
        desktopVid.pause();
      }
    }

    if (mobileVid) {
      mobileVid.volume = 0.2;
      if (isInView) {
        mobileVid.play().catch((err) => {
          console.warn("Mobile autoplay blocked:", err);
        });
      } else {
        mobileVid.pause();
      }
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="videoSection"
      className="relative w-full overflow-hidden opacity-0 animate-fade-in"
    >
      {/* Desktop Video */}
      {video?.videoFile?.asset?.url && (
        <video
          ref={desktopVideoRef}
          src={video?.videoFile?.asset?.url}
          className="hidden md:block w-full h-full max-h-screen bg-black"
          controls
          playsInline
          loop
        />
      )}

      {/* Mobile Video */}
      {videoData?.mobileVideoFile?.asset?.url && (
        <video
          ref={mobileVideoRef}
          src={videoData.mobileVideoFile.asset.url}
          className="md:hidden w-full h-full max-h-screen bg-black"
          controls
          playsInline
          loop
        />
      )}
    </section>
  );
};
