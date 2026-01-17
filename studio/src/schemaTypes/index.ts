import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {product} from './documents/product'
import {faq} from './documents/faq'
import {legalDocument} from './documents/legalDocument'
import {quote} from './objects/quote'
import {
  heroSectionCarousel,
  videoSection,
  mediaCard,
  mediaCardsCarousel,
  step,
  stepper,
  cta,
  contentDisplayBlock,
  contactSection,
  therapistSection,
  serviceCardBlock,
  masonryGallery,
  productShowcase,
  calendarSection,
  textBlock,
  faqCardsGrid,
  faqAccordion,
  cart,
  checkoutSuccess,
  legalDocumentsSection,
} from './objects'
import {contentDisplayBlockCompact} from './objects/contentDisplayBlockCompact'
import {heroSection} from './objects/heroSection'
import {heroSectionCard} from './objects/heroSectionCard'
import {postShowcase} from './objects/postShowcase'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  person,
  post,
  product,
  faq,
  legalDocument,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  heroSectionCarousel,
  quote,
  videoSection,
  mediaCard,
  mediaCardsCarousel,
  step,
  stepper,
  cta,
  contentDisplayBlock,
  contactSection,
  contentDisplayBlockCompact,
  heroSection,
  heroSectionCard,
  therapistSection,
  serviceCardBlock,
  masonryGallery,
  productShowcase,
  calendarSection,
  postShowcase,
  textBlock,
  faqCardsGrid,
  faqAccordion,
  cart,
  checkoutSuccess,
  legalDocumentsSection,
]
