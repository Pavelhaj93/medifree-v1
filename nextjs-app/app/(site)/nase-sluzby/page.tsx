import ServicesCtaSection from "@/components/sections/services/ServicesCtaSection";
import ServicesHeroSection from "@/components/sections/services/ServicesHeroSection";
import ServicesItemSection from "@/components/sections/services/ServicesItemSection";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ServicesHeroSection />
      <ServicesItemSection />
      <ServicesCtaSection />
    </div>
  );
}
