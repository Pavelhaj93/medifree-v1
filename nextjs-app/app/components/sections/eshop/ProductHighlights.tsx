import { Check, Users } from "lucide-react";

export default function ProductHighlights({
  forWhom,
  benefits,
}: {
  forWhom?: string[] | null;
  benefits?: string[] | null;
}) {
  const sections = [
    { title: "Pro koho to je", items: forWhom ?? [], Icon: Users },
    { title: "Co získáte", items: benefits ?? [], Icon: Check },
  ].filter((s) => s.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <div className={`mt-8 grid gap-6 ${sections.length > 1 ? "md:grid-cols-2" : ""}`}>
      {sections.map(({ title, items, Icon }) => (
        <section key={title} className="bg-white rounded-2xl shadow-md p-6 lg:p-8">
          <h2 className="text-xl font-medium mb-4">{title}</h2>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/50 text-primary">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
