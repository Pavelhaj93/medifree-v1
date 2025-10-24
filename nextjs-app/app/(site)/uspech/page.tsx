import { Suspense } from "react";

import type { Metadata } from "next";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export const metadata: Metadata = {
  title: "Úspěšná platba | Medifree",
  description:
    "Děkujeme za váš nákup. Vaše objednávka byla úspěšně zpracována.",
};

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100dvh-14.5rem)] bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
