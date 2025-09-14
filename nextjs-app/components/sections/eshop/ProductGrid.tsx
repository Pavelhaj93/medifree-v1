import { Button } from "@/components/ui/Button";
import ProductCard from "./ProductCard";
import { sanityFetch } from "@/sanity/lib/live";
import { allProductsQuery, productQuery } from "@/sanity/lib/queries";
import { AllProductsQueryResult } from "@/sanity.types";

export default async function ProductGridSection() {
  const { data: productsRaw } = await sanityFetch({
    query: allProductsQuery,
  });

  // map products to ensure price is number or undefined
  const mappedProducts = productsRaw.map((product: any) => ({
    ...product,
    price: product.price === null ? undefined : product.price,
  }));

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mb-8">Oblíbené položky</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {mappedProducts.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline">Zobrazit všechny produkty</Button>
        </div>
      </div>
    </section>
  );
}
