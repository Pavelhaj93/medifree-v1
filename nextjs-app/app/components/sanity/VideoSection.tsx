import * as React from "react";

export type VideoSectionBlock = {
  video?: { asset?: { url?: string } };
  mobileVideo?: { asset?: { url?: string } };
  title?: string;
  description?: string;
};

export default function VideoSection({ block }: { block: VideoSectionBlock }) {
  const desktopVideoRef = React.useRef<HTMLVideoElement>(null);
  const mobileVideoRef = React.useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
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

  React.useEffect(() => {
    const desktopVid = desktopVideoRef.current;
    const mobileVid = mobileVideoRef.current;
    const hasMobileVideo = block.mobileVideo?.asset?.url;
    const shouldPlayMobile = isMobile && hasMobileVideo;
    const shouldPlayDesktop = !isMobile || !hasMobileVideo;
    if (desktopVid) {
      desktopVid.volume = 0.2;
      if (isInView && shouldPlayDesktop) {
        desktopVid.play().catch(() => {});
      } else {
        desktopVid.pause();
      }
    }
    if (mobileVid) {
      mobileVid.volume = 0.2;
      if (isInView && shouldPlayMobile) {
        mobileVid.play().catch(() => {});
      } else {
        mobileVid.pause();
      }
    }
  }, [isInView, isMobile, block]);

  return (
    <section
      ref={sectionRef}
      id="videoSection"
      className="relative w-full overflow-hidden opacity-0 animate-fade-in"
    >
      {/* Desktop Video */}
      {block.video?.asset?.url && (
        <video
          ref={desktopVideoRef}
          src={block.video.asset.url}
          className="hidden md:block w-full h-full max-h-screen bg-black"
          controls
          playsInline
          loop
        />
      )}
      {/* Mobile Video */}
      {block.mobileVideo?.asset?.url && (
        <video
          ref={mobileVideoRef}
          src={block.mobileVideo.asset.url}
          className="md:hidden w-full h-full max-h-screen bg-black"
          controls
          playsInline
          loop
        />
      )}
    </section>
  );
}
