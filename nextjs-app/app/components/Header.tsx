"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookButton } from "./others/BookButton";
import { cn } from "../lib/utils";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { useCart } from "../context/cartContext";

const links = [
  { href: "/", label: "Domů" },
  { href: "/o-nas", label: "O nás" },
  { href: "/nase-sluzby", label: "Služby" },
  { href: "/e-shop", label: "E-shop" },
  { href: "/clanky", label: "Články" },
  { href: "/akce-a-novinky", label: "Akce a Novinky" },
  { href: "/casto-kladene-otazky", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { items } = useCart();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkClass = (path: string) =>
    pathname === path
      ? "text-primary"
      : "text-gray-700 hover:text-secondary transition-colors";

  return (
    <header className="bg-gray-50 sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center md:px-10 h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center focus-visible:outline-primary rounded-2xl"
            >
              <Image
                className="text-xl font-bold h-18 w-18"
                src="/logo/Logotyp_Medifree_black.png"
                alt="Domovská stránka"
                width={100}
                height={50}
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg focus-visible:outline-primary px-2 rounded-full",
                  linkClass(link.href)
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* Book a session link */}
            <BookButton />
          </nav>

          {/* Desktop Cart Link */}
          <div className="hidden xl:flex items-center gap-4 ">
            <Link
              href="/kosik"
              className="relative p-2 cursor-pointer rounded-full hover:bg-gray-100 focus-visible:outline-primary"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length ?? 0}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 xl:hidden z-20 ">
            <BookButton className="mr-2 md:mr-10" />
            <Link
              href="/kosik"
              className="relative mr-2 p-1 cursor-pointer rounded-full hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length ?? 0}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-1 cursor-pointer rounded-full hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="border-t-8 border-secondary" />
        <div className="border-t-8 border-primary w-2/5" />
      </div>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: not needed */}
      <div
        className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out xl:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          {/* close icon */}
          <button
            onClick={toggleMenu}
            type="button"
            className="absolute top-8 right-8 sm:right-10 md:right-20 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="flex-1 space-y-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-lg hover:text-primary ${
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t mb-10 border-gray-200 space-y-4">
            <BookButton className="w-full" />
            <div className="text-sm text-gray-500 text-center">
              <p>Potřebujete poradit? Napište nám na</p>
              <a
                href="mailto:info@medifree.com"
                className="text-primary font-medium"
              >
                info@medifree.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
