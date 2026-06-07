import { defineQuery } from "next-sanity";

export const freeResourceFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  thumbnail { asset, alt, _type },
  file {
    asset->{
      _id,
      url,
      originalFilename,
      mimeType
    }
  },
  embedUrl,
  publishedAt,
  _createdAt
`;

export const allFreeResourcesQuery = defineQuery(
  `*[_type == "freeResource"] | order(publishedAt desc) { ${freeResourceFields} }`
);
