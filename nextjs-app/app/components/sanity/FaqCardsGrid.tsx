import {
  AllFaqsQueryResult,
  FaqCardsGrid as FaqCardsGridProps,
} from "@/sanity.types";

type FaqCardsGridBlockProps = {
  title?: string;
  faqs?: AllFaqsQueryResult;
};

const FaqCardsGrid = ({ block }: { block: FaqCardsGridBlockProps }) => {
  const { faqs } = block ?? {};

  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-10 text-center">
        {/* {title && <h2>{title}</h2>} */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto">
          {/* FAQ Item */}
          {faqs?.map((item: AllFaqsQueryResult[number]) => (
            <div key={item._id} className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-medium mb-4">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqCardsGrid;
