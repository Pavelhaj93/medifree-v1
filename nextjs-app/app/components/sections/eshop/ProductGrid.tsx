"use client";

import { Button } from "@/app/components/ui/Button";
import ProductCard from "./ProductCard";
import { AllProductsQueryResult, Product } from "@/sanity.types";
import { useState } from "react";

const PAGE_SIZE = 6;

export default function ProductGridSection({
  products,
}: {
  products?: AllProductsQueryResult;
}) {
  const categories = Array.from(new Set(products?.map((p) => p.category)));

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = activeFilter
    ? products?.filter((p) => p.category === activeFilter)
    : products;

  const visibleProducts = filtered?.slice(0, visibleCount);

  const handleFilter = (cat: string | null) => {
    setActiveFilter(cat);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="py-8 md:py-16" id="products">
      <div className="container mx-auto px-4 md:px-10 ">
        <div className="flex justify-between flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-12 opacity-0 animate-fade-in">
          <h2 className="text-2xl font-medium">Oblíbené položky</h2>
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

        <div className="grid md:grid-cols-3 gap-6 opacity-0 animate-fade-in animation-delay-400">
          {visibleProducts?.map((product) => {
            return (
              <ProductCard key={product._id} product={product as unknown as Product} />
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
