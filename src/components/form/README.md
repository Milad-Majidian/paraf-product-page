# Reusable Form Components

Type-safe, reusable form field components that wrap shadcn/ui Form components with react-hook-form and Zod validation.

## Overview

These components eliminate repetitive boilerplate by encapsulating the common pattern:
```tsx
<FormField>
  <FormItem>
    <FormLabel>
    <FormControl>
      <Input />
    <FormMessage />
```

Into a single, declarative component.

## Components

### TextField
A generic text input field with full type safety and validation support.

**Props:**
- `control` - react-hook-form control object
- `name` - Field name (type-safe with FieldPath)
- `label` - Field label text
- `placeholder?` - Input placeholder
- `type?` - Input type (text, email, tel, password, number, url)
- `inputMode?` - Mobile keyboard type
- `autoComplete?` - Browser autocomplete hint
- `required?` - Show required asterisk (*)
- `disabled?` - Disable input
- `className?` - Container className
- `inputClassName?` - Input element className
- `dir?` - Text direction (ltr/rtl)

**Example:**
```tsx
<TextField
  control={form.control}
  name="email"
  label="ایمیل"
  placeholder="example@email.com"
  type="email"
  inputMode="email"
  autoComplete="email"
  required
  dir="ltr"
/>
```

### CaptchaField
A specialized field for captcha verification with the custom CaptchaInput component.

**Props:**
- `control` - react-hook-form control object
- `name` - Field name
- `label?` - Field label (default: "کد امنیتی")
- `required?` - Show required asterisk (default: true)
- `className?` - Container className
- `errors?` - Form errors object for error display

**Example:**
```tsx
<CaptchaField
  control={form.control}
  name="captcha"
  errors={form.formState.errors}
/>
```

### CheckboxField
A checkbox with label, following accessibility best practices.

**Props:**
- `id` - Unique ID for input/label association
- `label` - Checkbox label text
- `checked?` - Controlled checked state
- `onCheckedChange?` - Change handler
- `className?` - Container className
- `labelClassName?` - Label className

**Example:**
```tsx
<CheckboxField 
  id="remember-me" 
  label="مرا به خاطر بسپار" 
/>
```

### SubmitButton
A submit button with loading state and optional icon.

**Props:**
- `loading?` - Show loading spinner
- `disabled?` - Disable button
- `children` - Button text/content
- `icon?` - Lucide icon component
- `iconSize?` - Icon size in pixels (default: 20)
- `className?` - Additional className
- `variant?` - Button variant (default, destructive, outline, etc.)

**Example:**
```tsx
<SubmitButton loading={isLoading} icon={LogIn} iconSize={20}>
  ورود / ثبت‌نام
</SubmitButton>
```

## Usage Pattern

### Before (Verbose)
```tsx
<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem className="gap-2">
      <FormLabel className="text-text-secondary font-light">
        شماره موبایل
        <span className="text-red-500 text-[16px] relative -top-1 -mr-1">*</span>
      </FormLabel>
      <FormControl>
        <Input
          placeholder="09123456789"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className="h-10 border-2 border-primary"
          dir="rtl"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### After (Concise)
```tsx
<TextField
  control={form.control}
  name="phone"
  label="شماره موبایل"
  placeholder="09123456789"
  type="tel"
  inputMode="tel"
  autoComplete="tel"
  required
/>
```

## Complete Form Example

```tsx
import { Form } from "@/components/ui/form";
import { TextField, CaptchaField, CheckboxField, SubmitButton } from "@/components/form";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", captcha: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    // Handle submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
        <TextField
          control={form.control}
          name="phone"
          label="شماره موبایل"
          placeholder="09123456789"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
        />

        <CaptchaField
          control={form.control}
          name="captcha"
          errors={form.formState.errors}
        />

        <div className="flex flex-col gap-3">
          <CheckboxField id="remember" label="مرا به خاطر بسپار" />
          
          <SubmitButton loading={isLoading} icon={LogIn}>
            ورود / ثبت‌نام
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
```

## Benefits

- **DRY Principle** - Write once, use everywhere
- **Type Safety** - Full TypeScript generics support
- **Consistency** - Uniform styling and behavior across all forms
- **Maintainability** - Update once, apply everywhere
- **Accessibility** - Built-in ARIA attributes and label associations
- **Validation** - Seamless integration with Zod and react-hook-form
- **Customization** - Flexible props for special cases
- **RTL Support** - Built-in right-to-left text direction support

## File Structure

```
src/components/form/
├── index.ts              # Centralized exports
├── TextField.tsx.tsx     # Generic text input field
├── CaptchaField.tsx.tsx  # Captcha verification field
├── CheckboxField.tsx     # Checkbox with label
└── SubmitButton.tsx      # Submit button with loading state
```

## Extending

To add new reusable field types:

1. Create component in `src/components/form/`
2. Follow the pattern of wrapping FormField/FormItem/FormControl
3. Make it generic with `<T extends FieldValues>`
4. Export from `index.ts`

Example:
```tsx
export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  // ... other props
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select {...field}>
              {/* options */}
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
```

This reduces code from ~150 lines per form to ~80 lines while maintaining full functionality.
