import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/lib/api";
import { token as readToken } from "./token";

// Uncached reads for checkout / webhook (prices and files must be current, never stega-encoded).
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: readToken,
  stega: false,
});

// Creates orders and vouchers. Needs an Editor token in SANITY_API_WRITE_TOKEN.
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN");
  }
  return serverClient.withConfig({ token });
}
