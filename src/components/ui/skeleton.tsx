import { cn } from "@/share/utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-border-primary/60",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
