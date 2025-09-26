import DocumentCategoriesMap from "@/app/components/sections/legalDocuments/DocumentCategoriesMap";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { sanityFetch } from "@/sanity/lib/live";
import { allLegalDocumentsQuery } from "@/sanity/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Právní dokumenty",
  description:
    "Zde najdete všechny důležité právní dokumenty týkající se našich služeb a e-shopu. Všechny dokumenty jsou k dispozici ke stažení v textovém formátu nebo PDF.",
};

export default async function LegalDocumentsPage() {
  const { data: legalDocuments } = await sanityFetch({
    query: allLegalDocumentsQuery,
  });

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 md:px-10 py-16 md:py-32">
        <div className="flex justify-center mb-8">
          <Badge variant="primary">Právní dokumenty</Badge>
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-center mb-6">
          Právní dokumenty ke stažení
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Zde najdete všechny důležité právní dokumenty týkající se našich
          služeb a e-shopu. Všechny dokumenty jsou k dispozici ke stažení v
          textovém formátu nebo PDF.
        </p>

        {/* Company Info */}
        <div className="border-l-4 border-primary bg-white rounded-r-xl p-6 mb-12 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-primary mb-1">
                Medifree s.r.o.
              </h2>
              <p className="text-sm text-gray-600">
                IČO: 23153041 • Na Kotli 1176/29, Hradec Králové
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:info@medifree.cz"
                className="text-sm text-primary hover:underline flex items-center"
              >
                info@medifree.cz
              </a>
            </div>
          </div>
        </div>

        {/* Documents by Category */}
        <DocumentCategoriesMap legalDocuments={legalDocuments} />

        {/* Important Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
          <h3 className="font-medium text-lg mb-2">Důležité informace</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • Všechny dokumenty jsou platné od data uvedeného v každém
              dokumentu
            </li>
            <li>
              • V případě nejasností nás kontaktujte na{" "}
              <a
                href="mailto:info@medifree.cz"
                className="text-primary hover:underline"
              >
                info@medifree.cz
              </a>
            </li>
            <li>
              • Dokumenty jsou pravidelně aktualizovány dle platné legislativy
            </li>
            <li>
              • Pro zobrazení staženého dokumentu je potřeba mít nainstalovaný
              PDF prohlížeč (např. Adobe Acrobat Reader)
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium mb-4">Potřebujete pomoc?</h3>
          <p className="text-gray-600 mb-6">
            Máte-li jakékoliv dotazy k právním dokumentům nebo potřebujete
            vysvětlení, neváhejte nás kontaktovat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="/kontakt">Kontaktovat nás</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:info@medifree.cz">Napsat email</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
