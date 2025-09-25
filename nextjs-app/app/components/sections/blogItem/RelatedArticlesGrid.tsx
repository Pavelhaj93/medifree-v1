import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// TODO: az bude vice clanku, tak to nahradit nejakym dynamickym ziskavanim podobnych clanku

type RelatedArticleItemProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
};

const RelatedArticleItem = ({
  imageSrc,
  imageAlt,
  title,
}: RelatedArticleItemProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-[160px]">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-base mb-2">{title}</h3>
        <Link
          href="#"
          className="text-primary text-sm font-medium hover:underline inline-flex items-center"
        >
          Číst více
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default async function RelatedArticles() {
  return (
    <>
      <h2 className="text-2xl font-medium mb-8">
        Další články, které by vás mohly zajímat
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Related Article 1 */}
        {/* TODO: replace with some real articles of similar category for example */}
        {/* {mockArticles.slice(0, 3).map((article) => (
          <RelatedArticleItem
            key={article.id}
            imageSrc={article.imageSrc}
            imageAlt={article.imageAlt}
            title={article.title}
          />
        ))} */}
      </div>
    </>
  );
}
