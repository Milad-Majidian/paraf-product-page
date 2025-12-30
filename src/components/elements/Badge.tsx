import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeProps = React.ComponentPropsWithoutRef<"span">;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-2xl bg-bg-body px-2 py-1 text-center text-[12px] font-medium text-text-primary whitespace-nowrap",
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);

Badge.displayName = "Badge";

export default Badge;