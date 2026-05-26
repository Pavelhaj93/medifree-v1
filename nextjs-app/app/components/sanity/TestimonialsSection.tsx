type Testimonial = {
  _key?: string;
  name: string;
  role?: string;
  text: string;
};

type TestimonialsSectionBlock = {
  title?: string;
  testimonials?: Testimonial[];
};

export default function TestimonialsSection({
  block,
}: {
  block: TestimonialsSectionBlock;
}) {
  const { title = "Co říkají naši klienti", testimonials = [] } = block;

  if (!testimonials.length) return null;

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 md:px-10">
        {title && (
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
            {title}
          </h2>
        )}
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={t._key ?? i}
              className="break-inside-avoid bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-white/50 p-6 md:p-8 relative"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-linear-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 pt-2">
                {t.text}
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-green-400 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  {t.role && <p className="text-xs text-gray-500">{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
