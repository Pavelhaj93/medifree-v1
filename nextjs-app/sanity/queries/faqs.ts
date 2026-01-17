import { defineQuery } from "next-sanity";

export const faqFields = /* groq */ `
  _id,
  question,
  answer,
  category,
  order,
  _createdAt,
  _updatedAt
`;

export const allFaqsQuery = defineQuery(`
  *[_type == "faq"] | order(order asc, question asc) {
   ${faqFields}
  }
`);
