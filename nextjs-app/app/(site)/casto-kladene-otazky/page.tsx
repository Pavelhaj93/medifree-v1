import { Badge } from "@/app/components/ui/Badge";
import { sanityFetch } from "@/sanity/lib/live";
import { allFaqsQuery } from "@/sanity/lib/queries";

export default async function ContactFAQSection() {
  const { data: faqItems } = await sanityFetch({
    query: allFaqsQuery,
  });

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto ">
        <div className="border-t-8 border-secondary" />
        <div className="border-t-8 border-primary w-2/5" />
        <div className="px-4 md:px-10 py-16 md:pb-32">
          <div className="text-center">
            <Badge className="mb-6" variant="primary">
              FAQ
            </Badge>
          </div>
          <h2 className="text-3xl font-medium mb-12 text-center">
            Často kladené otázky
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto">
            {/* FAQ Item */}
            {faqItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-xs"
              >
                <h3 className="text-xl font-medium mb-4">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
