import { defineQuery } from "next-sanity";

export const serviceGalleriesQuery = defineQuery(`
    *[_type == "serviceGallery"][0]
`);
