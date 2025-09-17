import ContactFAQSection from "@/app/components/sections/contact/ContactFAQSection";
import ContactSection from "@/app/components/sections/homepage/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ContactSection first />
      <ContactFAQSection />
    </div>
  );
}
