"use client";

import DocumentCategoriesMap from "@/app/components/sections/legalDocuments/DocumentCategoriesMap";
import { Button } from "@/app/components/ui/Button";

type LegalDocumentsSectionBlockProps = {
  companyName?: string;
  companyDetails?: string;
  companyEmail?: string;
  noticeTitle?: string;
  noticeItems?: string[];
  contactTitle?: string;
  contactDescription?: string;
  contactButtonText?: string;
  legalDocuments?: any[];
};

export default function LegalDocumentsSection({
  block,
}: {
  block?: LegalDocumentsSectionBlockProps;
}) {
  const {
    companyName = "Medifree s.r.o.",
    companyDetails = "IČO: 23153041 • Na Kotli 1176/29, Hradec Králové",
    companyEmail = "info@medifree.cz",
    noticeTitle = "Důležité informace",
    noticeItems = [
      "Všechny dokumenty jsou platné od data uvedeného v každém dokumentu",
      "V případě nejasností nás kontaktujte na",
      "Dokumenty jsou pravidelně aktualizovány dle platné legislativy",
      "Pro zobrazení staženého dokumentu je potřeba mít nainstalovaný PDF prohlížeč (např. Adobe Acrobat Reader)",
    ],
    contactTitle = "Potřebujete pomoc?",
    contactDescription = "Máte-li jakékoliv dotazy k právním dokumentům nebo potřebujete vysvětlení, neváhejte nás kontaktovat.",
    contactButtonText = "Kontaktujte nás",
    legalDocuments = [],
  } = block ?? {};

  return (
    <>
      {/* Company Info */}
      <section className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-10">
          <div className="border-l-4 border-primary bg-white rounded-r-xl p-6 mb-12 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-medium mb-4">
                  {companyName}
                </h2>
                <p className="text-sm text-gray-600">{companyDetails}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${companyEmail}`}
                  className="text-md text-primary hover:underline flex items-center"
                >
                  {companyEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Documents by Category */}
          <DocumentCategoriesMap legalDocuments={legalDocuments} />

          {/* Important Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <h3 className="font-medium text-lg mb-2">{noticeTitle}</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {noticeItems.map((item, index) => (
                <li key={index}>
                  • {item}
                  {index === 1 && (
                    <>
                      {" "}
                      <a
                        href={`mailto:${companyEmail}`}
                        className="text-primary hover:underline"
                      >
                        {companyEmail}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-10 text-center">
          <h4 className="text-3xl md:text-4xl font-medium mb-4">
            {contactTitle}
          </h4>
          <p className="text-gray-600 mb-6">{contactDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="/kontakt">{contactButtonText}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
