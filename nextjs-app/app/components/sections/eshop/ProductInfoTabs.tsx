"use client";

import { useId, useState, type ReactNode } from "react";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { Info } from "lucide-react";
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
  origin?: string | null;
} | null;

const SUPPLEMENT_NOTICE =
  "Doplněk stravy. Nepřekračujte doporučenou denní dávku. Doplněk stravy není náhradou pestré a vyvážené stravy. Uchovávejte mimo dosah dětí.";

function NutritionTable({ rows, servingSize }: { rows: NutritionRow[]; servingSize?: string | null }) {
  const hasServing = rows.some((r) => r.perServing);
  return (
    <div className="overflow-x-auto">
      <table className="w-full max-w-xl text-sm">
        <caption className="sr-only">Nutriční hodnoty</caption>
        <thead>
          <tr className="border-b border-gray-200 text-left">
            <th scope="col" className="py-2 pr-3 font-medium">Výživové údaje</th>
            <th scope="col" className="py-2 pr-3 font-medium sm:whitespace-nowrap">na 100 g</th>
            {hasServing && (
              <th scope="col" className="py-2 font-medium sm:whitespace-nowrap">
                na porci{servingSize ? ` (${servingSize})` : ""}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const sub = row.label?.startsWith("z toho");
            return (
              <tr key={row._key} className="border-b border-gray-100">
                <th scope="row" className={`py-2 pr-3 text-left font-normal ${sub ? "pl-3 text-gray-600" : ""}`}>
                  {row.label}
                </th>
                <td className="py-2 pr-3 tabular-nums sm:whitespace-nowrap">{row.per100 || "–"}</td>
                {hasServing && <td className="py-2 tabular-nums sm:whitespace-nowrap">{row.perServing || "–"}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-medium">{label}</dt>
      <dd className="text-gray-700 whitespace-pre-line">{children}</dd>
    </div>
  );
}

export default function ProductInfoTabs({
  body,
  foodInfo,
}: {
  body?: PortableTextBlock[] | null;
  foodInfo?: FoodInfo;
}) {
  const food = foodInfo?.enabled ? foodInfo : null;
  const tabs: { id: string; title: string; content: ReactNode }[] = [];

  if (body?.length) {
    tabs.push({
      id: "popis",
      title: "Popis",
      content: (
        <div className="prose max-w-3xl">
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
        <div className="max-w-3xl space-y-3 text-gray-700">
          {food.ingredients?.length ? <PortableText value={food.ingredients} /> : null}
          {food.allergens && <p className="font-medium text-gray-900">{food.allergens}</p>}
        </div>
      ),
    });
  }
  if (food?.nutrition?.some((r) => r.per100)) {
    tabs.push({
      id: "nutricni-hodnoty",
      title: "Nutriční hodnoty",
      content: <NutritionTable rows={food.nutrition} servingSize={food.servingSize} />,
    });
  }
  if (food && (food.usage || food.storage || food.producer || food.origin)) {
    tabs.push({
      id: "pouziti",
      title: "Použití a skladování",
      content: (
        <dl className="max-w-3xl space-y-4">
          {food.usage && <Detail label="Doporučené dávkování a příprava">{food.usage}</Detail>}
          {food.storage && <Detail label="Skladování">{food.storage}</Detail>}
          {food.producer && <Detail label="Výrobce / distributor">{food.producer}</Detail>}
          {food.origin && <Detail label="Země původu">{food.origin}</Detail>}
        </dl>
      ),
    });
  }

  const [active, setActive] = useState(tabs[0]?.id);
  const baseId = useId();
  if (tabs.length === 0) return null;

  const notice = food?.isSupplement ? (
    <p className="mt-6 flex gap-2 rounded-xl bg-secondary/30 p-4 text-sm text-gray-800">
      <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" aria-hidden />
      {SUPPLEMENT_NOTICE}
    </p>
  ) : null;

  return (
    <section className="mt-8 bg-white rounded-2xl shadow-md p-6 lg:p-10" aria-label="Informace o produktu">
      {/* Desktop: tabs */}
      <div className="hidden md:block">
        <div role="tablist" className="flex gap-2 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`${baseId}-${tab.id}-tab`}
              role="tab"
              type="button"
              aria-selected={active === tab.id}
              aria-controls={`${baseId}-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`min-h-11 px-4 -mb-px border-b-2 text-sm font-medium cursor-pointer transition-colors ${
                active === tab.id
                  ? "border-primary text-primary"
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
          >
            {tab.content}
          </div>
        ))}
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden divide-y divide-gray-200">
        {tabs.map((tab, i) => (
          <details key={tab.id} open={i === 0} className="group py-2">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-medium">
              {tab.title}
              <span className="text-primary transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <div className="pb-4 pt-2">{tab.content}</div>
          </details>
        ))}
      </div>

      {notice}
    </section>
  );
}
