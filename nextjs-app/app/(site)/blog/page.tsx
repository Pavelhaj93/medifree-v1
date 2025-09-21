import BlogArticleGrid from "@/app/components/sections/blog/BlogArticleGrid";
import BlogFeaturedArticle from "@/app/components/sections/blog/BlogFeaturedArticle";
import { BlogHeroSection } from "@/app/components/sections/blog/BlogHeroSection";

export default function BlogPage() {
  return (
    <>
      <BlogHeroSection />
      <BlogFeaturedArticle />
      <BlogArticleGrid />

      {/* Newsletter Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Buďte v obraze</Badge>
            <h2 className="text-3xl font-medium mb-4">
              Přihlaste se k odběru našeho newsletteru
            </h2>
            <p className="text-gray-600 mb-8">
              Získejte nejnovější články, zdroje a poznatky o duševní pohodě
              doručeno přímo do vaší schránky. Připojte se k naší komunitě
              uvědomělých jednotlivců, kteří hledají rovnováhu a růst.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Zadejte svůj e-mail"
                className="rounded-full border-gray-200 focus:border-primary focus:ring-primary"
              />
              <Button variant="primary">Odebírat</Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Odesláním souhlasíte s našimi Zásadami ochrany osobních údajů.
              Můžete se kdykoli odhlásit.
            </p>
          </div>
        </div>
      </section> */}

      {/* Categories Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium mb-8 text-center">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="#"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#8D3F38]/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#8D3F38]"
                >
                  <title>Heart</title>
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </div>
              <h3 className="font-medium">Mental Health</h3>
              <p className="text-sm text-gray-600 mt-1">24 articles</p>
            </Link>

            <Link
              href="#"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#8D3F38]/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#8D3F38]"
                >
                  <title>Users</title>
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="font-medium">Relationships</h3>
              <p className="text-sm text-gray-600 mt-1">18 articles</p>
            </Link>

            <Link
              href="#"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#8D3F38]/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#8D3F38]"
                >
                  <title>Heart</title>
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h3 className="font-medium">Self-Care</h3>
              <p className="text-sm text-gray-600 mt-1">15 articles</p>
            </Link>

            <Link
              href="#"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#8D3F38]/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#8D3F38]"
                >
                  <title>Brain</title>
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                  <path d="M10 2c1 .5 2 2 2 5" />
                </svg>
              </div>
              <h3 className="font-medium">Mindfulness</h3>
              <p className="text-sm text-gray-600 mt-1">12 articles</p>
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
}
