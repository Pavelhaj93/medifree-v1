"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { ChevronDown } from "lucide-react";
import CustomPortableText from "../../sanity/PortableText";

type NutritionRow = { _key: string; label?: string | null; per100?: string | null; perServing?: string | null };

export type FoodInfo = {
  enabled?: boolean | null;
  isSupplement?: boolean | null;
  ingredients?: PortableTextBlock[] | null;
  allergens?: string | null;
  servingSize?: string | null;
  nutrition?: NutritionRow[] | null;
  usage?: string | null;
  storage?: string | null;
  producer?: string | null;
  bestBefore?: string | null;
  origin?: string | null;
} | null;

function NutritionTable({
  rows,
  servingSize,
  variantLabel,
}: {
  rows: NutritionRow[];
  servingSize?: string | null;
  variantLabel?: string | null;
}) {
  const hasServing = rows.some((r) => r.perServing);
  const cell = "py-2.5 tabular-nums text-right sm:whitespace-nowrap border-b border-gray-200";
  return (
    <table className="w-full max-w-2xl border-collapse text-sm sm:text-base">
      <caption className="pb-3 text-left text-sm text-gray-600">
        Průměrné výživové hodnoty{variantLabel ? ` · ${variantLabel}` : ""}
      </caption>
      <thead>
        <tr className="text-[13px] text-gray-600">
          <th scope="col" className="py-2.5 pr-2 text-left font-medium border-b border-gray-300">
            Výživové údaje
          </th>
          <th scope="col" className="py-2.5 px-2 text-right font-medium border-b border-gray-300 sm:whitespace-nowrap">
            na 100 g
          </th>
          {hasServing && (
            <th scope="col" className="py-2.5 pl-2 text-right font-medium border-b border-gray-300">
              na porci{servingSize ? ` (${servingSize})` : ""}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const sub = row.label?.startsWith("z toho");
          return (
            <tr key={row._key}>
              <th
                scope="row"
                className={`py-2.5 pr-2 text-left border-b border-gray-200 ${sub ? "pl-4 font-normal text-gray-600" : "font-medium"}`}
              >
                {row.label}
              </th>
              <td className={`${cell} px-2`}>{row.per100 || "–"}</td>
              {hasServing && <td className={`${cell} pl-2`}>{row.perServing || "–"}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function ProductInfoTabs({
  body,
  foodInfo,
  variantLabel,
}: {
  body?: PortableTextBlock[] | null;
  foodInfo?: FoodInfo;
  variantLabel?: string | null;
}) {
  const food = foodInfo?.enabled ? foodInfo : null;
  const tabs: { id: string; title: string; content: ReactNode }[] = [];

  if (body?.length) {
    tabs.push({
      id: "popis",
      title: "Popis",
      content: (
        <div className="prose max-w-[68ch] text-gray-700">
          <CustomPortableText value={body} />
        </div>
      ),
    });
  }
  if (food?.ingredients?.length || food?.allergens) {
    tabs.push({
      id: "slozeni",
      title: "Složení",
      content: (
        <div className="max-w-[68ch] space-y-3 leading-relaxed text-gray-700">
          {food.ingredients?.length ? <PortableText value={food.ingredients} /> : null}
          {food.allergens && <p className="font-medium text-gray-900">{food.allergens}</p>}
          {variantLabel && <p className="text-sm text-gray-600">Platí pro příchuť {variantLabel}.</p>}
        </div>
      ),
    });
  }
  if (food?.nutrition?.some((r) => r.per100)) {
    tabs.push({
      id: "nutricni-hodnoty",
      title: "Nutriční hodnoty",
      content: <NutritionTable rows={food.nutrition} servingSize={food.servingSize} variantLabel={variantLabel} />,
    });
  }
  const usageRows = food
    ? ([
        ["Doporučené dávkování a příprava", food.usage],
        ["Skladování", food.storage],
        ["Výrobce / distributor", food.producer],
        ["Země původu", food.origin],
        ["Minimální trvanlivost", food.bestBefore],
      ].filter(([, v]) => v) as [string, string][])
    : [];
  if (usageRows.length) {
    tabs.push({
      id: "pouziti",
      title: "Použití a skladování",
      content: (
        <dl className="max-w-4xl">
          {usageRows.map(([label, value]) => (
            <div key={label} className="flex flex-wrap gap-x-6 gap-y-1 border-b border-gray-200 py-3">
              <dt className="flex-[0_0_220px] font-medium">{label}</dt>
              <dd className="flex-[1_1_280px] whitespace-pre-line leading-relaxed text-gray-700">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }

  const [active, setActive] = useState(tabs[0]?.id);
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  if (tabs.length === 0) return null;

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent) => {
    const ids = tabs.map((t) => t.id);
    let i = ids.indexOf(active ?? ids[0]);
    if (e.key === "ArrowRight") i = (i + 1) % ids.length;
    else if (e.key === "ArrowLeft") i = (i - 1 + ids.length) % ids.length;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = ids.length - 1;
    else return;
    e.preventDefault();
    setActive(ids[i]);
    tabRefs.current[ids[i]]?.focus();
  };

  return (
    <section className="mt-8 bg-white rounded-2xl shadow-md px-5 py-2 md:p-10" aria-label="Informace o produktu">
      {/* Desktop: tabs */}
      <div className="hidden md:block">
        <div
          role="tablist"
          aria-label="Informace o produktu"
          onKeyDown={onKeyDown}
          className="flex gap-8 overflow-x-auto border-b border-gray-200"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              id={`${baseId}-${tab.id}-tab`}
              role="tab"
              type="button"
              tabIndex={active === tab.id ? 0 : -1}
              aria-selected={active === tab.id}
              aria-controls={`${baseId}-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`-mb-px whitespace-nowrap border-b-2 pb-3.5 text-base cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                active === tab.id
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-gray-600 hover:text-primary"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`${baseId}-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-${tab.id}-tab`}
            hidden={active !== tab.id}
            className="pt-8"
          >
            {tab.content}
          </div>
        ))}
      </div>

      {/* Mobile: accordion, several sections can be open at once */}
      <div className="md:hidden">
        {tabs.map((tab, i) => (
          <details key={tab.id} open={i === 0} className="group border-t border-gray-200 first:border-t-0">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 font-medium">
              {tab.title}
              <ChevronDown
                className="h-5 w-5 text-gray-600 transition-transform group-open:rotate-180 group-open:text-primary"
                aria-hidden
              />
            </summary>
            <div className="pb-5 pt-1">{tab.content}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
