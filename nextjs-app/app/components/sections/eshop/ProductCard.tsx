import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Product } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-xl shadow-xs overflow-hidden">
      <div className="relative h-[200px]">
        <Image
          src={
            urlForImage(product.mainImage)
              ?.width(400)
              .height(300)
              .fit("crop")
              .url() as string
          }
          alt={product.mainImage?.alt || product.title}
          fill
          className="object-cover w-full"
        />
        {product.originalPrice && (
          <Badge size="sm" variant="success" className="absolute top-2 right-2">
            Sleva
          </Badge>
        )}
        {product.featured && (
          <Badge size="sm" variant="primary" className="absolute top-2 left-2">
            Doporučené
          </Badge>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-medium text-lg mb-2">{product.title}</h3>
        {/* TODO: no reviews yet, maybe later */}
        {/* <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <Star
              // biome-ignore lint/suspicious/noArrayIndexKey: Will be replaced for real data
              key={index}
              className={`w-4 h-4 ${
                index < rating
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "fill-gray-200 stroke-gray-200"
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-gray-600">({reviews})</span>
        </div> */}
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          {product.originalPrice ? (
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold">{product.price} Kč</div>
              <div className="text-sm text-gray-500 line-through">
                {product.originalPrice} Kč
              </div>
            </div>
          ) : (
            <div className="text-xl font-bold">{product.price} Kč</div>
          )}
          <Button size="sm" variant="primary" className="rounded-full">
            <ShoppingCart className="mr-2 h-2 w-2" />
            Přidat do košíku
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
