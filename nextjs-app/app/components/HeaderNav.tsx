"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronDown,
  Download,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import { BookButton, BOOKING_URL } from "./others/BookButton";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";
import { useCart } from "../context/cartContext";

export type HeaderNavData = {
  services: {
    key: string;
    title: string;
    description: string;
    price: string;
    hasPrice: boolean;
    href: string;
    imageUrl?: string;
  }[];
  categories: { label: string; hint: string; href: string }[];
  shopNote: string;
  featured: {
    title: string;
    href: string;
    price: string;
    originalPrice?: string;
    imageUrl?: string;
  } | null;
  latestPost: { title: string; href: string; readTime?: string; imageUrl?: string } | null;
  email: string;
};

type GroupKey = "serv" | "shop" | "por";

const NAV: ({ key: GroupKey; label: string } | { href: string; label: string })[] = [
  { key: "serv", label: "Služby" },
  { key: "shop", label: "E-shop" },
  { key: "por", label: "Poradna" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

const PORADNA = [
  { href: "/clanky", label: "Články", description: "Praktické rady o glykémii, výživě a spánku.", Icon: BookOpen },
  { href: "/ke-stazeni", label: "Ke stažení zdarma", description: "Videa, nahrávky a PDF materiály.", Icon: Download },
  { href: "/akce-a-novinky", label: "Novinky", description: "Co je u nás nového – akce, termíny, změny.", Icon: Bell },
];

const GROUP_PATHS: Record<GroupKey, string[]> = {
  serv: ["/nase-sluzby"],
  shop: ["/e-shop"],
  por: ["/clanky", "/ke-stazeni", "/akce-a-novinky"],
};

const matches = (pathname: string, path: string) => pathname === path || pathname.startsWith(`${path}/`);

const panelShadow = "shadow-[0_24px_48px_-16px_rgba(13,14,18,0.3)]";
const focusRing = "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

export default function HeaderNav({ nav }: { nav: HeaderNavData }) {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState<GroupKey | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<GroupKey | null>(null);
  const triggers = useRef<Partial<Record<GroupKey, HTMLButtonElement | null>>>({});

  const groupActive = (key: GroupKey) => GROUP_PATHS[key].some((p) => matches(pathname, p));

  const closeAll = () => {
    setOpen(null);
    setDrawerOpen(false);
  };

  // Close everything after navigating.
  useEffect(() => {
    setOpen(null);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes the open panel and returns focus to its trigger.
  useEffect(() => {
    if (!open && !drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) triggers.current[open]?.focus();
      closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, drawerOpen]);

  // Prevent scrolling behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [drawerOpen]);

  const toggleDrawer = () => {
    if (!drawerOpen) {
      setMobileGroup((Object.keys(GROUP_PATHS) as GroupKey[]).find(groupActive) ?? null);
    }
    setDrawerOpen(!drawerOpen);
  };

  // A click on any link inside a panel closes it, also when the link points to the current page.
  const closeOnLink = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) closeAll();
  };

  const cartLabel = itemCount > 0 ? `Košík, ${itemCount} ks` : "Košík";

  const mobileItems: Record<GroupKey, { label: string; href: string; meta?: string }[]> = {
    serv: [
      ...nav.services.map((s) => ({ label: s.title, href: s.href, meta: s.hasPrice ? s.price : undefined })),
      { label: "Všechny služby a ceník", href: "/nase-sluzby" },
    ],
    shop: [...nav.categories, { label: "Celý e-shop", href: "/e-shop" }],
    por: PORADNA,
  };

  return (
    <>
      {(open || drawerOpen) && (
        <div
          aria-hidden="true"
          onClick={closeAll}
          className={cn("fixed inset-0 z-20 bg-black/25", open ? "hidden lg:block" : "lg:hidden")}
        />
      )}

      <header className="sticky top-0 z-30 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex h-18 items-center gap-1 lg:h-22 lg:gap-6 md:px-10">
            <Link href="/" aria-label="Medifree – domů" className={cn("flex shrink-0 rounded-2xl", focusRing)}>
              <Image
                src="/logo/Logotyp_Medifree_black.png"
                alt=""
                width={100}
                height={50}
                className="h-13 w-13 object-contain lg:h-16 lg:w-16"
              />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Hlavní navigace" className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
              {NAV.map((item) =>
                "key" in item ? (
                  <button
                    key={item.key}
                    ref={(el) => {
                      triggers.current[item.key] = el;
                    }}
                    type="button"
                    aria-expanded={open === item.key}
                    aria-controls={`header-panel-${item.key}`}
                    onClick={() => setOpen(open === item.key ? null : item.key)}
                    className={cn(
                      "inline-flex h-11 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full pl-4 pr-3.5 text-[17px] transition-colors",
                      focusRing,
                      open === item.key
                        ? "bg-white text-primary shadow-[inset_0_0_0_1px_var(--color-secondary)]"
                        : "text-gray-700 hover:bg-white hover:text-primary",
                      groupActive(item.key) && "font-medium text-primary",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-4 w-4 transition-transform", open === item.key && "rotate-180")}
                    />
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={matches(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex h-11 items-center whitespace-nowrap rounded-full px-4 text-[17px] text-gray-700 transition-colors hover:bg-white hover:text-primary",
                      focusRing,
                      matches(pathname, item.href) && "font-medium text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <span className="flex-1 lg:hidden" />

            <div className="flex shrink-0 items-center gap-1 lg:gap-2">
              <Link
                href="/kosik"
                aria-label={cartLabel}
                className={cn(
                  "relative inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-700 hover:bg-white hover:text-primary",
                  focusRing,
                )}
              >
                <ShoppingCart className="h-[22px] w-[22px]" aria-hidden="true" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-white">
                    {itemCount}
                  </span>
                )}
              </Link>
              <BookButton className="hidden h-11 px-5 text-base lg:inline-flex" />
              <button
                type="button"
                onClick={toggleDrawer}
                aria-label={drawerOpen ? "Zavřít menu" : "Otevřít menu"}
                aria-expanded={drawerOpen}
                aria-controls="header-drawer"
                className={cn(
                  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full lg:hidden",
                  focusRing,
                  drawerOpen ? "bg-primary text-white" : "bg-white text-primary shadow-[inset_0_0_0_1px_var(--color-primary)]",
                )}
              >
                {drawerOpen ? <X className="h-[22px] w-[22px]" /> : <Menu className="h-[22px] w-[22px]" />}
              </button>
            </div>
          </div>
          <div className="border-t-6 border-secondary lg:border-t-8" />
          <div className="w-2/5 border-t-6 border-primary lg:border-t-8" />
        </div>

        {/* Desktop dropdown panels */}
        {open && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: only closes the panel after a link click
          <div className="absolute inset-x-0 top-full z-30 hidden lg:block" onClick={closeOnLink}>
            <div className="container mx-auto">
              <div
                id={`header-panel-${open}`}
                className={cn("flex flex-col gap-5 rounded-b-2xl bg-white px-8 py-7 md:mx-10", panelShadow)}
              >
                {open === "serv" && <ServicesPanel nav={nav} />}
                {open === "shop" && <ShopPanel nav={nav} />}
                {open === "por" && <PoradnaPanel nav={nav} />}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {drawerOpen && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: only closes the menu after a link click
          <div
            id="header-drawer"
            onClick={closeOnLink}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-84px)] overflow-y-auto bg-white lg:hidden"
          >
            <nav aria-label="Hlavní navigace" className="container mx-auto flex flex-col pt-2 pb-6">
              {NAV.map((item) =>
                "key" in item ? (
                  <div key={item.key} className="border-b border-gray-200">
                    <button
                      type="button"
                      aria-expanded={mobileGroup === item.key}
                      aria-controls={`header-drawer-${item.key}`}
                      onClick={() => setMobileGroup(mobileGroup === item.key ? null : item.key)}
                      className={cn(
                        "flex min-h-14 w-full cursor-pointer items-center justify-between text-lg font-medium text-black",
                        focusRing,
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-5 w-5 transition-transform",
                          mobileGroup === item.key ? "rotate-180 text-primary" : "text-gray-600",
                        )}
                      />
                    </button>
                    {mobileGroup === item.key && (
                      <div id={`header-drawer-${item.key}`} className="flex flex-col pb-3">
                        {mobileItems[item.key].map((sub) => (
                          <Link
                            key={sub.href + sub.label}
                            href={sub.href}
                            className={cn(
                              "flex min-h-12 items-center justify-between gap-4 rounded-[10px] px-3 text-base text-gray-700 hover:bg-gray-50",
                              focusRing,
                            )}
                          >
                            {sub.label}
                            {"meta" in sub && sub.meta && (
                              <span className="text-sm whitespace-nowrap text-gray-600">{sub.meta}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={matches(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center border-b border-gray-200 text-lg font-medium text-black",
                      focusRing,
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Button asChild className="mt-6 h-13 text-[17px]">
                <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Rezervovat konzultaci
                </Link>
              </Button>
              <a href={`mailto:${nav.email}`} className="mt-5 text-center text-[15px] text-primary">
                {nav.email}
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

function PanelFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-1.5 font-medium text-primary hover:underline", focusRing)}>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function ServicesPanel({ nav }: { nav: HeaderNavData }) {
  return (
    <>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(nav.services.length, 1), 4)}, minmax(0, 1fr))` }}
      >
        {nav.services.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className={cn("flex flex-col gap-2 rounded-xl p-3 text-black transition-colors hover:bg-gray-50", focusRing)}
          >
            {s.imageUrl && (
              <Image
                src={s.imageUrl}
                alt=""
                width={280}
                height={128}
                className="mb-1 h-32 w-full rounded-lg object-cover"
              />
            )}
            <span className="text-[17px] font-medium">{s.title}</span>
            {s.description && <span className="line-clamp-2 text-sm leading-relaxed text-gray-600">{s.description}</span>}
            {s.price && <span className="text-sm font-medium text-primary">{s.price}</span>}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 text-[15px]">
        <PanelFooterLink href="/nase-sluzby">Všechny služby a ceník</PanelFooterLink>
        <span className="text-gray-600">
          Nevíte, kterou zvolit?{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
            Rezervujte úvodní konzultaci
          </a>
        </span>
      </div>
    </>
  );
}

function ShopPanel({ nav }: { nav: HeaderNavData }) {
  return (
    <>
      <div className={cn("grid gap-6", nav.featured && "grid-cols-[minmax(0,1fr)_320px]")}>
        <div className="flex flex-col gap-1">
          <h3 className="mb-1.5 ml-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">Kategorie</h3>
          <div className="grid grid-cols-2 gap-1">
            {nav.categories.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className={cn("flex flex-col gap-0.5 rounded-[10px] px-3 py-2.5 text-black transition-colors hover:bg-gray-50", focusRing)}
              >
                <span className="text-base font-medium">{c.label}</span>
                <span className="text-sm text-gray-600">{c.hint}</span>
              </Link>
            ))}
          </div>
        </div>
        {nav.featured && (
          <Link
            href={nav.featured.href}
            className={cn(
              "flex items-center gap-4 rounded-xl bg-gray-50 p-4 text-black transition-colors hover:bg-secondary/30",
              focusRing,
            )}
          >
            {nav.featured.imageUrl && (
              <Image
                src={nav.featured.imageUrl}
                alt=""
                width={88}
                height={128}
                className="h-32 w-22 shrink-0 rotate-[4deg] rounded-md object-cover shadow-[0_8px_16px_-6px_rgba(0,0,0,0.25)]"
              />
            )}
            <span className="flex flex-col gap-1.5">
              <span className="self-start rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-primary shadow-xs">
                Doporučujeme
              </span>
              <span className="line-clamp-3 leading-snug font-medium">{nav.featured.title}</span>
              <span className="font-bold">
                {nav.featured.price}{" "}
                {nav.featured.originalPrice && (
                  <span className="text-sm font-normal text-gray-600 line-through">{nav.featured.originalPrice}</span>
                )}
              </span>
            </span>
          </Link>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 text-[15px]">
        <PanelFooterLink href="/e-shop">Celý e-shop</PanelFooterLink>
        <span className="text-gray-600">{nav.shopNote}</span>
      </div>
    </>
  );
}

function PoradnaPanel({ nav }: { nav: HeaderNavData }) {
  return (
    <div className={cn("grid gap-4", nav.latestPost ? "grid-cols-[repeat(3,minmax(0,1fr))_380px]" : "grid-cols-3")}>
      {PORADNA.map(({ href, label, description, Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn("flex flex-col gap-2.5 rounded-xl p-4 text-black transition-colors hover:bg-gray-50", focusRing)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/50 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-[17px] font-medium">{label}</span>
          <span className="text-sm leading-relaxed text-gray-600">{description}</span>
        </Link>
      ))}
      {nav.latestPost && (
        <Link
          href={nav.latestPost.href}
          className={cn(
            "flex items-center gap-3.5 rounded-xl bg-gray-50 p-3 text-black transition-colors hover:bg-secondary/30",
            focusRing,
          )}
        >
          {nav.latestPost.imageUrl && (
            <Image
              src={nav.latestPost.imageUrl}
              alt=""
              width={120}
              height={120}
              className="h-30 w-30 shrink-0 rounded-lg object-cover"
            />
          )}
          <span className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-wider text-gray-600 uppercase">Nejnovější článek</span>
            <span className="leading-snug font-medium">{nav.latestPost.title}</span>
            {nav.latestPost.readTime && <span className="text-sm text-gray-600">{nav.latestPost.readTime}</span>}
          </span>
        </Link>
      )}
    </div>
  );
}
