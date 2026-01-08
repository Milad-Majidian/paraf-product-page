"use client";

import { Input } from "@/components/elements/Input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/share/utils/cn";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "password" | "number" | "url";
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal" | "search" | "url";
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  formLabelClassName?:string;
  dir?: "ltr" | "rtl";
}

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  autoFocus = true,
  required = false,
  disabled = false,
  className,
  inputClassName,
  formLabelClassName,
  dir = "rtl",
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("gap-1", className)}>
          <FormLabel className={cn(formLabelClassName, "text-text-secondary font-light")}>
            {label}
            {required && (
              <span className="text-negative text-[16px] relative -top-1 -mr-1">
                {" "}*
              </span>
            )}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              inputMode={inputMode}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              disabled={disabled}
              className={cn("h-10 border-2 border-border-primary placeholder:text-text-tertiary placeholder:text-sm", inputClassName)}
              dir={dir}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
