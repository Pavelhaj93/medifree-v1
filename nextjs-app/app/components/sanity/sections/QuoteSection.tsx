type QuoteSectionProps = {
  block: {
    _type: string;
    _key: string;
    quote?: string;
    author?: string;
    backgroundColor?: string;
  };
};

export default function QuoteSection({ block }: QuoteSectionProps) {
  const {
    quote = "Naše tělo je naším vlastním lékařem. To nejlepší, co můžeme udělat, je umožnit mu pustit se do práce.",
    author,
    backgroundColor = "bg-gray-50",
  } = block;

  return (
    <section className={`text-center ${backgroundColor} py-8 md:py-16`}>
      <div className="container mx-auto px-4 md:px-10">
        <p className="text-xl md:text-4xl max-w-4xl mx-auto leading-relaxed">
          &quot;{quote}&quot;
        </p>
        {author && (
          <p className="text-lg md:text-xl mt-4 text-gray-600">— {author}</p>
        )}
      </div>
    </section>
  );
}
