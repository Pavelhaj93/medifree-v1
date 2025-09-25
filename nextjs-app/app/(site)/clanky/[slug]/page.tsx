import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, ChevronLeft } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import AboutTheAuthor from "@/app/components/sections/blogItem/AboutTheAuthor";
import RelatedArticles from "@/app/components/sections/blogItem/RelatedArticlesGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/queries";
import type { Person, PostQueryResult } from "@/sanity.types";
import Avatar from "@/app/components/sanity/Avatar";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
import SocialSitesShareButtons from "@/app/components/sections/blog/SocialSitesShareButtons";
import CustomPortableText from "@/app/components/sanity/PortableText";
import { PortableTextBlock } from "next-sanity";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const postUrl = `${baseUrl}/clanky/${post?.slug}`;

  return {
    title: post?.title,
    description: post?.description,
    authors: post?.author?.name ? [{ name: `${post.author.name}` }] : [],
    openGraph: {
      type: "article",
      url: postUrl,
      title: post?.title,
      description: post?.description,
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.description,
      images: ogImage ? [ogImage] : previousImages,
    },
  } satisfies Metadata;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await sanityFetch({
    query: postQuery,
    params: { slug },
  });

  return (
    <>
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 md:px-10 pt-8 pb-16">
          <Link
            href="/clanky"
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
              <Avatar
                person={
                  post?.author as Pick<
                    Person,
                    "name" | "specialization" | "picture"
                  >
                }
              />

              <div className="flex items-center gap-3">
                {/* <Button
                    variant="primary"
                    size="icon"
                    className="rounded-full w-9 h-9"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button> */}
                {/* TODO: finish share modal functionality if possible */}
                {/* <Button
                    variant="primary"
                    size="icon"
                    className="rounded-full w-9 h-9"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button> */}
              </div>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
            <Image
              src={
                urlForImage(post?.coverImage)
                  ?.height(500)
                  .width(1000)
                  .fit("crop")
                  .url() as string
              }
              alt={post?.coverImage?.alt || "Cover image"}
              fill
              className="object-cover"
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-6xl">
              <CustomPortableText
                value={post?.content as PortableTextBlock[]}
              />
            </div>

            <SocialSitesShareButtons />

            <AboutTheAuthor
              name={post?.author?.name ?? ""}
              description={post?.author?.specialization ?? ""}
              image={post?.author?.picture}
              slug={post?.author?.slug.current ?? ""}
            />

            {/* TODO: Pass related articles of same category */}
            {/* <RelatedArticles /> */}
          </div>
        </div>
      </section>
    </>
  );
}
