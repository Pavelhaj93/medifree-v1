import { sanityFetch } from "@/sanity/lib/live";
import { CalendarSection } from "@/components/sections/CalendarSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import MiddleSection from "@/components/sections/MiddleSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { TherapistSection } from "@/components/sections/TherapistSection";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import type { GetPageQueryResult } from "@/sanity.types";
import PageBuilderPage from "@/components/sanity/PageBuilder";
import { PageOnboarding } from "@/components/sanity/Onboarding";
import SocialConnect from "@/components/sections/SocialConnectSection";
import SocialConnectSection from "@/components/sections/SocialConnectSection";

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
  return (
    <>
      <HeroSection />
      <MiddleSection />
      <TherapistSection />
      <StatisticsSection />
      <ServicesSection />
      <HowItWorksSection />
      <CalendarSection />
      <SocialConnectSection />
      <ContactSection />
      {/* <PageBuilderPage page={page as GetPageQueryResult} /> */}
    </>
  );
}
