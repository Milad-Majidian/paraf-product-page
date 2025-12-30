"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value?: number
  className?: string
  rtl?: boolean
}

export function ProgressBar({ value , className,rtl= false }: ProgressBarProps) {
  const val = Math.max(0, Math.round(value ?? 0))

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className={cn(className, "relative h-full")}
      role="progressbar"
      aria-valuenow={val}
      aria-valuemin={0}
      aria-valuemax={Math.max(100, val)}
    >
      <div
        className="absolute top-0 bottom-0 h-full rounded-full"
        style={{
          width: `${val}%`,
          left: rtl ? undefined : 0,
          right: rtl ? 0 : undefined,
        }}
      />

      <div className="absolute left-2 pointer-events-none">
        <span className="text-sm text-white">{val}</span>
      </div>
    </div>
  )
}
