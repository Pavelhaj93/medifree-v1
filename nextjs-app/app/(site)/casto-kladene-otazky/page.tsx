import HeroSection from "@/app/components/others/HeroSection";
import { Badge } from "@/app/components/ui/Badge";
import { sanityFetch } from "@/sanity/lib/live";
import { allFaqsQuery } from "@/sanity/queries/faqs";

export const metadata = {
  title: "Často kladené otázky - Medifree",
  description:
    "Najděte odpovědi na nejčastější otázky týkající se našich služeb, objednávek a dalších témat. Pokud nenajdete, co hledáte, neváhejte nás kontaktovat.",
};

export default async function ContactFAQSection() {
  const { data: faqItems } = await sanityFetch({
    query: allFaqsQuery,
  });

  return (
    <>
      <HeroSection
        badge="FAQ"
        title="Často kladené otázky"
        description="Najděte odpovědi na nejčastější otázky týkající se našich služeb,
           objednávek a dalších témat. Pokud nenajdete, co hledáte, neváhejte nás
           kontaktovat."
      />
      <section className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-10 text-center">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto">
            {/* FAQ Item */}
            {faqItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <h3 className="text-xl font-medium mb-4">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
