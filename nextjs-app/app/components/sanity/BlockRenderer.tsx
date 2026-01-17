import Cta from "@/app/components/sanity/Cta";
import Info from "@/app/components/sanity/InfoSection";
import HeroSectionCarousel from "@/app/components/sanity/HeroSectionCarousel";
import Quote from "@/app/components/sanity/Quote";
import MediaCardsCarousel from "@/app/components/sanity/MediaCardsCarousel";
import Stepper from "@/app/components/sanity/Stepper";
import ContentDisplayBlock from "@/app/components/sanity/ContentDisplayBlock";
import ContactSection from "@/app/components/sanity/ContactSection";
import { dataAttr } from "@/sanity/lib/utils";
import VideoSection from "./VideoSection";
import ContentDisplayBlockCompact from "./ContentDisplayBlockCompact";
import HeroSection from "../others/HeroSection";
import TherapistSection from "./TherapistSection";
import ServiceCardBlock from "./ServiceCardBlock";
import MasonryGallery from "./MasonryGallery";
import ProductShowcase from "./ProductShowcase";
import PostShowcase from "./PostShowcase";
import TextBlock from "./TextBlock";
import FaqCardsGrid from "./FaqCardsGrid";
import FaqAccordion from "./FaqAccordion";
import CartPage from "./CartPage";
import CheckoutSuccess from "./CheckoutSuccess";
import LegalDocumentsSection from "./LegalDocumentsSection";

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
  cta: Cta,
  infoSection: Info,
  heroSectionCarousel: HeroSectionCarousel,
  quote: Quote,
  videoSection: VideoSection,
  mediaCardsCarousel: MediaCardsCarousel,
  stepper: Stepper,
  contentDisplayBlock: ContentDisplayBlock,
  contactSection: ContactSection,
  contentDisplayBlockCompact: ContentDisplayBlockCompact,
  heroSection: HeroSection,
  therapistSection: TherapistSection,
  serviceCardBlock: ServiceCardBlock,
  masonryGallery: MasonryGallery,
  productShowcase: ProductShowcase,
  postShowcase: PostShowcase,
  textBlock: TextBlock,
  faqCardsGrid: FaqCardsGrid,
  faqAccordion: FaqAccordion,
  cart: CartPage,
  checkoutSuccess: CheckoutSuccess,
  legalDocumentsSection: LegalDocumentsSection,
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
