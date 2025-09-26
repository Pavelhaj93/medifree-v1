import HeroSection from "@/app/components/others/HeroSection";
import ContactFAQSection from "@/app/components/sections/contact/ContactFAQSection";
import ContactSection from "@/app/components/sections/homepage/ContactSection";
import { sanityFetch } from "@/sanity/lib/live";
import { gdprQuery } from "@/sanity/queries";

export const metadata = {
  title: "Kontakt - Medifree",
  description:
    "Máte otázky nebo potřebujete pomoc? Kontaktujte náš tým Medifree prostřednictvím telefonu, e-mailu nebo online formuláře. Jsme zde, abychom vám pomohli s vašimi zdravotními potřebami.",
};

export default async function ContactPage() {
  const { data: gdpr } = await sanityFetch({
    query: gdprQuery,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection
        badge="Kontakt"
        title="Kontaktujte nás"
        description="Máte jakékoli otázky? Napiště nám a my se Vám co nejdříve ozveme."
      />
      <ContactSection gdpr={gdpr} />
      <ContactFAQSection />
    </div>
  );
}
