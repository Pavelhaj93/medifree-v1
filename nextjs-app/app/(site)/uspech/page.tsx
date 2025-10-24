import { Suspense } from "react";

import type { Metadata } from "next";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export const metadata: Metadata = {
  title: "Úspěšná platba | Medifree",
  description:
    "Děkujeme za váš nákup. Vaše objednávka byla úspěšně zpracována.",
};

export default function SuccessPage() {
  return <CheckoutSuccessContent />;
}
