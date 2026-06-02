import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/app/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { iconMap } from "@/app/components/sanity/iconMap";
import { urlForImage } from "@/sanity/lib/utils";

type LinkItem = {
  _key?: string;
  linkType?: "page" | "url";
  page?: { slug?: { current: string } };
  url?: string;
  anchor?: string;
  label: string;
  icon?: string;
};

export type ContentDisplayBlockCompactProps = {
  badge?: string;
  image?: any;
  title?: string;
  description?: string;
  links?: LinkItem[];
  reverse?: boolean;
  color?: "primary" | "tertiary";
};

export default function ContentDisplayBlockCompact({
  block,
}: {
  block: ContentDisplayBlockCompactProps;
}) {
  const {
    badge,
    image,
    title,
    description,
    links = [],
    reverse = false,
    color = "primary",
  } = block;

  return (
    <section className="bg-linear-to-br from-blue-50 via-white to-green-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Content side */}
          <div
            className={`flex-1 max-w-xl items-center flex-col flex md:block ${
              reverse ? "md:order-2" : ""
            }`}
          >
            {badge && (
              <Badge variant={color} className="mb-4">
                {badge}
              </Badge>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-medium mb-4">{title}</h2>
            )}
            {description && <p className="text-gray-600 mb-8">{description}</p>}
            {links.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {links.map((item, i) => {
                  const href =
                    item.linkType === "url"
                      ? item.url
                      : item.page?.slug?.current
                        ? `/${item.page.slug.current}${item.anchor ? `#${item.anchor}` : ""}`
                        : undefined;
                  if (!href) return null;
                  const Icon = item.icon ? iconMap[item.icon] : undefined;
                  return (
                    <Link
                      key={item._key ?? i}
                      href={href}
                      target={item.linkType === "url" ? "_blank" : undefined}
                      rel={
                        item.linkType === "url"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`${
                        color === "tertiary"
                          ? "bg-tertiary hover:bg-tertiary/90"
                          : "bg-primary hover:bg-primary/90"
                      } text-white rounded-full px-5 py-2.5 flex items-center transition`}
                    >
                      {Icon && <Icon className="w-5 h-5 mr-2" />}
                      {item.label}
                      {!Icon && <ArrowRight size={16} className="ml-2" />}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Image side */}
          {image && (
            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <Image
                  src={
                    urlForImage(image)
                      ?.width(800)
                      .height(800)
                      .fit("crop")
                      .auto("format")
                      .quality(90)
                      .url() as string
                  }
                  alt={image.alt || title || ""}
                  fill
                  className="object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
