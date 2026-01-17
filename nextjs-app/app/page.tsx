import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/queries/pages";
import type { Metadata } from "next";
import PageBuilder from "./components/sanity/PageBuilder";
import Head from "next/head";

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { slug: "home" },
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page() {
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getPageQuery, params: { slug: "home" } }),
  ]);
  return (
    <>
      <Head>
        <title>{page.heading}</title>
      </Head>
      <PageBuilder page={page} />;
    </>
  );
}
