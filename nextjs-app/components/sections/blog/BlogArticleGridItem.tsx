import { Badge } from "@/components/ui/Badge";
import { urlForImage } from "@/sanity/lib/utils";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BlogArticleGridItemProps = {
  title: string;
  date: string;
  readTime: number;
  description: string;
  category: string;
  slug: string;
  // TODO: find correct type for image prop in Sanity schema
  image: any;
  imageAlt: string;
};

export default function BlogArticleGridItem({
  image,
  imageAlt,
  title,
  date,
  readTime,
  description,
  category,
  slug,
}: BlogArticleGridItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-[200px]">
        <Image
          src={
            urlForImage(image)
              ?.height(200)
              .width(400)
              .fit("crop")
              .url() as string
          }
          alt={imageAlt}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="primary" className="bg-white/80 backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {readTime.toString()} min čtení
          </div>
        </div>
        <h3 className="font-medium text-lg mb-3">
          <Link href={`/blog/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link
          href="#"
          className="text-[#8D3F38] font-medium hover:underline inline-flex items-center"
        >
          Číst více <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
