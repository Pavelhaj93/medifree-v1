import {
  AllFaqsQueryResult,
  FaqAccordion as SanityFaqAccordion,
} from "@/sanity.types";
import React from "react";
import { Badge } from "../ui/Badge";
import AccordionFAQSection from "../sections/contact/AccordionFAQSection";

type FaqAccordionProps = {
  faqs: AllFaqsQueryResult;
  badgeText?: SanityFaqAccordion["badgeText"];
  title?: SanityFaqAccordion["title"];
};
const FaqAccordion = ({ block }: { block: FaqAccordionProps }) => {
  const { faqs, badgeText, title } = block ?? {};
  return (
    <section className="py-8 md:py-16 ">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex justify-center mb-8 opacity-0 animate-fade-in">
          <Badge variant="primary">{badgeText}</Badge>
        </div>
        <h2 className="text-3xl font-medium mb-12 text-center opacity-0 animate-fade-in-up animation-delay-200">
          {title}
        </h2>

        <div className="max-w-3xl mx-auto opacity-0 animate-fade-in-up animation-delay-400">
          <AccordionFAQSection faqItems={faqs} />
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
