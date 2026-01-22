"use client";

import React from "react";
import { cn } from "@/share/utils/cn";
import { Skeleton as UiSkeleton } from "@/components/ui/skeleton";

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  /** number of text lines when variant === 'text' */
  lines?: number;
  /** number of repeated skeleton blocks */
  count?: number;
  animated?: boolean;
  rounded?: boolean | string;
  gap?: string | number;
}

/**
 * Reusable Skeleton component.
 * - `variant="text"` renders stacked line placeholders (use `lines`).
 * - `variant="rect"` renders a rectangle placeholder.
 * - `variant="circle"` renders a circular placeholder.
 *
 * Accepts `count` to repeat blocks and `animated` to toggle pulse animation.
 */
export default function CustomSkeleton({
  variant = "rect",
  width,
  height,
  lines = 3,
  count = 1,
  animated = true,
  rounded = true,
  gap = 8,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const defaultClasses = "rounded-lg bg-zinc-50";
  // Compose the ui `Skeleton` for consistent styling across the app.
  // Text variant: stack multiple small skeleton lines.
  if (variant === "text") {
    return (
      <div className={cn("flex flex-col", className)} style={style} {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <UiSkeleton
            key={i}
            className={cn(defaultClasses, "w-full")}
            style={{ height: `${Math.max(8, 12 - i)}px`, marginBottom: i < lines - 1 ? `${gap}px` : undefined }}
          />
        ))}
      </div>
    );
  }

  // For rect/circle variants just render `count` UI skeletons with sizing
  return (
    <div className={cn("flex items-center gap-2", className)} style={style} {...rest}>
      {Array.from({ length: count }).map((_, i) => {
        if (variant === "circle") {
          const size = width ?? height ?? 40;
          return (
            <UiSkeleton
              key={i}
              className={cn(defaultClasses)}
              style={{
                width: typeof size === "number" ? `${size}px` : size,
                height: typeof size === "number" ? `${size}px` : size,
                borderRadius: "9999px",
              }}
            />
          );
        }

        // rect
        return (
          <UiSkeleton
            key={i}
            className={cn(defaultClasses)}
            style={{
              width: typeof width === "number" ? `${width}px` : width,
              height: typeof height === "number" ? `${height}px` : height ?? 12,
              borderRadius: typeof rounded === "string" ? rounded : 6,
            }}
          />
        );
      })}
    </div>
  );
}

export { CustomSkeleton as Skeleton };
