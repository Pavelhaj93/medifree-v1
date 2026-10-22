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
import { formatPrice, productKind } from "@/app/lib/shop/kinds";
import { Info } from "lucide-react";

const CATEGORY_LABEL: Record<string, string> = {
  "Fyzické produkty": "Produkt",
  "Dárkové poukazy": "Dárkový poukaz",
};

const STOCK = {
  in: { text: "Skladem", dot: "bg-green-500" },
  low: { text: "Poslední kusy", dot: "bg-amber-500" },
  out: { text: "Vyprodáno", dot: "bg-red-500" },
} as const;

const SUPPLEMENT_NOTICE =
  "Nepřekračujte doporučenou denní dávku. Doplněk stravy není náhradou pestré a vyvážené stravy. Uchovávejte mimo dosah dětí.";

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
  const stock = STOCK[(product.stockStatus as keyof typeof STOCK) ?? "in"] ?? STOCK.in;
  const unavailable = kind === "physical" && product.isAvailable === false;
  const images = [product.image, ...(product.gallery ?? [])].filter((img) => img?.asset);
  const includes = (product.voucherIncludes ?? "")
    .split(/\r?\n/)
    .map((line: string) => line.replace(/^[-•+*]\s*/, "").trim())
    .filter(Boolean);
  const food = (product.foodInfo as FoodInfo)?.enabled ? (product.foodInfo as FoodInfo) : null;

  const per100g = pricePer100g(product.price, product.netWeight);
  const perServing =
    product.price && product.servings ? Math.round(product.price / product.servings) : null;
  const keyFacts = [
    product.netWeight
      ? { label: "Čisté množství", value: `${product.netWeight.toLocaleString("cs-CZ")} g` }
      : null,
    product.servings ? { label: "Porce", value: `${product.servings} porcí` } : null,
    perServing ? { label: "Cena za porci", value: formatPrice(perServing) } : null,
    per100g ? { label: "Cena za 100 g", value: formatPrice(per100g) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const variantName = [product.variantLabel, product.packLabel].filter(Boolean).join(", ") || null;
  const heading = product.variantGroup ?? product.title;
  const badge = product.label || CATEGORY_LABEL[product.category ?? ""] || product.category;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.medifree.cz";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: variantName ? `${heading} – ${variantName}` : product.title,
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
          className="inline-flex min-h-11 items-center text-sm text-gray-600 hover:text-primary mb-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Zpět do e-shopu
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-10">
          <ProductGallery images={images} title={product.title ?? ""} />

          <div className="flex flex-col min-w-0">
            {badge && (
              <Badge size="sm" variant="primary" className="self-start mb-3">
                {badge}
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-medium mb-4 text-balance">{heading}</h1>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
              <span className="text-3xl font-bold whitespace-nowrap">{formatPrice(product.price ?? 0)}</span>
              {product.packLabel && <span className="text-gray-600">/ {product.packLabel}</span>}
              {product.originalPrice != null && (
                <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {keyFacts.length > 0 && (
              <dl className="mb-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-gray-200 py-3.5">
                {keyFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-gray-600">{fact.label}</dt>
                    <dd className="font-medium whitespace-nowrap">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {kind === "physical" && (
              <p className="text-sm mb-5 flex flex-wrap items-center gap-2">
                <span aria-hidden className={`inline-block h-2.5 w-2.5 rounded-full ${stock.dot}`} />
                <span>{stock.text}</span>
                {!unavailable && shop?.dispatchTime && <span className="text-gray-600">· {shop.dispatchTime}</span>}
              </p>
            )}

            <p className="text-gray-700 mb-7 leading-relaxed whitespace-pre-line">{product.description}</p>

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
                    Platnost {product.voucherValidityMonths} měsíců od nákupu. Poukaz s unikátním kódem vám přijde
                    e-mailem jako PDF.
                  </p>
                )}
              </div>
            )}

            {kind === "digital" && (
              <p className="text-sm text-gray-600 mb-6">Po zaplacení vám odkaz ke stažení přijde e-mailem.</p>
            )}

            <VariantSwitcher variants={product.variants ?? []} current={product} />

            <ProductPurchase product={product} />

            {food?.isSupplement && (
              <p className="mt-6 flex gap-2.5 rounded-xl bg-secondary/30 px-4 py-3 text-sm leading-relaxed text-gray-700">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>
                  <strong className="font-semibold text-gray-900">Doplněk stravy.</strong> {SUPPLEMENT_NOTICE}
                </span>
              </p>
            )}
          </div>
        </div>

        <ProductHighlights
          forWhom={product.forWhom}
          notSuitableFor={product.notSuitableFor}
          benefits={product.benefits}
        />

        <ProductInfoTabs
          body={product.body as PortableTextBlock[] | null}
          foodInfo={product.foodInfo as FoodInfo}
          variantLabel={product.variantLabel}
        />
      </div>
    </div>
  );
}
