import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { companyQuery } from "@/sanity/queries/shop";

const LINKS = [
  { href: "/kontakt", label: "Kontakt" },
  { href: "/casto-kladene-otazky", label: "Časté dotazy" },
  { href: "/ochrana-osobnich-udaju", label: "Obchodní podmínky, reklamace a ochrana osobních údajů" },
];

export default async function Footer() {
  const { data: company } = await sanityFetch({ query: companyQuery, stega: false });

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto bg-gray-50">
        <div className="border-t-8 border-primary w-2/5 ml-auto" />
        <div className="border-t-8 border-secondary" />
        <div className="flex flex-col md:flex-row justify-between gap-8 px-4 md:px-10 py-8">
          <div className="flex gap-6 items-start">
            <Image
              src="/logo/Logotyp_Medifree_black.png"
              alt="Medifree"
              width={100}
              height={50}
              className="h-18 w-18 shrink-0"
            />
            {company && (
              <address className="not-italic text-sm text-gray-700 leading-relaxed">
                {company.name && <p className="font-medium text-gray-900">{company.name}</p>}
                {company.address && <p>{company.address}</p>}
                {company.ico && <p>IČO: {company.ico}</p>}
                {company.registry && <p>{company.registry}</p>}
                {company.email && (
                  <p>
                    <a href={`mailto:${company.email}`} className="hover:text-primary">
                      {company.email}
                    </a>
                  </p>
                )}
              </address>
            )}
          </div>

          <nav aria-label="Patička">
            <ul className="flex flex-col gap-1 text-sm">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-gray-700 hover:text-primary transition-colors md:min-h-0 md:py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="px-4 md:px-10 pb-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Medifree by{" "}
          <Link href="https://www.insidepro.cz" className="hover:text-primary transition-colors">
            INSIDEPRO
          </Link>
          . Všechna práva vyhrazena
        </p>
      </div>
    </footer>
  );
}
