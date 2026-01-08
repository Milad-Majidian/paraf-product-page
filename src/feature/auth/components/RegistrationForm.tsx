"use client";

import { SubmitButton } from "@/components/form/SubmitButton";
import { TextField } from "@/components/form/TextField.tsx";
import { Form } from "@/components/ui/form";
import { registrationSchema, type RegistrationInput } from "@/feature/auth/schema";
import { useAuthStore } from "@/feature/auth/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegistrationForm() {
  const router = useRouter();
  const { phoneOrEmail, reset } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegistrationInput) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Registration:", { ...data, phoneOrEmail });
      
      // Reset auth state and redirect to home
      reset();
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg mb-2"><span className="font-bold">ثبت‌نام</span> در پاراف... </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
          <div className="grow space-y-10">
          <TextField
            control={form.control}
            name="firstName"
            label="نام"
            placeholder="نام خود را وارد کنید"
            autoComplete="given-name"
            required
          />

          <TextField
            control={form.control}
            name="lastName"
            label="نام خانوادگی"
            placeholder="نام خانوادگی خود را وارد کنید"
            required
          />

          <TextField
            control={form.control}
            name="password"
            label="رمز عبور"
            type="password"
            placeholder="رمز عبور (حداقل 8 کاراکتر)"
            required
          />

          <TextField
            control={form.control}
            name="confirmPassword"
            label="تکرار رمز عبور"
            type="password"
            placeholder="رمز عبور را مجدداً وارد کنید"
            required
          />
          </div>

          <div className="mt-auto">
            <SubmitButton loading={isLoading} icon={UserPlus} iconSize={20}>
              ثبت‌نام و ورود
            </SubmitButton>
          </div>
        </form>
      </Form>
    </>
  );
}
