import Link from "next/link";
import { Button } from "../ui/Button";
import { CalendarClock } from "lucide-react";
import { cn } from "../../lib/utils";

export const BOOKING_URL = "https://cal.com/medifree";

type BookButtonProps = React.ComponentProps<typeof Button>;

export function BookButton({ className, ...props }: BookButtonProps) {
  return (
    <Button asChild variant="primary" className={cn("", className)} {...props}>
      <Link
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CalendarClock className="inline mr-2" />
        Rezervace
      </Link>
    </Button>
  );
}
