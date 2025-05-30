import { Button } from "@/components/ui/Button";
import BlogArticleGridItem from "./BlogArticleGridItem";
import { mockArticles } from "@/app/lib/data/articles";
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/lib/queries";

export default async function BlogArticleGrid() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-10 py-16 md:py-32">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-medium">Nejnovější články</h2>
          <div className="flex gap-2">
            <Button variant="primary">Vše</Button>
            <Button variant="primary" className="rounded-full">
              Duševní zdraví
            </Button>
            <Button variant="primary" className="rounded-full">
              Vztahy
            </Button>
            <Button variant="primary" className="rounded-full">
              Životní styl
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mockArticles.map((article) => (
            <BlogArticleGridItem
              title={article.title}
              date={article.date}
              readTime={article.readTime}
              category={article.category}
              description={article.description}
              key={article.id}
              imageSrc="/images/blog/depression.png"
              imageAlt="Deprese"
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="primary">Načíst více článků</Button>
        </div>
      </div>
    </section>
  );
}
