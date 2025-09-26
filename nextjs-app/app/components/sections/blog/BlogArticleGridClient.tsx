"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import BlogArticleGridItem from "./BlogArticleGridItem";
import { AllPostsQueryResult } from "@/sanity.types";

const PAGE_SIZE = 6;

export default function BlogArticleGridClient({
  posts,
}: {
  posts: AllPostsQueryResult;
}) {
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = activeFilter
    ? posts.filter((p) => p.category === activeFilter)
    : posts;

  const visiblePosts = filtered.slice(0, visibleCount);

  const handleFilter = (cat: string | null) => {
    setActiveFilter(cat);
    setVisibleCount(PAGE_SIZE); // reset count when filter changes
  };

  return (
    <section className="py-8 md:py-16" id="vsechny-clanky">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex justify-between flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-12">
          <h2 className="text-2xl font-medium">Nejnovější články</h2>
          <div className="flex gap-2 overflow-x-auto py-2 pr-1">
            <Button
              variant={activeFilter === null ? "primary" : "outline"}
              onClick={() => handleFilter(null)}
            >
              Vše
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "primary" : "outline"}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {visiblePosts.map((article) => (
            <BlogArticleGridItem
              key={article._id}
              title={article.title}
              date={article.date}
              readTime={article.readTime ?? 3}
              category={article.category}
              description={article.description}
              image={article.coverImage}
              imageAlt={article.coverImage.alt || "Cover image"}
              slug={article.slug}
            />
          ))}
        </div>

        {/* Show more */}
        {visibleCount < filtered.length && (
          <div className="mt-12 text-center">
            <Button
              variant="primary"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              Načíst více článků
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
