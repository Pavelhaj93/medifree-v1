import Link from "next/link";

type Variant = {
  _id: string;
  variantLabel: string | null;
  slug: string | null;
  isAvailable: boolean | null;
};

// Each flavor is its own product, so switching flavors is just navigating to its detail page.
export default function VariantSwitcher({
  variants,
  currentId,
  label = "Příchuť",
}: {
  variants: Variant[];
  currentId: string;
  label?: string;
}) {
  if (variants.length < 2) return null;

  return (
    <div className="mb-6">
      <p className="text-sm font-medium mb-2">{label}</p>
      <ul className="flex flex-wrap gap-2" aria-label={label}>
        {variants.map((v) => {
          const name = v.variantLabel ?? "Varianta";
          const base =
            "inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors";

          if (v._id === currentId) {
            return (
              <li key={v._id}>
                <span aria-current="true" className={`${base} border-primary bg-primary text-white`}>
                  {name}
                </span>
              </li>
            );
          }
          if (v.isAvailable === false || !v.slug) {
            return (
              <li key={v._id}>
                <span
                  className={`${base} border-gray-200 text-gray-400 line-through cursor-not-allowed`}
                  title="Momentálně nedostupné"
                >
                  {name}
                  <span className="sr-only"> – momentálně nedostupné</span>
                </span>
              </li>
            );
          }
          return (
            <li key={v._id}>
              <Link
                href={`/e-shop/${v.slug}`}
                scroll={false}
                className={`${base} border-gray-300 text-gray-800 hover:border-primary hover:text-primary focus-visible:outline-primary`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
