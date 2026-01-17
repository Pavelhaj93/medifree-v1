import { defineQuery } from "next-sanity";
import {
  linkFields,
  linkReference,
  baseProductFields,
  postFields,
} from "./fragments";
import { faqFields } from "./faqs";

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => { ${linkFields} },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{ ..., ${linkReference} }
        }
      },
      _type == "videoSection" => {
        ...,
        video{
          asset->
        },
        mobileVideo{
          asset->
        }
      },
      _type == "contentDisplayBlock" => {
        ...,
        image,
        link{
          ...,
          page->{
            slug
          }
        }
      },
      _type == "therapistSection" => {
        ...,
        therapist->
      },
      _type == "serviceCardBlock" => {
        ...,
        image { asset, alt, _type },
        content
      },
      _type == "masonryGallery" => {
        ...,
        images[] { asset, alt, _type, _key }
      },
      _type == "productShowcase" => {
        ...,
        "featuredProduct": *[_type == "product" && featured == true][0]{ ${baseProductFields} },
        "products": *[_type == "product"] | order(name asc) { ${baseProductFields} }
      },
      _type == "postShowcase" => {
        ...,
        "firstPost": *[_type == "post"] | order(date desc)[0]{ ${postFields}  },
        "posts": *[_type == "post"] | order(date desc) { ${postFields}  }
      },
      _type == "faqCardsGrid" => {
        ...,
        "faqs": *[_type == "faq"] | order(order asc, question asc) { ${faqFields} } 
      },
      _type == "faqAccordion" => {
        ...,
        "faqs": *[_type == "faq"] | order(order asc, question asc) { ${faqFields} } 
      },
      _type == "checkoutSuccess" => {
        ...
      },
      _type == "legalDocumentsSection" => {
        ...,
        "legalDocuments": *[_type == "legalDocument"] | order(title asc) {
          _id,
          title,
          description,
          category,
          file {
            asset->{
              _id,
              url,
              assetId,
              originalFilename,
              extension,
              size
            }
          },
          _createdAt,
          _updatedAt,
          _rev
        }
      }
    },
  }
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)]
  | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt
  }
`);

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);
