export default function FeatureSection() {
  const features = [
    {
      title: "Monitorace cukru",
      description: "Nepřetržité sledování hladiny.",
    },
    { title: "Vyšetření krve", description: "Analýza a doporučení." },
    { title: "Monitorace spánku", description: "Detailní přehled spánku." },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Co nabízíme</h2>
        <div className="grid gap-12 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
