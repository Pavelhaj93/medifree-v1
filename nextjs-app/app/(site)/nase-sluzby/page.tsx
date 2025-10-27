import HeroSection from "@/app/components/others/HeroSection";
import { ServiceCard } from "@/app/components/sections/services/ServiceCard";
import ServicesCtaSection from "@/app/components/sections/services/ServicesCtaSection";
import ServicesGallerySection from "@/app/components/sections/services/ServicesGallerySection";
import ServicesItemSection from "@/app/components/sections/services/ServicesItemSection";
import { sanityFetch } from "@/sanity/lib/live";
import { allServicesQuery } from "@/sanity/queries";
import { serviceGalleriesQuery } from "@/sanity/queries/serviceGalleries";

export const metadata = {
  title: "Naše služby - Medifree",
  description:
    "Objevte širokou škálu zdravotních služeb, které nabízíme v Medifree. Od preventivních prohlídek po specializované léčebné postupy, náš tým odborníků je zde, aby vám poskytl nejlepší péči.",
};

export default async function ServicesPage() {
  const { data: servicesRaw } = await sanityFetch({
    query: allServicesQuery,
  });

  const services = servicesRaw.map((service: any) => ({
    ...service,
    price: service.price === null ? undefined : service.price,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection
        badge="Naše služby"
        title="Co nabízíme"
        description="Naším cílem je edukace o individuálních potřebách Vašeho organismu.
          Zjistíte, co potřebujete právě Vy, jaké parametry sledovat a jakým
          způsobem je udržovat v optimálním rozmezí."
      >
        <div className="grid md:grid-cols-3 gap-6 opacity-0 animate-fade-in animation-delay-600">
          {services.map((service, index) => (
            <ServiceCard
              key={service._id}
              {...service}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </HeroSection>

      <ServicesItemSection services={services} />
      <ServicesGallerySection />
      <ServicesCtaSection />
    </div>
  );
}
