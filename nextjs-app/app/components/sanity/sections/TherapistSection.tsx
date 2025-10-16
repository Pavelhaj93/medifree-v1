import { TherapistSectionClient } from "@/app/components/sections/homepage/TherapistSectionClient";
import type { AllPersonsQueryResult } from "@/sanity.types";

type TherapistSectionProps = {
  block: {
    _type: string;
    _key: string;
    title?: string;
    showAllTherapists?: boolean;
    selectedTherapists?: AllPersonsQueryResult;
    backgroundColor?: string;
  };
};

export default function TherapistSection({ block }: TherapistSectionProps) {
  const {
    showAllTherapists = true,
    selectedTherapists = [],
    backgroundColor = "bg-gray-50",
  } = block;

  // Use the therapists passed in from the page builder query
  const therapists = selectedTherapists || [];

  return (
    <div className={backgroundColor}>
      <TherapistSectionClient persons={therapists} />
    </div>
  );
}
