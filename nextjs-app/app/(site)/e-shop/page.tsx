import HeroSection from "@/app/components/others/HeroSection";
import EshopHeroSection from "@/app/components/sections/eshop/EshopHeroSection";
import FeaturedProductSection from "@/app/components/sections/eshop/FeaturedProductSection";
import ProductGridSection from "@/app/components/sections/eshop/ProductGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { allProductsQuery, featuredProductQuery } from "@/sanity/queries";

export const metadata = {
  title: "E-shop - Medifree",
  description:
    "Objevte náš e-shop s širokou nabídkou zdravotních produktů, včetně e-booků a video kurzů. Nakupujte pohodlně online a získejte přístup k odborným materiálům, které vám pomohou na vaší cestě ke zdraví.",
};

export default async function EshopPage() {
  const { data: featuredProduct } = await sanityFetch({
    query: featuredProductQuery,
  });

  const { data: products } = await sanityFetch({
    query: allProductsQuery,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection
        badge="E-shop"
        title="Naše produkty"
        description=" Objevte naši nabídku doporučení jak si zlepšit zdraví, vitalitu,
            energii a duševní pohodu. Vše z pohodlí domova v online formě."
        buttons={[
          { label: "Zobrazit všechny produkty", href: "/e-shop#products" },
          // { label: "Zobrazit e-knihy", href: "/e-shop#ebooks", variant: "outline"
        ]}
      />

      <FeaturedProductSection featuredProduct={featuredProduct} />
      <ProductGridSection products={products} />
      {/* <TestimonialsSection /> */}
      {/* <EshopFAQSection /> */}
      {/* TODO: allow newsletter  */}
      {/* <NewsletterSection /> */}
    </div>
  );
}
