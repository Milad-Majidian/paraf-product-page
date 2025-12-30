/**
 * Skeleton loader for ProductCard component
 * Displays placeholder UI while products are loading
 */
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-bg-surface flex flex-col gap-2">
      {/* Header skeleton */}
      <div className="flex justify-between mb-2">
        <div className="flex gap-1 items-center">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex gap-1 items-center">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="w-4 h-4" />
        </div>
      </div>

      {/* Image skeleton */}
      <div className="flex justify-center items-center">
        <Skeleton className="w-39.5 h-50" />
      </div>

      {/* Title skeleton */}
      <div className="my-3 space-y-2">
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>

      {/* Badges skeleton */}
      <div className="flex flex-col justify-center items-between gap-3 p-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-16 rounded-2xl" />
          <Skeleton className="h-6 w-20 rounded-2xl" />
        </div>

        {/* Price skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
}
