import { CalendarSection as CalendarSectionComponent } from "@/app/components/sections/homepage/CalendarSection";

type CalendarSectionProps = {
  block: {
    _type: string;
    _key: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    description?: any; // blockContent
    backgroundColor?: string;
    showBookButton?: boolean;
  };
};

export default function CalendarSection({ block }: CalendarSectionProps) {
  const { backgroundColor = "bg-white" } = block;

  return (
    <div className={backgroundColor}>
      <CalendarSectionComponent />
    </div>
  );
}
