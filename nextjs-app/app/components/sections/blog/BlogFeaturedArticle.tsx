import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { sanityFetch } from "@/sanity/lib/live";
import { firstPostQuery } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

export default async function BlogFeaturedArticle() {
  const { data: featuredArticle } = await sanityFetch({
    query: firstPostQuery,
  });

  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Link href={`/clanky/${featuredArticle?.slug}`}>
              <Image
                src={
                  urlForImage(featuredArticle?.coverImage)
                    ?.height(720)
                    .width(1280)
                    .auto("format")
                    .url() as string
                }
                alt="Featured article"
                fill
                className="object-cover"
              />
            </Link>
            <div className="absolute top-4 left-4">
              <Badge variant="primary">Doporučené</Badge>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="primary" className="rounded-full">
                {featuredArticle?.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays className="h-4 w-4 mr-1" />
                {new Date(featuredArticle?.date ?? "").toLocaleDateString(
                  "cs-CZ",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {featuredArticle?.readTime} min čtení
              </div>
            </div>
            <Link href={`/clanky/${featuredArticle?.slug}`}>
              <h2 className="text-3xl hover:underline hover:text-primary transition-colors font-medium mb-4">
                {featuredArticle?.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-6">{featuredArticle?.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  className="object-cover"
                  fill={true}
                  alt={stegaClean(featuredArticle?.author?.picture?.alt) || ""}
                  src={
                    urlForImage(featuredArticle?.author?.picture)
                      ?.height(720)
                      .width(1280)
                      .auto("format")
                      .url() as string
                  }
                />
              </div>
              <div>
                <p className="font-medium">{featuredArticle?.author?.name}</p>
                <p className="text-sm text-gray-500">
                  {featuredArticle?.author?.specialization}
                </p>
              </div>
            </div>
            <Button variant="primary" asChild>
              <Link href={`/clanky/${featuredArticle?.slug}`}>
                Číst článek
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
