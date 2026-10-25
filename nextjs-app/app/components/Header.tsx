import type { HeaderNavQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";
import { headerNavQuery } from "@/sanity/queries/navigation";
import {
  PHYSICAL_CATEGORY,
  PRODUCT_CATEGORIES,
  VOUCHER_CATEGORY,
  formatPrice,
  productKind,
} from "../lib/shop/kinds";
import HeaderNav, { type HeaderNavData } from "./HeaderNav";

const CATEGORY_HINT = {
  digital: "Ke stažení ihned po zaplacení",
  physical: "Zásilkovnou nebo osobní odběr zdarma",
  voucher: "PDF poukaz e-mailem",
};

function servicePrice(price: number | null, priceType: string | null) {
  if (price == null) return priceType ?? "";
  const unit = priceType?.trim() ?? "";
  return unit.startsWith("/") ? `${formatPrice(price)}${unit}` : `${formatPrice(price)} ${unit}`.trim();
}

export default async function Header() {
  const { data }: { data: HeaderNavQueryResult | null } = await sanityFetch({
    query: headerNavQuery,
    stega: false,
  });

  const categories = PRODUCT_CATEGORIES.filter((c) => data?.categories?.includes(c as never));
  const featured = data?.featuredProduct;
  const post = data?.latestPost;

  const nav: HeaderNavData = {
    services: (data?.services ?? []).map((s) => ({
      key: s._key,
      title: s.title,
      description: s.description,
      price: servicePrice(s.price, s.priceType),
      hasPrice: s.price != null,
      href: `/nase-sluzby#${s._key}`,
      imageUrl: urlForImage(s.image)?.width(560).height(256).fit("crop").url(),
    })),
    categories: categories.map((c) => ({
      label: c,
      hint: CATEGORY_HINT[productKind(c)],
      href: `/e-shop?kategorie=${encodeURIComponent(c)}#products`,
    })),
    shopNote: categories.some((c) => c === PHYSICAL_CATEGORY || c === VOUCHER_CATEGORY)
      ? "Digitální produkty ihned e-mailem · fyzické zboží Zásilkovnou nebo osobně"
      : "Digitální produkty ihned e-mailem",
    featured: featured
      ? {
          title: featured.title,
          href: `/e-shop/${featured.slug}`,
          price: formatPrice(featured.price),
          originalPrice:
            featured.originalPrice && featured.originalPrice > featured.price
              ? formatPrice(featured.originalPrice)
              : undefined,
          imageUrl: urlForImage(featured.image)?.width(176).height(256).fit("crop").url(),
        }
      : null,
    latestPost: post
      ? {
          title: post.title,
          href: `/clanky/${post.slug}`,
          readTime: post.readTime ? `${post.readTime} min čtení` : undefined,
          imageUrl: urlForImage(post.coverImage)?.width(240).height(240).fit("crop").url(),
        }
      : null,
    email: data?.email ?? "info@medifree.cz",
  };

  return <HeaderNav nav={nav} />;
}
