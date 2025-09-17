import { Badge } from "@/app/components/ui/Badge";
import { sanityFetch } from "@/sanity/lib/live";
import { allFaqsQuery } from "@/sanity/lib/queries";
import AccordionFAQSection from "./AccordionFAQSection";

export default async function ContactFAQSection() {
  const { data: faqItems } = await sanityFetch({
    query: allFaqsQuery,
  });

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-center mb-8">
        <Badge variant="primary">FAQ</Badge>
      </div>
      <h2 className="text-3xl font-medium mb-12 text-center">
        Často kladené dotazy
      </h2>

      <div className="max-w-3xl mx-auto">
        <AccordionFAQSection faqItems={faqItems} />
      </div>
    </section>
  );
}
