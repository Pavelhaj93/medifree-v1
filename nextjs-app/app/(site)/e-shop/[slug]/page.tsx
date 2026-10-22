import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { PortableTextBlock } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { productBySlugQuery, productSlugsQuery, shopSettingsQuery } from "@/sanity/queries";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
import { Badge } from "@/app/components/ui/Badge";
import ProductGallery from "@/app/components/sections/eshop/ProductGallery";
import ProductPurchase from "@/app/components/sections/eshop/ProductPurchase";
import VariantSwitcher from "@/app/components/sections/eshop/VariantSwitcher";
import ProductHighlights from "@/app/components/sections/eshop/ProductHighlights";
import ProductInfoTabs, { type FoodInfo } from "@/app/components/sections/eshop/ProductInfoTabs";
import { pricePer100g } from "@/app/lib/shop/variants";

const czechOrder = new Intl.Collator("cs");
import { formatPrice, productKind } from "@/app/lib/shop/kinds";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: productSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: product } = await sanityFetch({
    query: productBySlugQuery,
    params,
    stega: false,
  });
  if (!product) return {};

  const ogImage = resolveOpenGraphImage(product.image);
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      type: "website",
      title: product.title ?? undefined,
      description: product.description ?? undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  } satisfies Metadata;
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const [{ data: product }, { data: shop }] = await Promise.all([
    sanityFetch({ query: productBySlugQuery, params }),
    sanityFetch({ query: shopSettingsQuery }),
  ]);

  if (!product?._id) {
    notFound();
  }

  const kind = productKind(product.category);
  const unavailable = kind === "physical" && product.isAvailable === false;
  const images = [product.image, ...(product.gallery ?? [])].filter((img) => img?.asset);
  const includes = (product.voucherIncludes ?? "")
    .split(/\r?\n/)
    .map((line: string) => line.replace(/^[-•+*]\s*/, "").trim())
    .filter(Boolean);

  const per100g = pricePer100g(product.price, product.netWeight);
  const keyFacts = [
    product.netWeight ? `${product.netWeight.toLocaleString("cs-CZ")} g` : null,
    product.servings ? `${product.servings} porcí` : null,
    per100g ? `${formatPrice(per100g)} / 100 g` : null,
  ].filter(Boolean);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.medifree.cz";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.variantLabel ? `${product.title} – ${product.variantLabel}` : product.title,
    description: product.description,
    image: images.map((img) => urlForImage(img)?.width(1200).url()).filter(Boolean),
    brand: { "@type": "Brand", name: "Medifree" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "CZK",
      url: `${baseUrl}/e-shop/${product.slug}`,
      availability: unavailable ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  return (
    <div className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container mx-auto px-4 md:px-10 py-10 md:py-16">
        <Link
          href="/e-shop"
          className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Zpět do e-shopu
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-10">
          <ProductGallery images={images} title={product.title ?? ""} />

          <div className="flex flex-col">
            {product.category && (
              <Badge size="sm" variant="primary" className="self-start mb-3">
                {product.category}
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-medium mb-4 text-balance">{product.title}</h1>

            <div className={`flex items-baseline gap-3 ${keyFacts.length ? "mb-2" : "mb-6"}`}>
              <span className="text-3xl font-bold">{formatPrice(product.price ?? 0)}</span>
              {product.originalPrice != null && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {keyFacts.length > 0 && (
              <p className="text-sm text-gray-600 mb-6">{keyFacts.join(" · ")}</p>
            )}

            {kind === "physical" && (
              <p className="text-sm mb-6 flex items-center gap-2">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${unavailable ? "bg-red-500" : "bg-green-500"}`}
                />
                {unavailable ? "Momentálně nedostupné" : "Skladem"}
                {!unavailable && shop?.dispatchTime && (
                  <span className="text-gray-500">· {shop.dispatchTime}</span>
                )}
              </p>
            )}

            <p className="text-gray-700 mb-6 whitespace-pre-line">{product.description}</p>

            {kind === "voucher" && includes.length > 0 && (
              <div className="mb-6 rounded-xl bg-secondary/30 p-5">
                <h2 className="font-medium mb-3">Co poukaz obsahuje</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {includes.map((line: string, i: number) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                {product.voucherValidityMonths && (
                  <p className="text-sm text-gray-600 mt-3">
                    Platnost {product.voucherValidityMonths} měsíců od nákupu. Poukaz s unikátním
                    kódem vám přijde e-mailem jako PDF.
                  </p>
                )}
              </div>
            )}

            {kind === "digital" && (
              <p className="text-sm text-gray-600 mb-6">
                Po zaplacení vám odkaz ke stažení přijde e-mailem.
              </p>
            )}

            <VariantSwitcher
              variants={[...(product.variants ?? [])].sort((a, b) =>
                czechOrder.compare(a.variantLabel ?? "", b.variantLabel ?? ""),
              )}
              currentId={product._id}
            />

            <div className="mt-2">
              <ProductPurchase product={product} />
            </div>
          </div>
        </div>

        <ProductHighlights forWhom={product.forWhom} benefits={product.benefits} />

        <ProductInfoTabs
          body={product.body as PortableTextBlock[] | null}
          foodInfo={product.foodInfo as FoodInfo}
        />
      </div>
    </div>
  );
}
