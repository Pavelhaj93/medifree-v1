import { defineQuery } from "next-sanity";
import { postFields, linkReference } from "./fragments";

export const allPostsQuery = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc){${postFields}}`
);
export const firstPostQuery = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc)[0]{${postFields}}`
);
export const morePostsQuery = defineQuery(
  `*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc)[0...$limit]{${postFields}}`
);
export const postQuery = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{content[]{...,markDefs[]{...,${linkReference}}},${postFields}}`
);
export const postPagesSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
);
