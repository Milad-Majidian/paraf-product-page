import { Button as ShadcnButton } from "@/components/ui/button";
import * as React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnButton> & {
  loading?: boolean;
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, disabled, variant, size, asChild, ...props }, ref) => {
    return (
      <ShadcnButton 
        ref={ref} 
        disabled={!!disabled || !!loading}
        variant={variant ?? "default"}
        size={size ?? "default"}
        asChild={!!asChild}
        {...props}
      >
        {loading ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";
