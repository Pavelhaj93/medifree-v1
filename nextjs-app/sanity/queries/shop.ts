import { defineQuery } from "next-sanity";
import { baseProductFields } from "./fragments";

export const shopSettingsQuery = defineQuery(`
  *[_type == "settings"][0].shop{ dispatchTime, packetaLabel, packetaPrice, voucherRedeemInfo }
`);

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    ${baseProductFields},
    gallery[]{ asset, alt, _type, _key },
    body,
    voucherIncludes,
    voucherValidityMonths,
    forWhom,
    notSuitableFor,
    benefits,
    netWeight,
    servings,
    foodInfo,
    "variants": select(
      defined(variantGroup) => *[_type == "product" && variantGroup == ^.variantGroup && defined(slug.current)]
        | order(variantLabel asc){ _id, variantLabel, variantColor, packLabel, "slug": slug.current, "isAvailable": coalesce(stockStatus, "in") != "out", price },
      []
    )
  }
`);

export const companyQuery = defineQuery(`
  *[_type == "settings"][0].company{ name, address, ico, email, phone, instagram, registry }
`);

export const productSlugsQuery = defineQuery(`
  *[_type == "product" && defined(slug.current)]{ "slug": slug.current }
`);

// Server-side pricing for /api/checkout. Never trust prices sent by the browser.
export const checkoutProductsQuery = defineQuery(`
  *[_type == "product" && _id in $ids]{
    _id,
    title,
    category,
    price,
    "isAvailable": coalesce(stockStatus, "in") != "out",
    image
  }
`);

// Used only by the Stripe webhook: contains the private download URLs.
export const fulfillmentProductsQuery = defineQuery(`
  *[_type == "product" && _id in $ids]{
    _id,
    title,
    category,
    ebookFile { asset->{ url } },
    audioFile { asset->{ url } },
    videoFile { asset->{ url } },
    bundleItems[]->{
      _id, title, category,
      ebookFile { asset->{ url } },
      audioFile { asset->{ url } },
      videoFile { asset->{ url } }
    },
    voucherValidityMonths,
    voucherIncludes,
    "voucherBackgroundUrl": voucherBackground.asset->url,
    voucherGuides[]->{
      _id, title, category,
      ebookFile { asset->{ url } },
      audioFile { asset->{ url } },
      videoFile { asset->{ url } }
    }
  }
`);

export const shopLegalDocumentsQuery = defineQuery(`
  *[_type == "legalDocument" && category in ["Obchodní podmínky", "E-shop"] && defined(file.asset)]{
    title,
    "url": file.asset->url
  }
`);
