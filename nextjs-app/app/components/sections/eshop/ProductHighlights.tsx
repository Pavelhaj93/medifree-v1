import { Ban, Check } from "lucide-react";

type Audience = { _key: string; title?: string | null; text?: string | null };
type Benefit = { _key: string; highlight?: string | null; title?: string | null; text?: string | null };

const card = "bg-white rounded-2xl shadow-md p-6 lg:p-10 flex flex-col gap-5";

export default function ProductHighlights({
  forWhom,
  notSuitableFor,
  benefits,
}: {
  forWhom?: Audience[] | null;
  notSuitableFor?: string | null;
  benefits?: Benefit[] | null;
}) {
  const hasForWhom = !!forWhom?.length;
  const hasBenefits = !!benefits?.length;
  if (!hasForWhom && !hasBenefits) return null;

  return (
    <div className={`mt-8 grid gap-6 ${hasForWhom && hasBenefits ? "lg:grid-cols-2" : ""}`}>
      {hasForWhom && (
        <section className={card} aria-labelledby="for-whom">
          <h2 id="for-whom" className="text-2xl font-medium">
            Pro koho to je
          </h2>
          <ul className="flex flex-col gap-3.5">
            {forWhom!.map((item) => (
              <li key={item._key} className="flex gap-3 text-gray-700 leading-relaxed">
                <span
                  aria-hidden
                  className="-mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <span>
                  {item.title && <strong className="font-semibold text-gray-900">{item.title}</strong>}{" "}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
          {notSuitableFor && (
            <p className="mt-auto flex gap-2 border-t border-gray-200 pt-4 text-sm text-gray-600 leading-relaxed">
              <Ban className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>
                <strong className="font-semibold text-gray-900">Není vhodné</strong> {notSuitableFor}
              </span>
            </p>
          )}
        </section>
      )}

      {hasBenefits && (
        <section className={card} aria-labelledby="benefits">
          <h2 id="benefits" className="text-2xl font-medium">
            Co získáte
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits!.map((b) => (
              <li key={b._key} className="flex flex-col gap-1.5 rounded-xl bg-secondary/30 p-4">
                {b.highlight && <span className="text-2xl font-bold leading-tight text-primary">{b.highlight}</span>}
                {b.title && <span className="font-medium text-gray-900">{b.title}</span>}
                {b.text && <span className="text-sm leading-snug text-gray-700">{b.text}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
