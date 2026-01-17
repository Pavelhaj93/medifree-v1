import React from "react";
import type {
  AllPostsQueryResult,
  FirstPostQueryResult,
  PostShowcase,
} from "@/sanity.types";
import BlogFirstPost from "../sections/blog/BlogFirstPost";
import BlogPostsGrid from "../sections/blog/BlogPostsGrid";

type PostShowcaseProps = {
  firstPost?: FirstPostQueryResult;
  posts?: AllPostsQueryResult;
  recommendedBadgeText?: PostShowcase["recommendedBadgeText"];
  gridSectionHeading?: PostShowcase["gridSectionHeading"];
};

export default function PostShowcase({ block }: { block: PostShowcaseProps }) {
  const { firstPost, posts, recommendedBadgeText, gridSectionHeading } =
    block ?? {};

  return (
    <>
      <BlogFirstPost
        firstPost={firstPost}
        recommendedBadgeText={recommendedBadgeText}
      />
      <BlogPostsGrid posts={posts} gridSectionHeading={gridSectionHeading} />
    </>
  );
}
