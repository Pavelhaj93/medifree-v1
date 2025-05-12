import { cn } from "@/app/lib/utils";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("px-4 md:px-10 py-16 md:py-32", className)}>
      {children}
    </section>
  );
};

export default Section;
