import EshopHeroSection from "@/app/components/sections/eshop/EshopHeroSection";
import FeaturedProductSection from "@/app/components/sections/eshop/FeaturedProductSection";
import NewsletterSection from "@/app/components/sections/eshop/NewsletterSection";
import ProductCategories from "@/app/components/sections/eshop/ProductCategories";
import ProductGridSection from "@/app/components/sections/eshop/ProductGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { allProductsQuery, featuredProductQuery } from "@/sanity/queries";

export default async function EshopPage() {
  const { data: featuredProduct } = await sanityFetch({
    query: featuredProductQuery,
  });

  const { data: products } = await sanityFetch({
    query: allProductsQuery,
  });

  console.log("products", products);

  const ebooksLength = products.filter(
    (product) => product.category === "Ebooky"
  ).length;
  const coursesLength = products.filter(
    (product) => product.category === "Video kurzy"
  ).length;

  return (
    <div className="min-h-screen flex flex-col">
      <EshopHeroSection />
      <FeaturedProductSection featuredProduct={featuredProduct} />
      <ProductCategories
        eBooksLength={ebooksLength}
        coursesLength={coursesLength}
      />
      <ProductGridSection products={products} />
      {/* <TestimonialsSection /> */}
      {/* <EshopFAQSection /> */}
      <NewsletterSection />
    </div>
  );
}
