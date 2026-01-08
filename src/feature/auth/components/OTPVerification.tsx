"use client";

import { SubmitButton } from "@/components/form/SubmitButton";
import { TextField } from "@/components/form/TextField.tsx";
import { Form } from "@/components/ui/form";
import { otpSchema, type OtpInput } from "@/feature/auth/schema";
import { useAuthStore } from "@/feature/auth/store/authStore";
import { cn } from "@/share/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { convertPersianDigitsToEnglish } from "@/share/utils/phone";
import { toast } from "sonner";
import { useSendEmailOTP, useSendPhoneOTP, usePhoneRegistration, useEmailRegistration } from "../hooks/useAuthQueries";


export default function OTPVerification() {
  const { phoneOrEmail, loginMethod, isRegistered, isPhone, setStep, setIsPhone, captchaData } = useAuthStore();
  const [resendTimer, setResendTimer] = useState(10);
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const form = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);


  const { mutateAsync: verifyPhoneOTP, isPending: isPhonePending } = useSendPhoneOTP();
  const { mutateAsync: verifyEmailOTP, isPending: isEmailPending } = useSendEmailOTP();
  const { mutateAsync: checkPhoneRegistration, isPending: isResendingPhone } = usePhoneRegistration();
  const { mutateAsync: checkEmailRegistration, isPending: isResendingEmail } = useEmailRegistration();

  const isLoading = isPhonePending || isEmailPending || isResendingPhone || isResendingEmail;

  const onSubmit = async (data: OtpInput) => {
    const code = convertPersianDigitsToEnglish(data.code);
    
    try {
      if (isPhone) {
        await verifyPhoneOTP({
          phone: convertPersianDigitsToEnglish(phoneOrEmail),
          code,
        });
      } else {
        await verifyEmailOTP({
          email: phoneOrEmail,
          code,
        });
      }
      // Navigate based on registration status
      setStep(isRegistered ? "password" : "register");
      setIsPhone(false)
    } catch (err: any) {
      const message = err?.message || "خطا در ارسال‌ اطلاعات";
      toast.error(message);
    }
  };

  const handleResendCode = async () => {
    setResendTimer(60);
    try {
      if (isPhone) {
       const res =  await checkPhoneRegistration({
          phone: convertPersianDigitsToEnglish(phoneOrEmail),
          captchaId:captchaData.captchaId,
          captcha: captchaData.captcha
       });
      } else {
        const res = await checkEmailRegistration({
          email: phoneOrEmail,
           captchaId:captchaData.captchaId,
          captcha: captchaData.captcha
        });
      }
    } catch (err: any) {
            const message = err?.message || "خطا در ارسال‌ اطلاعات";
            toast.error(message);
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
            name="code"
            label="کد تایید"
            placeholder="کد 4 تا 6 رقمی را وارد کنید"
            type="tel"
            inputMode="numeric"
            maxLength={6}
            numericOnly
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
