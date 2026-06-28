import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30",
        secondary:
          "border border-stone-700 bg-stone-900 text-white hover:border-green-500 hover:bg-stone-800",
        destructive:
          "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30",
        outline:
          "border border-stone-700 bg-transparent text-stone-300 hover:bg-stone-800",
        ghost: "bg-transparent hover:bg-stone-800 text-stone-300",
      },
      size: {
        default: "h-auto px-6 py-3",
        sm: "h-9 rounded-lg px-3 text-sm py-1.5",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = ({ children, variant, size, className, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
