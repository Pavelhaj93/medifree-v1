import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BookOpen, FileText, Filter, Headphones } from "lucide-react";
import Link from "next/link";

export default function ProductCategories() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-medium mb-4 md:mb-0">
            Objevte naše kategorie produktů
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" className="rounded-full">
              <Filter className="mr-2 h-4 w-4" /> Filtrovat
            </Button>
            <div className="relative">
              <Input
                type="search"
                placeholder="Hledat produkty..."
                className="rounded-full pl-4 pr-10 py-2 border-gray-200 focus:border-primary focus:ring-primary w-[200px]"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Hledat</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link
            href="#"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Ebooky</h3>
            <p className="text-sm text-gray-600 mt-1">12 položek</p>
          </Link>

          <Link
            href="#"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Cvičení</h3>
            <p className="text-sm text-gray-600 mt-1">8 položek</p>
          </Link>

          <Link
            href="#"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Headphones className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Meditace</h3>
            <p className="text-sm text-gray-600 mt-1">15 položek</p>
          </Link>

          <Link
            href="#"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
                className="lucide lucide-video text-primary"
              >
                <title>Video</title>
                <path d="m22 8-6 4 6 4V8Z" />
                <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
              </svg>
            </div>
            <h3 className="font-medium">Video kurzy</h3>
            <p className="text-sm text-gray-600 mt-1">6 položek</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
