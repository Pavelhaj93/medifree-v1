import "@/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Toaster } from "@/app/components/ui/Sonner";

import DraftModeToast from "@/app/components/sanity/DraftModeToast";
import { toPlainText, VisualEditing } from "next-sanity";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { settingsQuery } from "@/sanity/lib/queries";
import * as demo from "@/sanity/lib/demo";
import { handleError } from "../client-utils";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-white">{children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
