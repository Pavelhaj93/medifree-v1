import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  ChevronLeft,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { doctors } from "@/app/lib/data/doctors";
import AboutTheAuthor from "@/components/sections/blogItem/AboutTheAuthor";
import RelatedArticles from "@/components/sections/blogItem/RelatedArticlesGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { postQuery } from "@/sanity/lib/queries";
import type { Person, PostQueryResult } from "@/sanity.types";
import Avatar from "@/components/sanity/Avatar";
import { PortableText } from "next-sanity";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // This would normally fetch the specific blog post based on the slug
  const { slug } = await params;

  const { data: article } = await sanityFetch({
    query: postQuery,
    params: { slug },
  });

  const post = article as PostQueryResult;

  return (
    <>
      <section className="bg-gray-50">
        <div className="container mx-auto">
          <div className="border-t-8 border-secondary" />
          <div className="border-t-8 border-primary w-2/5" />
          <div className="px-4 md:px-10 pt-8 pb-16">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary hover:text-secondary mb-8 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Zpět na blog
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="primary" className="rounded-full">
                  {post?.category}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {new Date(post?.date ?? "").toLocaleDateString("cs-CZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {post?.readTime} min čtení
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-medium mb-6">
                {post?.title}
              </h1>

              <div className="flex items-center justify-between mb-8">
                <Avatar person={post?.author as Person} />

                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="icon"
                    className="rounded-full w-9 h-9"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="primary"
                    size="icon"
                    className="rounded-full w-9 h-9"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
              <Image
                src="/images/blog/depression.png"
                alt="Hlavní článek"
                fill
                className="object-cover"
              />
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <PortableText value={post?.content ?? []} />
              </div>

              <div className="border-t border-b border-gray-200 py-6 my-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium mb-2">Sdílet</p>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="icon"
                        className="rounded-full w-9 h-9"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="primary"
                        size="icon"
                        className="rounded-full w-9 h-9"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="primary"
                        size="icon"
                        className="rounded-full w-9 h-9"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Tagy</p>
                    <div className="flex gap-2">
                      <Badge size="sm" variant="primary">
                        Úzkost
                      </Badge>
                      <Badge size="sm" variant="primary">
                        Duševní zdraví
                      </Badge>
                      <Badge size="sm" variant="primary">
                        Životní styl
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <AboutTheAuthor
                name={doctors.radim.name}
                description={doctors.radim.description}
                imageSrc="/images/blog/avatar.png"
              />

              {/* Pass related articles of same category */}
              <RelatedArticles />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
