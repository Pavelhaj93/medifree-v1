import { AboutUsHeroSection } from "@/app/components/sections/about-us/AboutUsHeroSection";
import AboutUsTherapistSection from "@/app/components/sections/about-us/AboutUsTherapistSection";

export default function TherapistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AboutUsHeroSection />
      <AboutUsTherapistSection />
    </div>
  );
}
