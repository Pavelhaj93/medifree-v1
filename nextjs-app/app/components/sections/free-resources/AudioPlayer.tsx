"use client";

type AudioPlayerProps = {
  url: string;
  title?: string;
};

export default function AudioPlayer({ url, title }: AudioPlayerProps) {
  return (
    <audio
      controls
      className="w-full mt-3"
      aria-label={title ?? "Audionahrávka"}
      preload="metadata"
    >
      <source src={url} />
      Váš prohlížeč nepodporuje přehrávač audia.
    </audio>
  );
}
