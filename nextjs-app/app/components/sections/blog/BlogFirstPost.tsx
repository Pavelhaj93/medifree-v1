import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { urlForImage } from "@/sanity/lib/utils";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { FirstPostQueryResult, ProductShowcase } from "@/sanity.types";

export default async function BlogFirstPost({
  firstPost,
  recommendedBadgeText,
}: {
  firstPost?: FirstPostQueryResult;
  recommendedBadgeText?: ProductShowcase["recommendedBadgeText"];
}) {
  if (!firstPost) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-100 rounded-2xl overflow-hidden opacity-0 animate-fade-in-up">
            <Link href={`/clanky/${firstPost?.slug}`}>
              <Image
                src={
                  urlForImage(firstPost?.coverImage)
                    ?.height(720)
                    .width(1280)
                    .auto("format")
                    .url() as string
                }
                alt="Featured article"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="absolute top-4 left-4">
              <Badge variant="primary">{recommendedBadgeText}</Badge>
            </div>
          </div>
          <div className="opacity-0 animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="primary" className="rounded-full">
                {firstPost?.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays className="h-4 w-4 mr-1" />
                {new Date(firstPost?.date ?? "").toLocaleDateString("cs-CZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {firstPost?.readTime} min čtení
              </div>
            </div>
            <Link href={`/clanky/${firstPost?.slug}`}>
              <h2 className="text-3xl hover:underline hover:text-primary transition-colors font-medium mb-4">
                {firstPost?.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-6">{firstPost?.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  className="object-cover"
                  fill={true}
                  alt={stegaClean(firstPost?.author?.picture?.alt) || ""}
                  src={
                    urlForImage(firstPost?.author?.picture)
                      ?.height(720)
                      .width(1280)
                      .auto("format")
                      .url() as string
                  }
                />
              </div>
              <div>
                <p className="font-medium">{firstPost?.author?.name}</p>
                <p className="text-sm text-gray-500">
                  {firstPost?.author?.specialization}
                </p>
              </div>
            </div>
            <Button variant="primary" asChild>
              <Link href={`/clanky/${firstPost?.slug}`}>
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
