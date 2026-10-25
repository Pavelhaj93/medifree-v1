"use client";

import { Button } from "@/app/components/ui/Button";
import ProductCard from "./ProductCard";
import { AllProductsQueryResult } from "@/sanity.types";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { groupVariants } from "@/app/lib/shop/variants";

const PAGE_SIZE = 12;
// The header's e-shop menu links to /e-shop?kategorie=<category>.
const CATEGORY_PARAM = "kategorie";

type ProductGridProps = { products?: AllProductsQueryResult };

export default function ProductGridSection({ products }: ProductGridProps) {
  return (
    <Suspense fallback={<ProductGrid products={products} activeFilter={null} />}>
      <ProductGridFromUrl products={products} />
    </Suspense>
  );
}

function ProductGridFromUrl({ products }: ProductGridProps) {
  const fromUrl = useSearchParams().get(CATEGORY_PARAM);
  const activeFilter = products?.some((p) => p.category === fromUrl) ? fromUrl : null;

  // replaceState updates useSearchParams without a server round trip.
  const onFilter = (cat: string | null) => {
    const url = new URL(window.location.href);
    if (cat) url.searchParams.set(CATEGORY_PARAM, cat);
    else url.searchParams.delete(CATEGORY_PARAM);
    window.history.replaceState(null, "", url);
  };

  return <ProductGrid products={products} activeFilter={activeFilter} onFilter={onFilter} />;
}

function ProductGrid({
  products,
  activeFilter,
  onFilter,
}: ProductGridProps & { activeFilter: string | null; onFilter?: (cat: string | null) => void }) {
  const categories = Array.from(new Set(products?.map((p) => p.category)));

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = groupVariants(
    (activeFilter ? products?.filter((p) => p.category === activeFilter) : products) ?? [],
  );

  const visibleProducts = filtered?.slice(0, visibleCount);

  const handleFilter = (cat: string | null) => {
    onFilter?.(cat);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="py-8 md:py-16" id="products">
      <div className="container mx-auto px-4 md:px-10 ">
        <div className="flex justify-between flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-12 opacity-0 animate-fade-in">
          <h2 className="text-2xl font-medium">Oblíbené položky</h2>
          {/* px-1/-mx-1: the outline buttons draw their border outside the box, overflow-x-auto would clip it */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 py-2">
            <Button
              variant={activeFilter === null ? "primary" : "outline"}
              className="min-h-11 shrink-0"
              aria-pressed={activeFilter === null}
              onClick={() => handleFilter(null)}
            >
              Vše
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "primary" : "outline"}
                className="min-h-11 shrink-0"
                aria-pressed={activeFilter === cat}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 opacity-0 animate-fade-in animation-delay-400">
          {visibleProducts?.map((product) => {
            return (
              <ProductCard
                key={product.product._id}
                product={product.product}
                members={product.members}
                variantCount={product.variantCount}
                minPrice={product.minPrice}
              />
            );
          })}
        </div>

        {/* Show more */}
        {visibleCount < (filtered?.length ?? 0) && (
          <div className="mt-12 text-center">
            <Button
              variant="primary"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              Načíst všechny produkty
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
