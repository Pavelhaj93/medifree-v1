import { Badge } from "@/app/components/ui/Badge";
import { Product } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import AddToCartButton from "../../others/AddToCartButton";

const CATEGORY_BADGE: Record<string, { label: string; variant: "primary" | "tertiary" | "default" | "success" }> = {
  Ebooky: { label: "Ebook", variant: "tertiary" },
  Audionahrávky: { label: "Audio", variant: "tertiary" },
  "Video kurzy": { label: "Video", variant: "tertiary" },
  "Ebook + Audio": { label: "Ebook + Audio", variant: "tertiary" },
  Balíčky: { label: "Balíček", variant: "primary" },
};

const ProductCard = ({ product }: { product: Product }) => {
  const categoryBadge = CATEGORY_BADGE[product?.category ?? ""];
  const isBundle = product?.category === "Balíčky";
  const bundleCount = (product as any)?.bundleItems?.length ?? 0;
  const originalPrice = (product as any)?.originalPrice as number | undefined;

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
        {categoryBadge && (
          <Badge
            size="sm"
            variant={categoryBadge.variant}
            className="absolute top-2 right-2"
          >
            {categoryBadge.label}
          </Badge>
        )}
      </div>
      <div className="p-6 flex flex-col grow">
        <h3 className="font-medium text-lg mb-2">{product?.title}</h3>
        {isBundle && bundleCount > 0 && (
          <p className="text-sm text-gray-500 mb-2">
            Obsahuje {bundleCount} {bundleCount === 1 ? "produkt" : bundleCount < 5 ? "produkty" : "produktů"}
          </p>
        )}
        <p className="text-gray-600 text-sm mb-4 grow">
          {product?.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {isBundle && originalPrice != null && (
              <span className="text-sm text-gray-400 line-through">
                {originalPrice} Kč
              </span>
            )}
            <span className="text-xl font-bold">{product?.price} Kč</span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
