"use client";

import { Button } from "@/components/ui/Button";
import {
  Download,
  FileText,
  Shield,
  CreditCard,
  Users,
  Eye,
  Scale,
  AlertTriangle,
} from "lucide-react";

const legalDocuments = [
  {
    id: 1,
    title: "Všeobecné obchodní podmínky",
    description:
      "Kompletní obchodní podmínky pro poskytování služeb a prodej zboží",
    icon: FileText,
    fileSize: "245 KB",
    lastUpdated: "4. 7. 2025",
    downloadUrl: "/documents/vop.pdf",
    category: "Základní dokumenty",
  },
  {
    id: 2,
    title: "Zásady zpracování osobních údajů (GDPR)",
    description:
      "Informace o zpracování a ochraně vašich osobních údajů dle GDPR",
    icon: Shield,
    fileSize: "189 KB",
    lastUpdated: "9. 4. 2025",
    downloadUrl: "/documents/gdpr.pdf",
    category: "Ochrana údajů",
  },
  {
    id: 3,
    title: "Reklamační řád",
    description: "Podmínky a postupy pro uplatnění reklamací zboží a služeb",
    icon: AlertTriangle,
    fileSize: "156 KB",
    lastUpdated: "4. 7. 2025",
    downloadUrl: "/documents/reklamacni-rad.pdf",
    category: "Reklamace",
  },
  {
    id: 4,
    title: "Podmínky vrácení zboží e-shopu",
    description:
      "Specifické podmínky pro vrácení zboží zakoupeného v online obchodě",
    icon: CreditCard,
    fileSize: "134 KB",
    lastUpdated: "4. 7. 2025",
    downloadUrl: "/documents/vraceni-zbozi.pdf",
    category: "E-shop",
  },
  {
    id: 5,
    title: "Podmínky digitálního obsahu",
    description:
      "Licenční podmínky a omezení pro digitální produkty (e-knihy, kurzy)",
    icon: Download,
    fileSize: "167 KB",
    lastUpdated: "4. 7. 2025",
    downloadUrl: "/documents/digitalni-obsah.pdf",
    category: "Digitální produkty",
  },
  {
    id: 6,
    title: "Informace o cookies",
    description:
      "Informace o používání cookies a podobných technologií na našich stránkách",
    icon: Eye,
    fileSize: "98 KB",
    lastUpdated: "4. 7. 2025",
    downloadUrl: "/documents/cookies.pdf",
    category: "Technické",
  },
  {
    id: 7,
    title: "Podmínky kontinuálních služeb",
    description: "Speciální podmínky pro pravidelné a dlouhodobé služby",
    icon: Users,
    fileSize: "178 KB",
    lastUpdated: "4. 7. 2025",
    downloadUrl: "/documents/kontinualni-sluzby.pdf",
    category: "Služby",
  },
  {
    id: 8,
    title: "Formulář pro odstoupení od smlouvy",
    description:
      "Vzorový formulář pro odstoupení od smlouvy dle občanského zákoníku",
    icon: Scale,
    fileSize: "87 KB",
    lastUpdated: "4. 7. 2025",
    downloadUrl: "/documents/odstoupeni-formular.pdf",
    category: "Formuláře",
  },
  {
    id: 9,
    title: "Reklamační formulář",
    description:
      "Podrobné informace o ochraně osobních údajů našich klientů a pacientů",
    icon: Shield,
    fileSize: "202 KB",
    lastUpdated: "9. 4. 2025",
    downloadUrl: "/documents/ochrana-osobnich-udaju.pdf",
    category: "Formuláře",
  },
];

const categories = [...new Set(legalDocuments.map((doc) => doc.category))];

export default function LegalDocumentsPage() {
  const handleDownload = (downloadUrl: string, title: string) => {
    // In a real implementation, this would trigger the actual download
    console.log(`Downloading: ${title} from ${downloadUrl}`);
    // You can implement actual file serving logic here
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 px-6 py-2 rounded-full">
            <span className="text-primary font-medium text-sm">
              PRÁVNÍ DOKUMENTY
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-center mb-6">
          Právní dokumenty ke stažení
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Zde najdete všechny důležité právní dokumenty týkající se našich
          služeb a e-shopu. Všechny dokumenty jsou k dispozici ke stažení ve
          formátu PDF.
        </p>

        {/* Company Info */}
        <div className="border-l-4 border-primary bg-white rounded-r-xl p-6 mb-12 shadow-sm">
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
              {/* <span className="hidden sm:block text-gray-300">|</span> */}
              {/* <span className="text-sm text-gray-600">+420 773 179 628</span> */}
            </div>
          </div>
        </div>

        {/* Documents by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-medium mb-6 pb-2 border-b border-gray-200">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {legalDocuments
                .filter((doc) => doc.category === category)
                .map((document) => {
                  const IconComponent = document.icon;
                  return (
                    <div
                      key={document.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-lg mb-2">
                            {document.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {document.description}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span>Velikost: {document.fileSize}</span>
                            <span>Aktualizováno: {document.lastUpdated}</span>
                          </div>

                          <Button
                            onClick={() =>
                              handleDownload(
                                document.downloadUrl,
                                document.title
                              )
                            }
                            className="w-full"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Stáhnout PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

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
              • Pro zobrazení PDF souborů potřebujete Adobe Reader nebo podobný
              program
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
            <Button onClick={() => (window.location.href = "/contact")}>
              Kontaktovat nás
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "mailto:info@medifree.cz")}
            >
              Napsat email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
