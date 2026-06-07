"use client";

import { useState } from "react";
import FreeResourceCard from "./FreeResourceCard";

type FreeResource = {
  _id: string;
  title: string;
  category: string;
  description?: string;
  thumbnail?: { asset?: unknown; alt?: string; _type?: string };
  file?: { asset?: { url?: string; originalFilename?: string; mimeType?: string } };
  embedUrl?: string;
};

const FILTER_TABS = [
  { label: "Vše", value: "all" },
  { label: "Video přednášky", value: "video" },
  { label: "Audionahrávky", value: "audio" },
  { label: "Dokumenty", value: "dokument" },
];

type FreeResourcesGridProps = {
  resources: FreeResource[];
  heading?: string;
  subheading?: string;
};

export default function FreeResourcesGrid({
  resources,
  heading,
  subheading,
}: FreeResourcesGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? resources
      : resources.filter((r) => r.category === activeFilter);

  const availableCategories = new Set(resources.map((r) => r.category));
  const visibleTabs = FILTER_TABS.filter(
    (t) => t.value === "all" || availableCategories.has(t.value)
  );

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {(heading || subheading) && (
          <div className="text-center mb-10">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subheading}</p>
            )}
          </div>
        )}

        {/* Filter tabs */}
        {visibleTabs.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {visibleTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveFilter(tab.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeFilter === tab.value
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">
            Žádné materiály v této kategorii.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => (
              <FreeResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
