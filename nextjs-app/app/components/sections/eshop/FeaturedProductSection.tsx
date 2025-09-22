"use client";

import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { useCart } from "@/app/context/cartContext";
import { FeaturedProductQueryResult, Product } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";
import { featuredProductQuery } from "@/sanity/queries";
import { Download, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

export default function FeaturedProductSection({
  featuredProduct,
}: {
  featuredProduct: FeaturedProductQueryResult;
}) {
  console.log("FeaturedProductSection render", featuredProduct);
  const { addItem, itemExists } = useCart();
  if (!featuredProduct) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <Badge variant="primary" className="mb-4">
                  Doporučené
                </Badge>
                <h2 className="text-3xl font-medium mb-4">
                  {featuredProduct?.title}
                </h2>
                {/* <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <span className="ml-2 text-sm text-gray-600">
                    (42 hodnocení)
                  </span>
                </div> */}
                <p className="text-gray-600 mb-6">
                  {featuredProduct.description}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">
                    {featuredProduct.price -
                      ((featuredProduct.price ?? 0) *
                        (featuredProduct.discount ?? 0)) /
                        100}{" "}
                    Kč
                  </div>
                  {featuredProduct.discount && (
                    <div className="text-lg text-gray-500 line-through">
                      {featuredProduct?.price?.toLocaleString("CZ")} Kč
                    </div>
                  )}
                  {featuredProduct.discount && (
                    <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm">
                      {featuredProduct.price &&
                        featuredProduct.discount + "% sleva"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant={
                      itemExists(featuredProduct.title)
                        ? "secondary"
                        : "primary"
                    }
                    className="rounded-full"
                    onClick={() => addItem(featuredProduct as Product)}
                    disabled={itemExists(featuredProduct.title)}
                  >
                    <ShoppingCart className="mr-2 h-2 w-2" />
                    {itemExists(featuredProduct.title)
                      ? "V košíku"
                      : "Přidat do košíku"}
                  </Button>
                  {/* TODO: přidat stahnout ukazku */}
                  {/* <Button variant="outline" className="">
                    <Download className="mr-2 h-4 w-4" /> Stáhnout ukázku
                  </Button> */}
                </div>
              </div>
            </div>
            <div className="relative md:h-auto bg-gray-50 flex items-center justify-center p-8">
              {featuredProduct.image.asset && (
                <div className="relative w-[250px] h-[400px] shadow-xl transform rotate-5 transition-transform hover:rotate-0 hover:scale-125">
                  <Image
                    src={
                      urlForImage(featuredProduct.image)
                        ?.width(400)
                        .height(600)
                        .fit("crop")
                        .url() as string
                    }
                    alt="Ebook Cover"
                    fill
                    className="object-cover rounded-lg w-full"
                  />
                </div>
              )}
              <Badge
                size="sm"
                variant="primary"
                className="absolute top-4 right-4"
              >
                Bestseller
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
