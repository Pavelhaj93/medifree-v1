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

export const baseProductFields = /* groq */ `
  _id,
  title,
  price,
  discount,
  image { ${imageAssetFields} },
  description,
  featured,
  category,
  ebookFile {
    asset->{
      _id,
      url,
      originalFilename,
      mimeType
    }
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
