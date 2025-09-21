import { defineQuery } from "next-sanity";

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
