"use client";

import { AllLegalDocumentsQueryResult, LegalDocument } from "@/sanity.types";
import {
  Cookie,
  CreditCard,
  Download,
  FileText,
  Shield,
  User,
} from "lucide-react";
import { Button } from "../../ui/Button";

const DocumentCategoriesMap = ({
  legalDocuments,
}: {
  legalDocuments: AllLegalDocumentsQueryResult;
}) => {
  const mergedDocumentsIntoCategories = () => {
    const categoriesSet = new Set<string>();
    legalDocuments.forEach((doc) => categoriesSet.add(doc.category));
    return Array.from(categoriesSet);
  };

  const categories = mergedDocumentsIntoCategories();

  const iconsMap: Record<LegalDocument["category"], React.ElementType> = {
    "Obchodní podmínky": FileText,
    Cookies: Cookie,
    "Další dokumenty": FileText,
    "E-shop": CreditCard,
    "Ochrana osobních údajů (GDPR)": Shield,
    "Pobytové služby": User,
  };

  const toLocaleStringDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-medium mb-6 pb-2 border-b border-gray-200">
            {category}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {legalDocuments
              .filter((doc) => doc.category === category)
              .map((document) => {
                const IconComponent = iconsMap[document.category] || FileText;
                const fileUrl = document.file?.asset?.url;
                return (
                  <div
                    key={document._id}
                    className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-md transition-shadow"
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
                          {/* <span>Velikost: {document.fileSize}</span> */}
                          <span>
                            Aktualizováno:{" "}
                            {toLocaleStringDate(document._updatedAt)}
                          </span>
                        </div>

                        {fileUrl && (
                          <div className="flex gap-3">
                            <Button asChild className="flex-1">
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Zobrazit PDF
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentCategoriesMap;
