// src/components/TestimonialSection.tsx
export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Jana Nováková",
      text: "Díky Medifree se cítím lépe než kdy dřív!",
    },
    { name: "Petr Svoboda", text: "Profesionální přístup a skvělé výsledky." },
  ];

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Reference</h2>
        <div className="space-y-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-100 p-6 rounded-lg">
              <p className="italic mb-4">“{t.text}”</p>
              <div className="text-right font-semibold">— {t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
