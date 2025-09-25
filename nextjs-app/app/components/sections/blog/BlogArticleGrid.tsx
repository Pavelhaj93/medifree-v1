import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/queries";
import BlogArticleGridClient from "./BlogArticleGridClient";

export default async function BlogArticleGrid() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  return <BlogArticleGridClient posts={posts} />;
}
