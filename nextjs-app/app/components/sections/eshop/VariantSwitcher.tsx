import Link from "next/link";
import { packGrams } from "@/app/lib/shop/variants";

export type Variant = {
  _id: string;
  variantLabel: string | null;
  variantColor?: string | null;
  packLabel?: string | null;
  slug: string | null;
  isAvailable: boolean | null;
};

const czech = new Intl.Collator("cs");

const pill =
  "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function Dot({ color, faded }: { color?: string | null; faded?: boolean }) {
  if (!color) return null;
  return (
    <span
      aria-hidden
      className={`h-3 w-3 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] ${faded ? "opacity-40" : ""}`}
      style={{ background: color }}
    />
  );
}

/**
 * Every flavor × pack combination is its own product in one flavor group, so switching is
 * navigating to another product page. Switching flavor keeps the selected pack when it exists.
 */
export default function VariantSwitcher({ variants, current }: { variants: Variant[]; current: Variant }) {
  if (variants.length < 2) return null;

  const flavorNames = Array.from(new Set(variants.map((v) => v.variantLabel ?? ""))).sort(czech.compare);
  const flavors = flavorNames.map((name) => {
    const options = variants.filter((v) => (v.variantLabel ?? "") === name);
    const target =
      options.find((v) => v.packLabel === current.packLabel) ??
      options.find((v) => v.isAvailable !== false) ??
      options[0];
    return { name, target, color: options.find((v) => v.variantColor)?.variantColor };
  });

  const packs = variants
    .filter((v) => (v.variantLabel ?? "") === (current.variantLabel ?? "") && v.packLabel)
    .sort((a, b) => packGrams(a.packLabel) - packGrams(b.packLabel));

  return (
    <div className="mb-6 space-y-5">
      {flavors.length > 1 && (
        <div role="group" aria-labelledby="flavor-label">
          <p id="flavor-label" className="text-sm text-gray-600 mb-2.5">
            Příchuť: <span className="font-medium text-gray-900">{current.variantLabel}</span>
          </p>
          <ul className="flex flex-wrap gap-2">
            {flavors.map(({ name, target, color }) => {
              if (target._id === current._id) {
                return (
                  <li key={name}>
                    <span aria-current="true" className={`${pill} bg-primary text-white`}>
                      <Dot color={color} />
                      {name}
                    </span>
                  </li>
                );
              }
              if (target.isAvailable === false || !target.slug) {
                return (
                  <li key={name} className="group relative">
                    <span
                      tabIndex={0}
                      aria-disabled="true"
                      className={`${pill} bg-white text-gray-500 line-through shadow-[inset_0_0_0_1px_#d1d5db] cursor-not-allowed`}
                    >
                      <Dot color={color} faded />
                      {name}
                      <span className="sr-only"> – vyprodáno</span>
                    </span>
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs text-white group-hover:block group-focus-within:block"
                    >
                      Momentálně nedostupné
                    </span>
                  </li>
                );
              }
              return (
                <li key={name}>
                  <Link
                    href={`/e-shop/${target.slug}`}
                    scroll={false}
                    className={`${pill} bg-white text-gray-900 shadow-[inset_0_0_0_1px_#034c4c] hover:bg-secondary`}
                  >
                    <Dot color={color} />
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {packs.length > 1 && (
        <div role="group" aria-labelledby="pack-label">
          <p id="pack-label" className="text-sm text-gray-600 mb-2.5">
            Balení
          </p>
          <ul className="flex flex-wrap gap-2">
            {packs.map((v) =>
              v._id === current._id ? (
                <li key={v._id}>
                  <span aria-current="true" className={`${pill} px-5 bg-primary text-white`}>
                    {v.packLabel}
                  </span>
                </li>
              ) : (
                <li key={v._id}>
                  <Link
                    href={`/e-shop/${v.slug}`}
                    scroll={false}
                    className={`${pill} px-5 bg-white text-gray-900 shadow-[inset_0_0_0_1px_#034c4c] hover:bg-secondary ${
                      v.isAvailable === false ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {v.packLabel}
                    {v.isAvailable === false && <span className="sr-only"> – vyprodáno</span>}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
