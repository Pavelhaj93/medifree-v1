import EshopHeroSection from "@/app/components/sections/eshop/EshopHeroSection";
import FeaturedProductSection from "@/app/components/sections/eshop/FeaturedProductSection";
import NewsletterSection from "@/app/components/sections/eshop/NewsletterSection";
import ProductCategories from "@/app/components/sections/eshop/ProductCategories";
import ProductGridSection from "@/app/components/sections/eshop/ProductGrid";

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
