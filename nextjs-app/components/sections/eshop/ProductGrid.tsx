import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Denní cvičení pro mindfulness",
    price: 399,
    imageSrc: "/placeholder.svg?height=200&width=400",
    imageAlt: "Mindfulness Workbook",
    rating: 4,
    reviews: 28,
    description:
      "Praktické cvičení obsahující 30 denních úkolů pro rozvoj mindfulness a snížení stresu. Ideální pro každodenní praxi.",
    isNew: true,
  },
  {
    id: 2,
    name: "Úleva od úzkosti - Meditační balíček",
    price: 250,
    imageSrc: "/placeholder.svg?height=200&width=400",
    imageAlt: "Anxiety Relief Meditation Bundle",
    rating: 5,
    reviews: 36,
    description:
      "10 vedených meditačních audio skladeb navržených k snížení úzkosti a podpoře relaxace.",
  },
  {
    id: 3,
    name: "Průvodce komunikací ve vztazích",
    price: 239,
    originalPrice: 299,
    imageSrc: "/placeholder.svg?height=200&width=400",
    imageAlt: "Relationship Communication Guide",
    rating: 4,
    reviews: 19,
    description:
      "Naučte se efektivní komunikační strategie pro posílení vašich vztahů a řešení konfliktů.",
  },
];

const ProductCard = ({
  name,
  price,
  originalPrice,
  imageSrc,
  imageAlt,
  rating,
  reviews,
  description,
  isNew,
}: {
  name: string;
  price: number;
  originalPrice?: number;
  imageSrc: string;
  imageAlt: string;
  rating: number;
  reviews: number;
  description: string;
  isNew?: boolean;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-[200px]">
        <Image
          src={"/images/eshop/book_placeholder.png"}
          alt={imageAlt}
          fill
          className="object-cover w-full"
        />
        {originalPrice && (
          <Badge size="sm" variant="success" className="absolute top-2 right-2">
            Sleva
          </Badge>
        )}
        {isNew && (
          <Badge size="sm" variant="primary" className="absolute top-2 left-2">
            Novinka
          </Badge>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-medium text-lg mb-2">{name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <Star
              // biome-ignore lint/suspicious/noArrayIndexKey: Will be replaced for real data
              key={index}
              className={`w-4 h-4 ${
                index < rating
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "fill-gray-200 stroke-gray-200"
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-gray-600">({reviews})</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          {originalPrice ? (
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold">{price} Kč</div>
              <div className="text-sm text-gray-500 line-through">
                {originalPrice} Kč
              </div>
            </div>
          ) : (
            <div className="text-xl font-bold">{price} Kč</div>
          )}
          <Button size="sm" variant="primary" className="rounded-full">
            <ShoppingCart className="mr-2 h-2 w-2" />
            Přidat do košíku
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ProductGridSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mb-8">Oblíbené položky</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt}
                rating={product.rating}
                reviews={product.reviews}
                description={product.description}
                isNew={product.isNew}
              />
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline">Zobrazit všechny produkty</Button>
        </div>
      </div>
    </section>
  );
}
