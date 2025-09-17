import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
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
  "author": author->{name, specialization, picture},
`;

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

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
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const firstPostQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const personQuery = defineQuery(`
    *[_type == "person" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    specialization,
    description,
    topics,
    mainImage,
    picture {
      asset->{
        _id,
        url
      },
      alt
    },
    video
  }
`);

export const allPersonsQuery = defineQuery(`
  *[_type == "person"] | order(name asc) {
    _id,
    name,
    slug,
    specialization,
    description,
    topics,
    mainImage,
    picture {
      asset->{
        _id,
        url
      },
      alt
    },
  }
`);

export const productQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    price,
    originalPrice,
    image,
    rating,
    reviews,
    description,
    featured,
    category,
    _createdAt, 
    _updatedAt,
    _rev,
    _type,
  }
`);

export const featuredProductQuery = defineQuery(`
  *[_type == "product" && featured == true][0] {
    _id,
    title,
    price,
    originalPrice,
    mainImage,
    rating,
    reviews,
    description,
    featured,
    category,
    _createdAt, 
    _updatedAt,
    _rev,
    _type,
  }
`);

export const allProductsQuery = defineQuery(`
  *[_type == "product"] | order(name asc) {
    _id,
    title,
    price,
    originalPrice,
    mainImage,
    rating,
    reviews,
    description,
    featured,
    category,
    _createdAt, 
    _updatedAt,
    _rev,
    _type,
    "slug": slug.current
  }
`);

export const allFaqsQuery = defineQuery(`
  *[_type == "faq"] | order(order asc, question asc) {
    _id,
    question,
    answer,
    category,
    order,
    _createdAt,
    _updatedAt
  }
`);

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(title asc) {
    _id,
    title,
    tag,
    description,
    content,
    price,
    priceType,
    image,
    _createdAt,
    _updatedAt,
    _type,
    _rev
  }
`);

export const videoQuery = defineQuery(`
  *[_type == "video" && _id == $id][0]{
    _id,
    title,
    description,
    videoFile
}`);

export const allVideosQuery = defineQuery(`
  *[_type == "video"] | order(title asc) {
    _id,
    title,
    description,
    videoFile,
    _createdAt,
    _updatedAt,
    _type,
    _rev
  }
`);

export const allHomepageServicesQuery = defineQuery(`
  *[_type == "homepageService"] | order(title asc) {
    _id,
    title,
    description,
    image,
    _createdAt,
    _updatedAt,
    _type,
    _rev
  }
`);
