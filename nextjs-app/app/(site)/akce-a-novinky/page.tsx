import HeroSection from "@/app/components/others/HeroSection";
import CustomPortableText from "@/app/components/sanity/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { newsAndEventsQuery } from "@/sanity/queries/newsAndEvents";
import { PortableTextBlock } from "next-sanity";

export default async function NewsAndEventsPage() {
  const { data: newsAndEventsContent } = await sanityFetch({
    query: newsAndEventsQuery,
  });
  return (
    <>
      <HeroSection
        badge="NEWS"
        title="Akce a novinky"
        description="Aktuální dění v naší ordinaci a plánované akce."
      />
      <section className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto my-10 px-4">
          <div className="prose max-w-none">
            {newsAndEventsContent?.content && (
              <CustomPortableText
                value={newsAndEventsContent.content as PortableTextBlock[]}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
