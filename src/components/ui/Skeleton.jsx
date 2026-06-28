import { cn } from "../../utils/cn";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-stone-800/50", className)}
      {...props}
    />
  );
};

export { Skeleton };
