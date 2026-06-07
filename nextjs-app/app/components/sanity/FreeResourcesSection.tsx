import FreeResourcesGrid from "@/app/components/sections/free-resources/FreeResourcesGrid";

type FreeResource = {
  _id: string;
  title: string;
  category: string;
  description?: string;
  thumbnail?: { asset?: unknown; alt?: string; _type?: string };
  file?: { asset?: { url?: string; originalFilename?: string; mimeType?: string } };
  embedUrl?: string;
};

type FreeResourcesSectionBlock = {
  heading?: string;
  subheading?: string;
  freeResources?: FreeResource[];
};

export default function FreeResourcesSection({
  block,
}: {
  block: FreeResourcesSectionBlock;
}) {
  return (
    <FreeResourcesGrid
      resources={block.freeResources ?? []}
      heading={block.heading}
      subheading={block.subheading}
    />
  );
}
