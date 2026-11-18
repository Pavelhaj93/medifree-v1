import { defineQuery } from "next-sanity";
import { imageAssetFields, shopCategoryField } from "./fragments";

// Everything the header dropdowns show: services from the "Naše služby" page,
// product types and e-shop categories (to show only categories that have a product), the featured product,
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
  "products": *[_type == "product"]{ category, ${shopCategoryField} },
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
