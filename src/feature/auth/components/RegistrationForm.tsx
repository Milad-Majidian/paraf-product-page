"use client";

import { SubmitButton } from "@/components/form/SubmitButton";
import { TextField } from "@/components/form/TextField.tsx";
import { Form } from "@/components/ui/form";
import {
  registrationSchema,
  type RegistrationInput,
} from "@/feature/auth/schema";
import { useAuthStore } from "@/feature/auth/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegister } from "../hooks/useAuthQueries";

export default function RegistrationForm() {
  const { phoneOrEmail, loginMethod, setIsRegistered, setStep } =
    useAuthStore();
  const { mutateAsync: checkRegistration, isPending } = useRegister();

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword:""
    },
  });

  const onSubmit = async (data: RegistrationInput) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        ...(loginMethod === "phone"
          ? { phone: phoneOrEmail }
          : { email: phoneOrEmail }),
      };

      await checkRegistration(payload);

      setIsRegistered(true);
      setStep("password");
    } catch (err: any) {
      // TODO: This line must be remove
      setStep("password");
      const message = err?.message || "خطا در ارسال‌ اطلاعات";
      toast.error(message);
      // form.setError("captcha", { type: "server", message } as any);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg mb-2">
          <span className="font-bold">ثبت‌نام</span> در پاراف...{" "}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full justify-between"
        >
          <div className="grow space-y-10">
            <TextField
              control={form.control}
              name="firstName"
              label="نام"
              placeholder="نام خود را وارد کنید"  
              required
            />

            <TextField
              control={form.control}
              name="lastName"
              label="نام خانوادگی"
              placeholder="نام خانوادگی خود را وارد کنید"
              required
              autoFocus={false}
            />

            <TextField
              control={form.control}
              name="password"
              label="رمز عبور"
              type="password"
              autoComplete="password"
              placeholder="رمز عبور (حداقل 8 کاراکتر)"
              required
              autoFocus={false}
            />

            <TextField
              control={form.control}
              name="confirmPassword"
              label="تکرار رمز عبور"
              type="password"
              autoComplete="confirmPassword"
              placeholder="رمز عبور را مجدداً وارد کنید"
              required
              autoFocus={false}
            />
          </div>

          <div className="mt-auto">
            <SubmitButton loading={isPending} icon={UserPlus} iconSize={20}>
              ثبت‌نام و ورود
            </SubmitButton>
          </div>
        </form>
      </Form>
    </>
  );
}
