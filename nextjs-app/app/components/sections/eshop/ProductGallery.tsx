"use client";

import Image from "next/image";
import { useState } from "react";
import { urlForImage } from "@/sanity/lib/utils";

type GalleryImage = { asset?: unknown; alt?: string | null } | null;

export default function ProductGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];
  const currentUrl = urlForImage(current)?.width(1000).height(1000).fit("crop").url();

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full max-w-full overflow-hidden rounded-xl bg-gray-100">
        {currentUrl && (
          <Image
            src={currentUrl}
            alt={current?.alt || title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => {
            const thumb = urlForImage(img)?.width(200).height(200).fit("crop").url();
            if (!thumb) return null;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 cursor-pointer ${
                  i === active ? "border-primary" : "border-transparent hover:border-gray-300"
                }`}
                aria-label={`Zobrazit obrázek ${i + 1}`}
                aria-current={i === active}
              >
                <Image src={thumb} alt="" fill sizes="100px" className="object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
