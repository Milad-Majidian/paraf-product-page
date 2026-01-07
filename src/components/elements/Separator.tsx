import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/share/utils/cn"

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  className?: string
  variant?: "default" | "dashed" | "dotted" | "gradient"
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
  thickness?: "thin" | "normal" | "thick"
}

const spacingMap = {
  none: "my-0",
  sm: "my-2",
  md: "my-4",
  lg: "my-6",
  xl: "my-8",
}

const thicknessMap = {
  thin: "h-[1px] data-[orientation=vertical]:w-[1px]",
  normal: "h-[2px] data-[orientation=vertical]:w-[2px]",
  thick: "h-[4px] data-[orientation=vertical]:w-[4px]",
}

const variantMap = {
  default: "bg-border",
  dashed: "border-t-2 border-dashed border-border bg-transparent",
  dotted: "border-t-2 border-dotted border-border bg-transparent",
  gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      variant = "default",
      spacing = "md",
      thickness = "thin",
      ...props
    },
    ref
  ) => {
    const spacingClass =
      orientation === "horizontal" ? spacingMap[spacing] : "mx-4"

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0",
          thicknessMap[thickness],
          variantMap[variant],
          spacingClass,
          orientation === "horizontal" ? "w-full" : "h-full",
          className
        )}
        {...props}
      />
    )
  }
)

Separator.displayName = "Separator"

export { Separator }

