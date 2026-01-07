"use client";

import { CaptchaField } from "@/components/form/CaptchaField.tsx";
import { CheckboxField } from "@/components/form/CheckboxField";
import { SubmitButton } from "@/components/form/SubmitButton";
import { TextField } from "@/components/form/TextField.tsx";
import { Form } from "@/components/ui/form";
import { loginEmailSchema, type LoginEmailInput } from "@/feature/auth/schema";
import { useAuthStore } from "@/feature/auth/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginFormEmail() {
  const { setStep, setIsRegistered, setPhoneOrEmail, setLoginMethod } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginEmailInput>({
    resolver: zodResolver(loginEmailSchema),
    defaultValues: {
      email: "",
      captcha: "",
    },
  });

  const onSubmit = async (data: LoginEmailInput) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock API response
    //   const mockResponse = {
    //     registered: Math.random() > 0.5, // Randomly determine if user is registered
    //   };
    const mockResponse = { registered: true }; // For testing, assume user is registered

          console.log("Login with email:", data);
      
      setPhoneOrEmail(data.email);
      setLoginMethod("email");
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
      form.setError("email", {
        type: "manual",
        message: "خطا در ارسال اطلاعات",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
        <div className="grow space-y-16">
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

        <CaptchaField
          control={form.control}
          name="captcha"
          errors={form.formState.errors}
        />

        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <CheckboxField id="remember-me-email" label="مرا به خاطر بسپار" />
          
          <SubmitButton loading={isLoading} icon={LogIn} iconSize={20}>
            ورود / ثبت‌نام
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
