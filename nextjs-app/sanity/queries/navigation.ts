import { defineQuery } from "next-sanity";
import { imageAssetFields } from "./fragments";

// Everything the header dropdowns show: services from the "Naše služby" page,
// shop categories that have at least one product, the featured product,
// the newest article and the contact e-mail.
export const headerNavQuery = defineQuery(`{
  "services": *[_type == "page" && slug.current == "nase-sluzby"][0].pageBuilder[_type == "serviceCardBlock"]{
    _key,
    title,
    price,
    priceType,
    "description": pt::text(content[0]),
    image { ${imageAssetFields} }
  },
  "categories": array::unique(*[_type == "product"].category),
  "featuredProduct": *[_type == "product" && featured == true && defined(slug.current)][0]{
    title,
    "slug": slug.current,
    price,
    originalPrice,
    image { ${imageAssetFields} }
  },
  "latestPost": *[_type == "post" && defined(slug.current)] | order(date desc)[0]{
    title,
    "slug": slug.current,
    readTime,
    coverImage { ${imageAssetFields} }
  },
  "email": *[_type == "settings"][0].company.email
}`);
