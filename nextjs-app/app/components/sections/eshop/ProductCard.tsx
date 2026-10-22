import { Badge } from "@/app/components/ui/Badge";
import { AllProductsQueryResult } from "@/sanity.types";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import AddToCartButton from "../../others/AddToCartButton";
import { Button } from "../../ui/Button";
import { formatPrice } from "@/app/lib/shop/kinds";

const CATEGORY_BADGE: Record<string, { label: string; variant: "primary" | "tertiary" | "default" | "success" }> = {
  Ebooky: { label: "Ebook", variant: "tertiary" },
  Audionahrávky: { label: "Audio", variant: "tertiary" },
  "Video kurzy": { label: "Video", variant: "tertiary" },
  "Ebook + Audio": { label: "Ebook + Audio", variant: "tertiary" },
  Balíčky: { label: "Balíček", variant: "primary" },
  "Fyzické produkty": { label: "Produkt", variant: "primary" },
  "Dárkové poukazy": { label: "Dárkový poukaz", variant: "primary" },
};

const pluralFlavors = (n: number) => (n < 5 ? `${n} příchutě` : `${n} příchutí`);

const ProductCard = ({
  product,
  variantCount = 1,
  minPrice,
}: {
  product: AllProductsQueryResult[number];
  /** Number of flavors when the card stands for a whole flavor group. */
  variantCount?: number;
  minPrice?: number | null;
}) => {
  const isGroup = variantCount > 1;
  const title = isGroup ? (product?.variantGroup ?? product?.title) : product?.title;
  const categoryBadge = CATEGORY_BADGE[product?.category ?? ""];
  const isBundle = product?.category === "Balíčky";
  const bundleCount = product?.bundleItems?.length ?? 0;
  const originalPrice = product?.originalPrice;
  const href = product?.slug ? `/e-shop/${product.slug}` : null;
  const unavailable = product?.category === "Fyzické produkty" && product?.isAvailable === false;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <MaybeLink href={href} className="relative h-50 block" ariaLabel={title ?? undefined}>
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
        {isGroup && (
          <Badge size="sm" variant="primary" className="absolute bottom-2 right-2">
            {pluralFlavors(variantCount)}
          </Badge>
        )}
        {unavailable && !isGroup && (
          <Badge size="sm" variant="default" className="absolute bottom-2 left-2 bg-white/90">
            Momentálně nedostupné
          </Badge>
        )}
      </MaybeLink>
      <div className="p-6 flex flex-col grow">
        <h3 className="font-medium text-lg mb-2">
          {href ? (
            <Link href={href} className="hover:text-primary focus-visible:outline-primary">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
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
            <span className="text-xl font-bold">
              {isGroup ? `od ${formatPrice(minPrice ?? product?.price ?? 0)}` : formatPrice(product?.price ?? 0)}
            </span>
          </div>
          {isGroup && href ? (
            <Link href={href}>
              <Button size="sm" className="rounded-full min-h-11 px-4">
                Vybrat příchuť
              </Button>
            </Link>
          ) : (
            <AddToCartButton product={product} />
          )}
        </div>
      </div>
    </div>
  );
};

function MaybeLink({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string | null;
  className: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <Link href={href} className={className} aria-label={ariaLabel} tabIndex={-1}>
      {children}
    </Link>
  );
}

export default ProductCard;
