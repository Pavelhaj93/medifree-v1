import { Badge } from "@/app/components/ui/Badge";
import { AllProductsQueryResult } from "@/sanity.types";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import AddToCartButton from "../../others/AddToCartButton";
import { Button } from "../../ui/Button";
import { formatPrice } from "@/app/lib/shop/kinds";
import { ArrowRight } from "lucide-react";
import { packGrams } from "@/app/lib/shop/variants";

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

type ListProduct = AllProductsQueryResult[number];

const ProductCard = ({
  product,
  members = [],
  variantCount = 1,
  minPrice,
}: {
  product: ListProduct;
  /** All flavor × pack products when the card stands for a whole flavor group. */
  members?: ListProduct[];
  /** Number of flavors in the group. */
  variantCount?: number;
  minPrice?: number | null;
}) => {
  const isGroup = members.length > 1;
  const title = isGroup ? (product?.variantGroup ?? product?.title) : product?.title;
  const flavorDots = Array.from(
    new Map(members.map((m) => [m.variantLabel ?? m._id, m.variantColor])).entries(),
  ).filter(([, color]) => color);
  const packs = Array.from(new Set(members.map((m) => m.packLabel).filter(Boolean))).sort(
    (a, b) => packGrams(a) - packGrams(b),
  );
  const categoryBadge = product?.label
    ? { label: product.label, variant: "primary" as const }
    : CATEGORY_BADGE[product?.category ?? ""];
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
        {isGroup && (
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            {flavorDots.length > 0 && (
              <span className="flex gap-1" aria-hidden>
                {flavorDots.map(([name, color]) => (
                  <span
                    key={name}
                    title={name}
                    className="h-3 w-3 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]"
                    style={{ background: color ?? undefined }}
                  />
                ))}
              </span>
            )}
            <span>{[pluralFlavors(variantCount), packs.join(" / ")].filter(Boolean).join(" · ")}</span>
          </div>
        )}
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
            {isGroup ? (
              <span className="flex items-baseline gap-1.5">
                <span className="text-sm text-gray-600">od</span>
                <span className="text-xl font-bold">{formatPrice(minPrice ?? product?.price ?? 0)}</span>
              </span>
            ) : (
              <span className="text-xl font-bold">{formatPrice(product?.price ?? 0)}</span>
            )}
          </div>
          {isGroup && href ? (
            <Link href={href}>
              <Button size="sm" className="rounded-full min-h-11 px-4">
                Vybrat příchuť
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
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
