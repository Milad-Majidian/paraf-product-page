"use client";

import { SubmitButton } from "@/components/form/SubmitButton";
import { TextField } from "@/components/form/TextField.tsx";
import { Form } from "@/components/ui/form";
import { otpSchema, type OtpInput } from "@/feature/auth/schema";
import { useAuthStore } from "@/feature/auth/store/authStore";
import { cn } from "@/share/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function OTPVerification() {
  const router = useRouter();
  const { phoneOrEmail, loginMethod, isRegistered, setStep } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(10);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const form = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const onSubmit = async (data: OtpInput) => {
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("OTP verification:", { ...data, phoneOrEmail });

      // Navigate based on registration status
      if (isRegistered) {
        setStep("password");
      } else {
        setStep("register");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendTimer(60);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Resending code to:", phoneOrEmail);
    } catch (error) {
      console.error("Resend failed:", error);
    }
  };

  return (
    <>
      <div className="mb-6">
        <button onClick={()=> setStep("initial")} className="mb-4 flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
          <MoveRight size={25} className="text-text-secondary" />
        </button>
        <h2 className="text-lg mb-8">به <span className="font-bold">بازار پاراف</span> خوش اومدی!</h2>
        <p className="text-sm text-muted-foreground">
          کد تایید به {loginMethod === "phone" ? "شماره" : "ایمیل"}{" "}
          <span className="font-semibold">{phoneOrEmail}</span> ارسال شد
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
          <div className="grow">
          <TextField
            control={form.control}
            name="otp"
            label="کد تایید"
            placeholder="کد 4 تا 6 رقمی را وارد کنید"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
          />
          </div>
          <div className="flex flex-col gap-4 px-1 mt-auto">
            <div className="flex items-center justify-between text-sm">
              <div>
                <div
                  className={cn(
                    resendTimer > 0 ? "visible" : "hidden",
                    "text-negative"
                  )}
                >
                  <span className="text-text-primary text-xs">
                    زمان باقی‌مانده{" "}
                  </span>{" "}
                  {formatTime(resendTimer)}
                </div>
              </div>
              <button
                type="button"
                onClick={handleResendCode}
                className={`${
                  resendTimer > 0
                    ? "text-text-tertiary opacity-50 cursor-not-allowed"
                    : "text-primary cursor-pointer"
                }`}
                disabled={resendTimer > 0}
              >
                ارسال مجدد کد
              </button>
            </div>
            <div className="mt-auto">
                  <SubmitButton loading={isLoading} icon={LogIn} iconSize={20}>
              ورود به پاراف
            </SubmitButton>
            </div>
          </div>
        </form>
      </Form>
      </>
  );
}
