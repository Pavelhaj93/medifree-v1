import { baseProductFields } from "./fragments";
import { defineQuery } from "next-sanity";

export const productQuery = defineQuery(
  `*[_type == "product" && slug.current == $slug][0] { ${baseProductFields} }`
);
export const allProductsQuery = defineQuery(
  `*[_type == "product"] | order(name asc) { ${baseProductFields} }`
);
export const featuredProductQuery = defineQuery(
  `*[_type == "product" && featured == true][0]{ ${baseProductFields} }`
);
