import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { companyQuery } from "@/sanity/queries/shop";

const INFO_LINKS = [
  { href: "/casto-kladene-otazky", label: "Časté dotazy" },
  { href: "/ochrana-osobnich-udaju", label: "Obchodní podmínky a reklamace" },
  { href: "/ochrana-osobnich-udaju", label: "Ochrana osobních údajů" },
];

const heading = "mb-3 text-xs font-semibold uppercase tracking-wider text-gray-600";
const link = "inline-flex min-h-11 items-center hover:text-primary transition-colors md:min-h-0 md:py-0.5";

export default async function Footer() {
  const { data: company } = await sanityFetch({ query: companyQuery, stega: false });

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto bg-gray-50">
        <div className="border-t-8 border-primary w-2/5 ml-auto" />
        <div className="border-t-8 border-secondary" />
        <div className="grid gap-8 px-4 md:px-10 py-10 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-12">
          <Image
            src="/logo/Logotyp_Medifree_black.png"
            alt="Medifree"
            width={100}
            height={50}
            className="h-18 w-18"
          />

          {company && (
            <section aria-labelledby="footer-company">
              <h2 id="footer-company" className={heading}>
                Provozovatel
              </h2>
              <address className="not-italic text-sm leading-relaxed text-gray-700">
                {company.name && <p className="font-medium text-gray-900">{company.name}</p>}
                {company.address && <p>{company.address}</p>}
                {company.ico && <p>IČO: {company.ico}</p>}
                {company.registry && <p>{company.registry}</p>}
              </address>
            </section>
          )}

          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact" className={heading}>
              Kontakt
            </h2>
            <ul className="text-sm text-gray-700">
              {company?.email && (
                <li>
                  <a href={`mailto:${company.email}`} className={link}>
                    {company.email}
                  </a>
                </li>
              )}
              {company?.phone && (
                <li>
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={link}>
                    {company.phone}
                  </a>
                </li>
              )}
              <li>
                <Link href="/kontakt" className={link}>
                  Kontaktní formulář
                </Link>
              </li>
              {company?.instagram && (
                <li>
                  <a href={company.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </section>

          <nav aria-labelledby="footer-info">
            <h2 id="footer-info" className={heading}>
              Informace
            </h2>
            <ul className="text-sm text-gray-700">
              {INFO_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-gray-200 px-4 md:px-10 py-5 text-sm text-gray-600 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} Medifree by{" "}
            <Link href="https://www.insidepro.cz" className="hover:text-primary transition-colors">
              INSIDEPRO
            </Link>
            . Všechna práva vyhrazena
          </p>
          <p>Platby zpracovává Stripe</p>
        </div>
      </div>
    </footer>
  );
}
