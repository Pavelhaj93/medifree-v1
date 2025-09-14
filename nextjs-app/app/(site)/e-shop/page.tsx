import EshopHeroSection from "@/components/sections/eshop/EshopHeroSection";
import FeaturedProductSection from "@/components/sections/eshop/FeaturedProductSection";
import NewsletterSection from "@/components/sections/eshop/NewsletterSection";
import ProductCategories from "@/components/sections/eshop/ProductCategories";
import ProductGridSection from "@/components/sections/eshop/ProductGrid";

export default function EshopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <EshopHeroSection />
      <FeaturedProductSection />
      <ProductCategories />
      <ProductGridSection />
      {/* <TestimonialsSection /> */}
      {/* <EshopFAQSection /> */}
      <NewsletterSection />
    </div>
  );
}
