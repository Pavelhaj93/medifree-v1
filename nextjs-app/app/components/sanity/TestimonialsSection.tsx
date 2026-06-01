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

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 flex flex-col min-w-[500px] max-w-[500px] shrink-0">
      <StarRating />
      <p className="text-gray-600 leading-relaxed italic">
        &ldquo;{t.text}&rdquo;{" "}
        <span className="not-italic text-gray-500 text-sm">
          &mdash; <strong className="text-gray-800">{t.name}</strong>
          {t.role && <span>, {t.role}</span>}
        </span>
      </p>
    </div>
  );
}

export default function TestimonialsSection({
  block,
}: {
  block: TestimonialsSectionBlock;
}) {
  const { title = "Co říkají naši klienti", testimonials = [] } = block;

  if (!testimonials.length) return null;

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 mb-12 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 rounded-full px-4 py-1 mb-4">
          Reference
        </span>
        {title && (
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900">
            {title}
          </h2>
        )}
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-marquee w-max">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t._key ?? t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
