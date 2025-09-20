import Link from "next/link";
import { Button } from "../ui/Button";
import { CalendarClock } from "lucide-react";
import { cn } from "../../lib/utils";

type BookButtonProps = React.ComponentProps<typeof Button>;

export function BookButton({ className, ...props }: BookButtonProps) {
  return (
    <Button asChild variant="primary" className={cn("", className)} {...props}>
      <Link href="https://cal.com/medifree">
        <CalendarClock />
        Rezervace
      </Link>
    </Button>
  );
}
