"use client";

import { CaptchaField } from "@/components/form/CaptchaField.tsx";
import { CheckboxField } from "@/components/form/CheckboxField";
import { SubmitButton } from "@/components/form/SubmitButton";
import { TextField } from "@/components/form/TextField.tsx";
import { Form } from "@/components/ui/form";
import { loginPhoneSchema, type LoginPhoneInput } from "@/feature/auth/schema";
import { useAuthStore } from "@/feature/auth/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginFormPhone() {
  const { setStep, setIsRegistered, setPhoneOrEmail, setLoginMethod } =
    useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginPhoneInput>({
    resolver: zodResolver(loginPhoneSchema),
    defaultValues: {
      phone: "",
      captcha: "",
      captchaId: "",
    },
  });

  const onSubmit = async (data: LoginPhoneInput) => {
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock API response
      //   const mockResponse = {
      //     registered: Math.random() > 0.5, // Randomly determine if user is registered
      //   };
      const mockResponse = { registered: false }; // For testing, assume user is registered

      console.log("Login with phone:", data);

      setPhoneOrEmail(data.phone);
      setLoginMethod("phone");
      setIsRegistered(mockResponse.registered);

      if (mockResponse.registered) {
        // Existing user - go to password entry
        setStep("password");
      } else {
        // New user - go to OTP verification
        setStep("otp");
      }
    } catch (error) {
      console.error("Login failed:", error);
      form.setError("phone", {
        type: "manual",
        message: "خطا در ارسال اطلاعات",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full w-full justify-between"
      >
        <input type="hidden" {...form.register("captchaId")} />
        <div className="grow space-y-16">
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
            setCaptchaId={(id: string) => form.setValue("captchaId", id)}
          />
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <CheckboxField id="remember-me" label="مرا به خاطر بسپار" />
          <SubmitButton
            loading={isLoading}
            icon={LogIn}
            iconSize={20}
            className="rounded-lg"
          >
            ورود / ثبت‌نام
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
