"use client";

type VideoPlayerProps = {
  url?: string;
  embedUrl?: string;
  title?: string;
};

function getEmbedSrc(url: string): string {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return url;
}

export default function VideoPlayer({ url, embedUrl, title }: VideoPlayerProps) {
  if (embedUrl) {
    return (
      <div className="relative w-full mt-3 aspect-video">
        <iframe
          src={getEmbedSrc(embedUrl)}
          title={title ?? "Video přednáška"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>
    );
  }

  if (url) {
    return (
      <video
        controls
        className="w-full mt-3 rounded-lg"
        aria-label={title ?? "Video přednáška"}
        preload="metadata"
      >
        <source src={url} />
        Váš prohlížeč nepodporuje přehrávač videa.
      </video>
    );
  }

  return null;
}
