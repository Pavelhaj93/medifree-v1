export type EmbeddedVideo = {
  provider: "youtube" | "vimeo";
  /** Player URL for an <iframe>; autoplay is fine because it only loads after a click. */
  embedUrl: string;
  /** Preview image, when the provider has a public one without an API call. */
  thumbnailUrl?: string;
};

const YOUTUBE_ID = /^[\w-]{11}$/;

/** Parses YouTube (watch, youtu.be, shorts, embed) and Vimeo (incl. unlisted hash) links. */
export function parseVideoUrl(raw?: string | null): EmbeddedVideo | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m)\./, "");

  if (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com") {
    const id =
      host === "youtu.be"
        ? url.pathname.slice(1).split("/")[0]
        : url.searchParams.get("v") ?? url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1];
    if (!id || !YOUTUBE_ID.test(id)) return null;
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const match = url.pathname.match(/^\/(?:video\/)?(\d+)(?:\/([\da-f]+))?/);
    if (!match) return null;
    const hash = match[2] ?? url.searchParams.get("h");
    return {
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${match[1]}?autoplay=1${hash ? `&h=${hash}` : ""}`,
    };
  }

  return null;
}
