"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookButton } from "./others/BookButton";
import { cn } from "../app/lib/utils";
import { ShoppingCart } from "lucide-react";

const links = [
  { href: "/", label: "Domů" },
  { href: "/nase-sluzby", label: "Služby" },
  { href: "/e-shop", label: "E-shop" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const linkClass = (path: string) =>
    pathname === path
      ? "text-primary"
      : "text-gray-700 hover:text-secondary transition-colors";

  return (
    <header className="bg-gray-50/80 h-24 sticky top-0 z-10">
      <div className="container mx-auto py-4 px-4 md:px-10 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            className="text-xl font-bold h-18 w-18"
            src="/logo/Logotyp_Medifree_black.png"
            alt="Domovská stránka"
            width={100}
            height={50}
          />
        </Link>
        <nav className="space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("text-lg", linkClass(link.href))}
            >
              {link.label}
            </Link>
          ))}
          {/* Book a session link */}
          <BookButton />
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/kosik" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </Link>
        </div>
        <button className="md:hidden">
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
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
