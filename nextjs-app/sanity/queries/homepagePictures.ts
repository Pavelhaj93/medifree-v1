import { defineQuery } from "next-sanity";

export const homepagePicturesQuery = defineQuery(`
    *[_type == "homepagePicture"][0]
`);
