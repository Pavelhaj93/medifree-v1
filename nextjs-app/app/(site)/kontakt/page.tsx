import ContactFAQSection from "@/app/components/sections/contact/ContactFAQSection";
import ContactSection from "@/app/components/sections/homepage/ContactSection";
import { sanityFetch } from "@/sanity/lib/live";
import { gdprQuery } from "@/sanity/lib/queries";

export default async function ContactPage() {
  const { data: gdpr } = await sanityFetch({
    query: gdprQuery,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <ContactSection gdpr={gdpr} />
      <ContactFAQSection />
    </div>
  );
}
