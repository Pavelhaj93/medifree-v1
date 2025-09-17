import { sanityFetch } from "@/sanity/lib/live";
import {
  allPersonsQuery,
  allVideosQuery,
  getPageQuery,
  pagesSlugs,
} from "@/sanity/lib/queries";
import type { Metadata } from "next";
import type { GetPageQueryResult } from "@/sanity.types";
import PageBuilderPage from "@/components/sanity/PageBuilder";
import { PageOnboarding } from "@/components/sanity/Onboarding";

import { Suspense } from "react";
import MiddleSection from "@/components/sections/homepage/MiddleSection";
import { TherapistSection } from "@/components/sections/homepage/TherapistSection";
import { ServicesCarouselSection } from "@/components/sections/homepage/SevicesCarouselSection";
import { ServicesSection } from "@/components/sections/homepage/ServicesSection";
import HowItWorksSection from "@/components/sections/homepage/HowItWorksSection";
import { CalendarSection } from "@/components/sections/homepage/CalendarSection";
import SocialConnectSection from "@/components/sections/homepage/SocialConnectSection";
import ContactSection from "@/components/sections/homepage/ContactSection";
import HeroSection from "@/components/sections/homepage/HeroSection";
import { HomepageVideoSection } from "@/components/sections/homepage/HomepageVideoSection";

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

export default async function Page() {
  const { data: allVideos } = await sanityFetch({
    query: allVideosQuery,
  });

  return (
    <>
      <HeroSection />
      <MiddleSection />
      <TherapistSection />
      <HomepageVideoSection video={allVideos[0]} />
      <ServicesSection />
      <HowItWorksSection />
      <ServicesCarouselSection />
      <CalendarSection />
      <SocialConnectSection />
      <ContactSection />
      {/* <PageBuilderPage page={page as GetPageQueryResult} /> */}
    </>
  );
}
