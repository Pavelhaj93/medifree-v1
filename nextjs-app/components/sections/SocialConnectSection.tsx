import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Headphones,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Facebook,
} from "lucide-react";
import { Badge } from "../ui/Badge";

export default function SocialConnectSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Podcast promo */}
          <div className="flex-1 max-w-xl">
            <Badge variant="primary" className="mb-4">
              POSLOUCHEJTE A SLEDUJTE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Podcasty</h2>
            <p className="text-gray-600 mb-6">
              Připojte se kažsý týden při rozhovorech o duševní pohodě, vztazích
              a osobním růstu. Dostupně na všech hlavních podcastových
              platformách.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                href="#"
                className="bg-black text-white rounded-full px-4 py-2 flex items-center hover:bg-gray-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                Apple Podcasts
              </Link>

              <Link
                href="#"
                className="bg-purple-500 text-white rounded-full px-4 py-2 flex items-center hover:opacity-90"
              >
                <Facebook className="w-5 h-5 mr-2" />
                HeroHero
              </Link>

              <Link
                href="#"
                className="bg-green-500 text-white rounded-full px-4 py-2 flex items-center hover:opacity-90"
              >
                <Headphones className="w-5 h-5 mr-2" />
                Google Podcasts
              </Link>
            </div>

            <Button variant="primary">
              Poslední epizoda <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right side - Podcast artwork and social links */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-64 h-64 mb-6">
              <Image
                src="/images/homepage/podcast.png"
                alt="Mindful Moments Podcast"
                fill
                className="object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-md">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Sledujte nás na sociálních sítích a buďte součástí naší
                komunity!
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="#"
                  className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </Link>
                <Link
                  href="#"
                  className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                </Link>
                <Link
                  href="#"
                  className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Youtube className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
