export const imageAssetFields = /* groq */ `
  asset,
  alt,
  _type
`;

export const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  description,
  category,
  tags,
  content,
  readTime,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{name, specialization, picture, slug},
`;

// E-shop category the customer sees (menu, filter). Products without one fall back by product type,
// so products saved before the field existed still land in a sensible category.
// Keep in sync with SHOP_CATEGORIES in app/lib/shop/kinds.ts and studio/src/schemaTypes/templates.ts.
export const shopCategoryField = /* groq */ `
  "shopCategory": coalesce(shopCategory, select(
    category in ["Ebooky", "Audionahrávky", "Video kurzy", "Ebook + Audio"] => "Digitální obsah",
    category == "Balíčky" => "Výhodné balíčky",
    category == "Dárkové poukazy" => "Dárkové poukazy",
    "Ostatní"
  ))
`;

export const baseProductFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  price,
  discount,
  image { ${imageAssetFields} },
  description,
  featured,
  category,
  ${shopCategoryField},
  "isAvailable": coalesce(stockStatus, "in") != "out",
  "stockStatus": coalesce(stockStatus, "in"),
  label,
  variantGroup,
  variantLabel,
  variantColor,
  packLabel,
  originalPrice,
  bundleItems[]->{
    _id,
    title,
    category,
    price
  },
  _createdAt,
  _updatedAt,
  _rev,
  _type
`;

export const basePersonFields = /* groq */ `
  _id,
  name,
  slug,
  specialization,
  description,
  topics,
  mainImage { ${imageAssetFields} },
  picture { ${imageAssetFields} },
  certifications,
  biography,
  extraBlock
`;

export const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

export const linkFields = /* groq */ `
  link {
    ...,
    ${linkReference}
  }
`;
