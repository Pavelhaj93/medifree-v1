import { Button } from "@/app/components/ui/Button";
import ProductCard from "./ProductCard";
import { AllProductsQueryResult, Product } from "@/sanity.types";

export default async function ProductGridSection({
  products,
}: {
  products: AllProductsQueryResult;
}) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mb-8">Oblíbené položky</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => {
            return (
              // @ts-ignore
              <ProductCard key={product._id} product={product as Product} />
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline">Zobrazit všechny produkty</Button>
        </div>
      </div>
    </section>
  );
}
