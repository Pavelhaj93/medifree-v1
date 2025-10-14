import { defineQuery } from "next-sanity";
import { linkFields, linkReference } from "./fragments";

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
      _type == "heroSectionCarousel" => {
        ...,
        images[]{
          ...,
          asset->{
            ...,
            _id,
            url
          }
        }
      },
      _type == "quoteSection" => {
        ...
      },
      _type == "therapistSection" => {
        ...,
        selectedTherapists[]->{
          _id,
          name,
          slug,
          description,
          topics,
          mainImage{
            ...,
            asset->{
              ...,
              _id,
              url
            }
          }
        }
      },
      _type == "videoSection" => {
        ...,
        video->{
          _id,
          title,
          description,
          videoFile{
            asset->{
              ...,
              _id,
              url
            }
          }
        }
      },
      _type == "servicesCarouselSection" => {
        ...,
        selectedServices[]->{
          _id,
          title,
          description,
          image{
            ...,
            asset->{
              ...,
              _id,
              url
            }
          },
          slug
        }
      },
      _type == "howItWorksSection" => {
        ...
      },
      _type == "calendarSection" => {
        ...
      },
      _type == "socialConnectSection" => {
        ...
      },
      _type == "contactSection" => {
        ...,
        gdprDocument->{
          _id,
          title,
          content
        }
      },
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
