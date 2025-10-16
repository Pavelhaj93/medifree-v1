import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {homepage} from './singletons/homepage'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {product} from './documents/product'
import {faq} from './documents/faq'
import {service} from './documents/service'
import {video} from './documents/video'
import {homepageService} from './documents/homepageService'
import {legalDocument} from './documents/legalDocument'
import {homepagePicture} from './documents/homepagePicture'
import {serviceGallery} from './documents/serviceGallery'
import {newAndEvent} from './documents/newAndEvent'

// Homepage page builder components
import {heroSectionCarousel} from './objects/heroSectionCarousel'
import {quoteSection} from './objects/quoteSection'
import {therapistSection} from './objects/therapistSection'
import {videoSection} from './objects/videoSection'
import {servicesCarouselSection} from './objects/servicesCarouselSection'
import {howItWorksSection} from './objects/howItWorksSection'
import {calendarSection} from './objects/calendarSection'
import {socialConnectSection} from './objects/socialConnectSection'
import {contactSection} from './objects/contactSection'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  homepage,
  // Documents
  page,
  post,
  person,
  product,
  faq,
  service,
  video,
  homepageService,
  legalDocument,
  homepagePicture,
  serviceGallery,
  newAndEvent,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  // Homepage page builder components
  heroSectionCarousel,
  quoteSection,
  therapistSection,
  videoSection,
  servicesCarouselSection,
  howItWorksSection,
  calendarSection,
  socialConnectSection,
  contactSection,
]
