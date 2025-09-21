import ServicesCtaSection from "@/app/components/sections/services/ServicesCtaSection";
import ServicesHeroSection from "@/app/components/sections/services/ServicesHeroSection";
import ServicesItemSection from "@/app/components/sections/services/ServicesItemSection";
import { sanityFetch } from "@/sanity/lib/live";
import { allServicesQuery } from "@/sanity/queries";

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
      <ServicesHeroSection services={services} />
      <ServicesItemSection services={services} />
      <ServicesCtaSection />
    </div>
  );
}
