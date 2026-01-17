import React from "react";

import type {
  AllProductsQueryResult,
  FeaturedProductQueryResult,
  ProductShowcase,
} from "@/sanity.types";
import FeaturedProductSection from "../sections/eshop/FeaturedProductSection";
import ProductGridSection from "../sections/eshop/ProductGrid";

type ProductShowcaseProps = {
  featuredProduct?: FeaturedProductQueryResult;
  products?: AllProductsQueryResult;
  bestSellerBadgeText?: ProductShowcase["bestSellerBadgeText"];
  recommendedBadgeText?: ProductShowcase["recommendedBadgeText"];
};

export default function ProductShowcase({
  block,
}: {
  block: ProductShowcaseProps;
}) {
  const {
    featuredProduct,
    products,
    bestSellerBadgeText,
    recommendedBadgeText,
  } = block ?? {};

  return (
    <>
      <FeaturedProductSection
        featuredProduct={featuredProduct}
        bestSellerBadgeText={bestSellerBadgeText}
        recommendedBadgeText={recommendedBadgeText}
      />
      <ProductGridSection products={products} />
    </>
  );
}
