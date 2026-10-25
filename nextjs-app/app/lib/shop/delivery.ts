type FileField = { asset?: { url?: string | null } | null } | null | undefined;

/** A material from the library (document type `material`): an uploaded file or a link. */
export type DeliveryMaterial = {
  title: string | null;
  url: string | null;
  mimeType?: string | null;
};

type MaterialsField = Array<DeliveryMaterial | null> | null | undefined;

export type DeliverableProduct = {
  title: string | null;
  category: string | null;
  ebookFile?: FileField;
  audioFile?: FileField;
  videoFile?: FileField;
  materials?: MaterialsField;
  bundleItems?: Array<{
    title: string | null;
    category: string | null;
    ebookFile?: FileField;
    audioFile?: FileField;
    videoFile?: FileField;
    materials?: MaterialsField;
  }> | null;
};

const VIDEO_HOSTS = /(youtube\.com|youtu\.be|vimeo\.com)\//;

function materialIcon(m: DeliveryMaterial): string {
  const mime = m.mimeType ?? "";
  if (mime.startsWith("video/") || (!mime && VIDEO_HOSTS.test(m.url ?? ""))) return "🎬";
  if (mime.startsWith("audio/")) return "🎧";
  if (mime === "application/pdf" || mime.includes("epub")) return "📖";
  return mime ? "📎" : "🔗";
}

export function getMaterialFiles(materials: MaterialsField): DeliveryFile[] {
  return (materials ?? [])
    .filter((m): m is DeliveryMaterial & { url: string } => !!m?.url)
    .map((m) => ({ label: `${materialIcon(m)} ${m.title ?? "Materiál"}`, url: m.url }));
}

export type DeliveryFile = { label: string; url: string };

export function getDeliveryFiles(product: DeliverableProduct): DeliveryFile[] {
  const files: DeliveryFile[] = [];
  const add = (file: FileField, label: string) => {
    const url = file?.asset?.url;
    if (url) files.push({ label, url });
  };
  const title = product.title ?? "";

  switch (product.category) {
    case "Ebooky":
      add(product.ebookFile, `📖 ${title} (PDF)`);
      break;
    case "Audionahrávky":
      add(product.audioFile, `🎧 ${title}`);
      break;
    case "Video kurzy":
      add(product.videoFile, `🎬 ${title}`);
      break;
    case "Ebook + Audio":
      add(product.ebookFile, `📖 ${title} (PDF)`);
      add(product.audioFile, `🎧 ${title} (audio)`);
      break;
    case "Balíčky":
      for (const item of product.bundleItems ?? []) {
        add(item.ebookFile, `📖 ${item.title} (PDF)`);
        add(item.audioFile, `🎧 ${item.title} (audio)`);
        add(item.videoFile, `🎬 ${item.title} (video)`);
        files.push(...getMaterialFiles(item.materials));
      }
      break;
  }

  files.push(...getMaterialFiles(product.materials));
  return files;
}

export function uniqueFiles(files: DeliveryFile[]): DeliveryFile[] {
  const seen = new Set<string>();
  return files.filter((f) => (seen.has(f.url) ? false : (seen.add(f.url), true)));
}
