import { defineQuery } from "next-sanity";

export const newsAndEventsQuery = defineQuery(`
    *[_type == "newAndEvent"][0]
`);
