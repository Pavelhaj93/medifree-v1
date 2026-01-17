import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { iconMap } from "@/app/components/sanity/iconMap";

type CtaBlock = {
  title?: string;
  subtitle?: string;
  button?: {
    text?: string;
    link?: string;
    icon?: string;
  };
};

type CtaProps = {
  block: CtaBlock;
  index: number;
};

export default function CTA({ block }: CtaProps) {
  const ButtonIcon = block.button?.icon
    ? iconMap[block.button.icon]
    : undefined;

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-10 py-8 md:py-16">
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center opacity-0 animate-fade-in-up transition-all duration-200">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
            {block.title}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90 text-white">
            {block.subtitle}
          </p>
          {block.button?.link && block.button?.text && (
            <Button variant="secondary" asChild>
              <Link
                href={block.button.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {block.button.text}
                {ButtonIcon && <ButtonIcon className="inline ml-2" />}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
