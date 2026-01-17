import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Product } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import AddToCartButton from "../../others/AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative h-50">
        <Image
          src={
            urlForImage(product?.image)
              ?.width(400)
              .height(300)
              .fit("crop")
              .url() as string
          }
          alt={product?.image?.alt ?? product?.title ?? ""}
          fill
          className="object-cover w-full"
        />
        {product?.featured && (
          <Badge size="sm" variant="primary" className="absolute top-2 left-2">
            Doporučené
          </Badge>
        )}
      </div>
      <div className="p-6 flex flex-col grow">
        <h3 className="font-medium text-lg mb-2">{product?.title}</h3>
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
        <p className="text-gray-600 text-sm mb-4 grow">
          {product?.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-xl font-bold">{product?.price} Kč</div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
