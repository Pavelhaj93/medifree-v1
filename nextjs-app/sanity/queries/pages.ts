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
