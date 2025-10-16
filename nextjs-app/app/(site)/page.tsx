import { sanityFetch } from "@/sanity/lib/live";
import { homepageQuery } from "@/sanity/queries";
import type { Metadata } from "next";
import PageBuilder from "@/app/components/sanity/PageBuilder";
import type { HomepageQueryResult } from "@/sanity.types";
import Onboarding, { PageOnboarding } from "../components/sanity/Onboarding";

// type Props = {
//   params: Promise<{ slug: string }>;
// };

// /**
//  * Generate the static params for the page.
//  * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
//  */
// export async function generateStaticParams() {
//   const { data } = await sanityFetch({
//     query: pagesSlugs,
//     // // Use the published perspective in generateStaticParams
//     perspective: "published",
//     stega: false,
//   });
//   return data;
// }

// /**
//  * Generate metadata for the page.
//  * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
//  */
// export async function generateMetadata(props: Props): Promise<Metadata> {
//   const params = await props.params;
//   const { data: page } = await sanityFetch({
//     query: getPageQuery,
//     params,
//     // Metadata should never contain stega
//     stega: false,
//   });

//   return {
//     title: page?.name,
//     description: page?.heading,
//   } satisfies Metadata;
// }

export async function generateMetadata(): Promise<Metadata> {
  const { data: homepage } = await sanityFetch({
    query: homepageQuery,
    stega: false,
  });

  return {
    title: homepage?.title || "Medifree - Váš prostor po zdraví a rovnováhu",
    description:
      homepage?.description ||
      "Objevte Medifree, váš online prostor pro fyzické ale i duševní zdraví.",
  } satisfies Metadata;
}

export default async function Page() {
  const { data: homepage } = await sanityFetch({
    query: homepageQuery,
  });

  if (!homepage) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    );
  }

  return <PageBuilder page={homepage as HomepageQueryResult} />;
}
