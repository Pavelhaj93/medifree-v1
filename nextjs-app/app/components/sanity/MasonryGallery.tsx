import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/Badge";

type MasonryGalleryProps = {
  badgeText: string;
  heading: string;
  description: string;
  images: Array<{
    _key: string;
    alt?: string;
    asset?: any;
  }>;
};

export default function MasonryGallery({
  block,
}: {
  block: MasonryGalleryProps;
}) {
  const { badgeText, heading, description, images } = block;

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto text-center px-4 md:px-10">
        <Badge variant="primary" className="mb-4">
          {badgeText}
        </Badge>
        <h3 className="text-3xl font-medium mb-6">{heading}</h3>
        <p className="text-gray-600 mb-8 text-center">{description}</p>

        {/* Masonry columns – adjust the breakpoints as needed */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images?.map((img, idx: number) => {
            // Randomize height ratios a bit to create a "masonry" feel
            const height =
              idx % 6 === 0 || idx % 6 === 5
                ? 700
                : idx % 6 === 1 || idx % 6 === 3
                  ? 600
                  : 900; // medium (idx % 6 === 2 or 4)
            return (
              <div
                key={img._key}
                className="break-inside-avoid relative w-full"
              >
                <Image
                  src={
                    urlForImage(img)
                      ?.width(800) // large enough base for big screens
                      .height(height)
                      .fit("crop")
                      .url() as string
                  }
                  alt={img.alt || "Service Gallery Image"}
                  className={`w-full rounded-lg shadow-md object-cover  ${
                    // pattern of 2: 0 → long, 1 → short, 2 → medium 3 -> long, ...

                    idx % 6 === 0 || idx % 6 === 5
                      ? "h-175" // long
                      : idx % 6 === 1 || idx % 6 === 3
                        ? "h-75" // short
                        : "h-112.5" // medium (idx % 6 === 2 or 4)
                  }
                } `}
                  // Give Next.js hints for responsive loading
                  width={390}
                  height={height}
                  sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       389px"
                  quality={100}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
