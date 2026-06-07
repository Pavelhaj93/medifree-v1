"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Play } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { urlForImage } from "@/sanity/lib/utils";
import AudioPlayer from "./AudioPlayer";
import VideoPlayer from "./VideoPlayer";

type FreeResource = {
  _id: string;
  title: string;
  category: string;
  description?: string;
  thumbnail?: { asset?: unknown; alt?: string; _type?: string };
  file?: { asset?: { url?: string; originalFilename?: string; mimeType?: string } };
  embedUrl?: string;
};

const CATEGORY_CONFIG: Record<
  string,
  { label: string; variant: "primary" | "tertiary" | "default" | "success" }
> = {
  video: { label: "Video přednáška", variant: "primary" },
  audio: { label: "Audionahrávka", variant: "tertiary" },
  dokument: { label: "Dokument", variant: "default" },
};

export default function FreeResourceCard({ resource }: { resource: FreeResource }) {
  const [playerOpen, setPlayerOpen] = useState(false);

  const config = CATEGORY_CONFIG[resource.category] ?? {
    label: resource.category,
    variant: "default" as const,
  };

  const fileUrl = resource.file?.asset?.url;
  const isAudio = resource.category === "audio";
  const isVideo = resource.category === "video";
  const isDoc = resource.category === "dokument";
  const hasInlineMedia = isAudio || isVideo;
  const hasEmbed = isVideo && !!resource.embedUrl;
  const hasFile = !!fileUrl;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-100 flex-shrink-0">
        {resource.thumbnail ? (
          <Image
            src={
              urlForImage(resource.thumbnail as any)
                ?.width(400)
                .height(250)
                .fit("crop")
                .url() as string
            }
            alt={resource.thumbnail.alt ?? resource.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            {isVideo && <Play className="w-16 h-16" />}
            {isAudio && (
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            )}
            {isDoc && (
              <Download className="w-16 h-16" />
            )}
          </div>
        )}
        <Badge
          size="sm"
          variant={config.variant}
          className="absolute top-2 left-2"
        >
          {config.label}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h3 className="font-semibold text-lg mb-2 leading-tight">{resource.title}</h3>
        {resource.description && (
          <p className="text-gray-600 text-sm mb-4 grow">{resource.description}</p>
        )}

        {/* Inline player (toggled) */}
        {hasInlineMedia && playerOpen && (
          <div className="mb-4">
            {isAudio && fileUrl && (
              <AudioPlayer url={fileUrl} title={resource.title} />
            )}
            {isVideo && (
              <VideoPlayer
                url={hasEmbed ? undefined : fileUrl}
                embedUrl={resource.embedUrl}
                title={resource.title}
              />
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-auto flex gap-2 flex-wrap">
          {hasInlineMedia && (hasFile || hasEmbed) && (
            <button
              type="button"
              onClick={() => setPlayerOpen((o) => !o)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4" />
              {playerOpen ? "Zavřít přehrávač" : "Přehrát"}
            </button>
          )}
          {(isDoc || isAudio) && hasFile && (
            <a
              href={fileUrl}
              download={resource.file?.asset?.originalFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Stáhnout
            </a>
          )}
          {isDoc && hasFile && !isAudio && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Zobrazit
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
