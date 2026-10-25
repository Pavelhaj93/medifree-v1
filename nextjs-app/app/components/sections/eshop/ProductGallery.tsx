"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
import { parseVideoUrl } from "@/app/lib/video";

type GalleryImage = { asset?: unknown; alt?: string | null } | null;

export type ProductTrailer = {
  url?: string | null;
  fileUrl?: string | null;
  poster?: GalleryImage;
} | null;

type Item = { kind: "image"; image: GalleryImage } | { kind: "trailer" };

export default function ProductGallery({
  images,
  title,
  trailer,
}: {
  images: GalleryImage[];
  title: string;
  trailer?: ProductTrailer;
}) {
  const embed = parseVideoUrl(trailer?.url);
  const hasTrailer = !!embed || !!trailer?.fileUrl;
  // The trailer goes right after the main image, so it is visible without scrolling the thumbnails.
  const items: Item[] = images.map((image) => ({ kind: "image" as const, image }));
  if (hasTrailer) items.splice(Math.min(1, items.length), 0, { kind: "trailer" });
  const trailerIndex = items.findIndex((i) => i.kind === "trailer");

  const [active, setActive] = useState(0);
  const current = items[active];

  const posterUrl =
    urlForImage(trailer?.poster)?.width(1000).height(1000).fit("crop").url() ??
    embed?.thumbnailUrl ??
    urlForImage(images[0])?.width(1000).height(1000).fit("crop").url();
  const posterThumb =
    urlForImage(trailer?.poster)?.width(200).height(200).fit("crop").url() ??
    embed?.thumbnailUrl ??
    urlForImage(images[0])?.width(200).height(200).fit("crop").url();

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full max-w-full overflow-hidden rounded-xl bg-gray-100">
        {current?.kind === "trailer" ? (
          <div className="flex h-full w-full items-center bg-black">
            {embed ? (
              <iframe
                src={embed.embedUrl}
                title={`Ukázka: ${title}`}
                className="aspect-video w-full"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              // biome-ignore lint/a11y/useMediaCaption: product trailers come without captions
              <video
                src={trailer?.fileUrl ?? undefined}
                poster={posterUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            )}
          </div>
        ) : (
          (() => {
            const url = urlForImage(current?.image)?.width(1000).height(1000).fit("crop").url();
            return url ? (
              <Image
                src={url}
                alt={current?.image?.alt || title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : null;
          })()
        )}

        {hasTrailer && current?.kind !== "trailer" && (
          <button
            type="button"
            onClick={() => setActive(trailerIndex)}
            className="absolute bottom-4 left-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white/95 px-4 text-sm font-medium text-primary shadow-md hover:bg-white focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Přehrát ukázku
          </button>
        )}
      </div>

      {items.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {items.map((item, i) => {
            const thumb =
              item.kind === "trailer"
                ? posterThumb
                : urlForImage(item.image)?.width(200).height(200).fit("crop").url();
            if (!thumb) return null;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 cursor-pointer ${
                  i === active ? "border-primary" : "border-transparent hover:border-gray-300"
                }`}
                aria-label={item.kind === "trailer" ? "Přehrát ukázku" : `Zobrazit obrázek ${i + 1}`}
                aria-current={i === active}
              >
                <Image src={thumb} alt="" fill sizes="100px" className="object-cover" />
                {item.kind === "trailer" && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/35 text-white">
                    <Play className="h-6 w-6 fill-current" aria-hidden="true" />
                    <span className="text-xs font-medium">Ukázka</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
