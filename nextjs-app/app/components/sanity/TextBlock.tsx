import React from "react";
import CustomPortableText from "./PortableText";
import { PortableTextBlock } from "next-sanity";
import { TextBlock as TextBlockProps } from "@/sanity.types";

const TextBlock = ({ block }: { block: TextBlockProps }) => {
  const { title, body } = block ?? {};
  return (
    <section className="bg-gray-50 py-8 md:py-16 min-h-150">
      <div className="container mx-auto my-10 px-4 opacity-0 animate-fade-in-up">
        <div className="prose max-w-none">
          {title && <h2>{title}</h2>}
          {body && <CustomPortableText value={body as PortableTextBlock[]} />}
        </div>
      </div>
    </section>
  );
};

export default TextBlock;
