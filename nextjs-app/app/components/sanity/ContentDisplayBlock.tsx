import Image from "next/image";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import { iconMap } from "@/app/components/sanity/iconMap";
import { urlForImage } from "@/sanity/lib/utils";

export type ContentDisplayBlockProps = {
  badge?: string;
  image?: any;
  name?: string;
  description?: string;
  link?: {
    linkType?: "page" | "url";
    page?: { slug?: { current: string } };
    url?: string;
    anchor?: string;
    label: string;
    icon?: string;
  };
  topics?: string[];
  socialLinks?: Array<{
    id: string;
    href: string;
    icon: React.ReactNode;
  }>;
  reverse?: boolean;
  color?: "primary" | "tertiary";
};

export default function ContentDisplayBlock({
  block,
}: {
  block: ContentDisplayBlockProps;
}) {
  const {
    badge,
    image,
    name,
    description,
    link,
    topics = [],
    socialLinks = [],
    reverse = false,
    color = "primary",
  } = block;

  // Determine link href based on linkType and anchor
  const linkHref = link
    ? link.linkType === "url"
      ? link.url
      : link.page?.slug?.current
        ? `/${link.page.slug.current}${link.anchor ? `#${link.anchor}` : ""}`
        : undefined
    : undefined;

  const isExternal = link?.linkType === "url";

  // Icon rendering (Lucide, mapped)
  const LinkIcon = link?.icon ? iconMap[link.icon] : undefined;

  return (
    <section className="bg-gray-50 text-left py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center container mx-auto px-4 md:px-10 ">
        <div className="mb-4 md:hidden flex justify-center">
          {badge && <Badge variant={color}>{badge}</Badge>}
        </div>
        <div
          className={`relative h-100 rounded-2xl overflow-hidden opacity-0 animate-fade-in-up animation-delay-200 ${
            reverse ? "md:order-2" : ""
          }`}
        >
          {/* Social icons */}
          {socialLinks.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {socialLinks.map((item) => {
                const IconComponent =
                  typeof item.icon === "string" ? iconMap[item.icon] : null;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`w-10 h-10 rounded-full bg-gray-50/80 flex items-center justify-center shadow-md z-1 hover:opacity-80 transition-opacity ${color === "tertiary" ? "text-tertiary" : "text-primary"}`}
                  >
                    {IconComponent && <IconComponent size={24} />}
                  </Link>
                );
              })}
            </div>
          )}
          {image && (
            <Image
              src={
                urlForImage(image)
                  ?.width(1200)
                  .height(800)
                  .fit("crop")
                  .auto("format")
                  .quality(90)
                  .url() as string
              }
              alt={image.alt || name || ""}
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 576px"
            />
          )}
          {/* bottom name overlay */}
          {name && (
            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center p-4 bg-white">
              <h3
                className={`text-2xl text-center ${
                  color === "tertiary" ? "text-tertiary" : "text-primary"
                } italic`}
              >
                {name}
              </h3>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between h-full opacity-0 animate-fade-in-up animation-delay-400">
          <div className="mb-4 hidden md:block">
            {badge && <Badge variant={color}>{badge}</Badge>}
          </div>
          {description && (
            <p className="text-gray-600 mb-4 leading-7">{description}</p>
          )}
          {link && linkHref && (
            <Button
              variant="link"
              className={`mb-4 self-start px-0 ${
                color === "tertiary" ? "text-tertiary" : "text-primary"
              }`}
              asChild
            >
              <Link
                href={linkHref}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                {link.label}
                {LinkIcon ? (
                  <LinkIcon size={16} className="ml-2" />
                ) : (
                  <ArrowRight size={16} className="ml-2" />
                )}
              </Link>
            </Button>
          )}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4">
              {topics.map((item) => (
                <Badge key={item} variant={color} className="uppercase">
                  <span
                    className={`w-2 h-2 ${
                      color === "tertiary" ? "bg-tertiary" : "bg-primary"
                    } rounded-full inline-block mr-2`}
                  />
                  {item}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
