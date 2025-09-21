import { defineQuery } from "next-sanity";

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(title asc) {
    _id,title,tag,description,content,price,priceType,image,
    _createdAt,_updatedAt,_type,_rev
  }
`);

export const allHomepageServicesQuery = defineQuery(`
  *[_type == "homepageService"] | order(title asc) {
    _id,title,description,image,
    _createdAt,_updatedAt,_type,_rev
  }
`);
