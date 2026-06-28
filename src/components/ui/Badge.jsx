import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-orange-500/10 border border-orange-500/20 text-orange-500",
        success: "bg-green-500/10 border border-green-500/20 text-green-500",
        destructive: "bg-red-500/10 border border-red-500/20 text-red-500",
        outline: "text-stone-300 border border-stone-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Badge = ({ children, variant, className, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
};

export default Badge;
