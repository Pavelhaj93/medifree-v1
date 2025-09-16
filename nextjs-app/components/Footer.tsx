import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto bg-gray-50">
        <div className="border-t-8 border-primary w-2/5 ml-auto" />
        <div className="border-t-8 border-secondary" />
        <div className="flex justify-between items-center px-4 md:px-10 text-center py-4">
          <div className="flex gap-8 items-center">
            <Image
              src="/logo/Logotyp_Medifree_black.png"
              alt="Logo"
              width={100}
              height={50}
              className="h-18 w-18"
            />
            <div className="flex items-center">
              <nav className="space-x-6">
                <Link
                  href="/ochrana-osobnich-udaju"
                  className="text-gray-700 hover:text-secondary transition-colors mb-2 cursor-pointer"
                >
                  Pravidla a podmínky ochrany osobních údajů
                </Link>
                {/* <Link
                  href="/podminky-uzivani-sluzeb"
                  className="text-gray-700 hover:text-secondary transition-colors cursor-pointer"
                >
                  Obchodní podmínky
                </Link> */}
              </nav>
            </div>
          </div>
          <p>
            © {new Date().getFullYear()} Medifree by{" "}
            <Link
              href="https://www.insidepro.cz"
              className="hover:text-primary transition-colors"
            >
              INSIDEPRO
            </Link>
            . Všechna práva vyhrazena
          </p>
        </div>
      </div>
    </footer>
  );
}
