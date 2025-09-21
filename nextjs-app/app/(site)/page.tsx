import { sanityFetch } from "@/sanity/lib/live";
import {
  allHomepageServicesQuery,
  allPersonsQuery,
  allVideosQuery,
  gdprQuery,
  getPageQuery,
  pagesSlugs,
  videoQuery,
} from "@/sanity/queries";
import type { Metadata } from "next";
import type { GetPageQueryResult } from "@/sanity.types";
import PageBuilderPage from "@/app/components/sanity/PageBuilder";
import { PageOnboarding } from "@/app/components/sanity/Onboarding";

import { Suspense } from "react";
import MiddleSection from "@/app/components/sections/homepage/MiddleSection";
import { TherapistSection } from "@/app/components/sections/homepage/TherapistSection";

import HowItWorksSection from "@/app/components/sections/homepage/HowItWorksSection";
import { CalendarSection } from "@/app/components/sections/homepage/CalendarSection";
import SocialConnectSection from "@/app/components/sections/homepage/SocialConnectSection";
import ContactSection from "@/app/components/sections/homepage/ContactSection";
import HeroSection from "@/app/components/sections/homepage/HeroSection";
import { HomepageVideoSection } from "@/app/components/sections/homepage/HomepageVideoSection";
import { ServicesCarouselSection } from "../components/sections/homepage/SevicesCarouselSection";

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
  const { data: video } = await sanityFetch({
    query: videoQuery,
  });

  const { data: homepageServices } = await sanityFetch({
    query: allHomepageServicesQuery,
  });

  const { data: gdpr } = await sanityFetch({
    query: gdprQuery,
  });

  return (
    <>
      <HeroSection />
      <MiddleSection />
      <TherapistSection />
      <HomepageVideoSection video={video} />
      <ServicesCarouselSection services={homepageServices} />
      <HowItWorksSection />
      <CalendarSection />
      <SocialConnectSection />
      <ContactSection gdpr={gdpr} />
      {/* <PageBuilderPage page={page as GetPageQueryResult} /> */}
    </>
  );
}
