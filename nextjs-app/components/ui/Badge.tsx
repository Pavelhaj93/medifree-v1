import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../app/lib/utils";

const badgeVariants = cva(
  "bg-white inline-flex items-center shadow rounded-full text-xs font-semibold tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        primary: "text-primary",
        // secondary:
        //   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        tertiary: "text-tertiary ",
        // destructive:
        //   "bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        // outline: "text-foreground",
        success: "bg-green-400",
      },
      size: {
        default: "text-xs px-4 py-1.5  uppercase",
        sm: "text-xs px-2 py-1 tracking-normal",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
