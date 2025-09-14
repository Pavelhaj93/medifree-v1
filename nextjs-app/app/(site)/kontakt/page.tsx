import ContactFAQSection from "@/components/sections/contact/ContactFAQSection";
import ContactSection from "@/components/sections/homepage/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ContactSection first />
      <ContactFAQSection />
    </div>
  );
}
