import BlogPostGridClient from "./BlogPostGridClient";
import { AllPostsQueryResult } from "@/sanity.types";

export default async function BlogPostsGrid({
  posts,
  gridSectionHeading,
}: {
  posts?: AllPostsQueryResult;
  gridSectionHeading?: string;
}) {
  if (!posts || posts.length === 0) {
    return (
      <section className="py-8 md:py-16 min-h-125">
        <div className="container mx-auto px-4 md:px-10">
          <p className="text-center text-gray-500">
            Žádné články k zobrazení. Chystáme pro vás nové příspěvky.
          </p>
        </div>
      </section>
    );
  }

  return (
    <BlogPostGridClient posts={posts} gridSectionHeading={gridSectionHeading} />
  );
}
