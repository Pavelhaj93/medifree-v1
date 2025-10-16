import React from "react";

import Cta from "@/app/components/sanity/Cta";
import Info from "@/app/components/sanity/InfoSection";
import HeroSectionCarousel from "@/app/components/sanity/sections/HeroSectionCarousel";
import QuoteSection from "@/app/components/sanity/sections/QuoteSection";
import TherapistSection from "@/app/components/sanity/sections/TherapistSection";
import VideoSection from "@/app/components/sanity/sections/VideoSection";
import ServicesCarouselSection from "@/app/components/sanity/sections/ServicesCarouselSection";
import HowItWorksSection from "@/app/components/sanity/sections/HowItWorksSection";
import CalendarSection from "@/app/components/sanity/sections/CalendarSection";
import SocialConnectSection from "@/app/components/sanity/sections/SocialConnectSection";
import ContactSection from "@/app/components/sanity/sections/ContactSection";
import { dataAttr } from "@/sanity/lib/utils";

type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _key: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
  pageId: string;
  pageType: string;
};

const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
  heroSectionCarousel: HeroSectionCarousel,
  quoteSection: QuoteSection,
  therapistSection: TherapistSection,
  videoSection: VideoSection,
  servicesCarouselSection: ServicesCarouselSection,
  howItWorksSection: HowItWorksSection,
  calendarSection: CalendarSection,
  socialConnectSection: SocialConnectSection,
  contactSection: ContactSection,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
}: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== "undefined") {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded-sm">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key }
  );
}
