import ContactSectionComponent from "@/app/components/sections/homepage/ContactSection";
import type { GdprQueryResult } from "@/sanity.types";

type ContactSectionProps = {
  block: {
    _type: string;
    _key: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    description?: any; // blockContent
    showContactForm?: boolean;
    gdprDocument?: GdprQueryResult;
    backgroundColor?: string;
  };
};

export default function ContactSection({ block }: ContactSectionProps) {
  const { backgroundColor = "bg-white", gdprDocument } = block;

  return (
    <div className={backgroundColor}>
      <ContactSectionComponent
        gdpr={gdprDocument || null}
        className={backgroundColor}
      />
    </div>
  );
}
