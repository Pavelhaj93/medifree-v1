import { ServicesCarouselSection as ServicesCarouselComponent } from "@/app/components/sections/homepage/SevicesCarouselSection";
import type { AllHomepageServicesQueryResult } from "@/sanity.types";

type ServicesCarouselSectionProps = {
  block: {
    _type: string;
    _key: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    showAllServices?: boolean;
    selectedServices?: AllHomepageServicesQueryResult;
    backgroundColor?: string;
  };
};

export default function ServicesCarouselSection({
  block,
}: ServicesCarouselSectionProps) {
  const {
    showAllServices = true,
    selectedServices = [],
    backgroundColor = "bg-white",
  } = block;

  // Use the services passed in from the page builder query
  const services = selectedServices || [];

  return (
    <div className={backgroundColor}>
      <ServicesCarouselComponent services={services} />
    </div>
  );
}
