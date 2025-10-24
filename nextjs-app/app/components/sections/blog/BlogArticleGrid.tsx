import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/queries";
import BlogArticleGridClient from "./BlogArticleGridClient";

export default async function BlogArticleGrid() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  if (!posts || posts.length === 0) {
    return (
      <section className="py-8 md:py-16 min-h-[500px]">
        <div className="container mx-auto px-4 md:px-10">
          <p className="text-center text-gray-500">
            Žádné články k zobrazení. Chystáme pro vás nové příspěvky.
          </p>
        </div>
      </section>
    );
  }

  return <BlogArticleGridClient posts={posts} />;
}
