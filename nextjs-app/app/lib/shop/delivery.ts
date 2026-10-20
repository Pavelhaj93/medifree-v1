type FileField = { asset?: { url?: string | null } | null } | null | undefined;

export type DeliverableProduct = {
  title: string | null;
  category: string | null;
  ebookFile?: FileField;
  audioFile?: FileField;
  videoFile?: FileField;
  bundleItems?: Array<{
    title: string | null;
    category: string | null;
    ebookFile?: FileField;
    audioFile?: FileField;
    videoFile?: FileField;
  }> | null;
};

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
      }
      break;
  }

  return files;
}

export function uniqueFiles(files: DeliveryFile[]): DeliveryFile[] {
  const seen = new Set<string>();
  return files.filter((f) => (seen.has(f.url) ? false : (seen.add(f.url), true)));
}
