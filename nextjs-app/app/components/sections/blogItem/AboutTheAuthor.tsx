import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { urlForImage } from "@/sanity/lib/utils";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function AboutTheAuthor({
  name,
  description,
  image,
  slug,
}: {
  name: string;
  description: string;
  // TODO: find correct type for image prop in Sanity schema
  image: any;
  slug: string;
}) {
  return (
    <div className="my-12">
      {/* <Badge variant="primary" className="mb-4">
        O autorovi
      </Badge> */}
      <h2 className="text-2xl font-medium mb-8">O autorovi</h2>
      <div className="bg-gray-50 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden relative shrink-0">
            <Image
              src={
                urlForImage(image)
                  ?.height(256)
                  .width(256)
                  .fit("crop")
                  .url() as string
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            {/* <h3 className="text-xl font-medium mb-2">O autorovi</h3> */}

            <h4 className="text-lg font-medium mb-2">{name}</h4>
            <p className="text-gray-600 mb-4">{description}</p>
            <Button variant="primary" asChild>
              <Link href={`/o-nas#${slug}`}>
                Více o mně
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
