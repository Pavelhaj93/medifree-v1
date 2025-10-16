import { HomepageVideoSection as VideoSectionComponent } from "@/app/components/sections/homepage/HomepageVideoSection";
import type { VideoQueryResult } from "@/sanity.types";

type VideoSectionProps = {
  block: {
    _type: string;
    _key: string;
    video?: VideoQueryResult;
    autoplay?: boolean;
    showControls?: boolean;
    loop?: boolean;
  };
};

export default function VideoSection({ block }: VideoSectionProps) {
  const { video, autoplay = true, showControls = true, loop = true } = block;

  return <VideoSectionComponent video={video || null} />;
}
