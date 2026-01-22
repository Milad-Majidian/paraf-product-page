"use client";
import CustomTabs from "@/components/elements/CustomTabs";
import ForgetPassword from "@/feature/auth/components/ForgetPassword";
import LoginFormEmail from "@/feature/auth/components/LoginFormEmail";
import LoginFormPhone from "@/feature/auth/components/LoginFormPhone";
import OTPVerification from "@/feature/auth/components/OTPVerification";
import PasswordEntry from "@/feature/auth/components/PasswordEntry";
import RegistrationForm from "@/feature/auth/components/RegistrationForm";
import { useAuthStore } from "@/feature/auth/store/authStore";
import Image from "next/image";
import Link from "next/link";

const AuthPageTabItems = [
  {
    value: "signIn-with-phone",
    label: "ورود با شماره موبایل",
    content: <LoginFormPhone />,
  },
  {
    value: "signIn-with-email",
    label: "ورود با ایمیل",
    content: <LoginFormEmail />,
  },
];

export default function Page() {
  const { currentStep } = useAuthStore();

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case "otp":
        return <OTPVerification />;
      case "password":
        return <PasswordEntry />;
      case "forget-password":
        return <ForgetPassword />;
      case "register":
        return <RegistrationForm />;
      case "initial":
      default:
        return (
          <CustomTabs
            tabItems={AuthPageTabItems}
            defaultValue="signIn-with-phone"
            variant="pills"
            className="flex justify-center items-center gap-12"
            listClassName="min-w-[287px] min-h-[52px] border border-border-secondary! rounded-full! p-1 cursor-pointer!"
            triggerClassName="border-2 border-transparent bg-transparent"
            selectedTriggerClassName="data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:bg-bg-surface"
            direction="rtl"
          />
        );
    }
  };

  return (
    <section className="bg-bg-login min-h-dvh h-full w-full flex items-center justify-center">
      <div className="base-container h-full">
        <div className="h-full grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-4 xl:col-span-4 2xl:col-span-3 h-full mb-4 lg:mb-0">
            <div className="w-full flex flex-col justify-center items-center h-full">
              <Link href="/" className="hidden lg:flex items-center gap-2 mb-8">
                <Image
                  src="/images/logo/logo-type-both.svg"
                  alt="Paraf Logo"
                  width={288}
                  height={56}
                  className="object-contain"
                />
              </Link>
              <div className="flex lg:hidden items-center gap-2 mb-8">
                <Image
                  src="/images/logo/mobile-mono-logo.svg"
                  alt="Paraf Logo"
                  width={270}
                  height={53}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col h-full max-h-full min-h-158 w-full bg-bg-surface border border-primary/50 rounded-4xl py-6 px-4 md:px-5 lg:p-10">
                <Link
                  href="/"
                  className="flex lg:hidden items-center gap-2 mb-8"
                >
                  <Image
                    src="/images/logo/logo-type-both.svg"
                    alt="Paraf Logo"
                    width={179}
                    height={35}
                    className="object-contain"
                  />
                </Link>
                {currentStep === "initial" && (
                  <h2 className="text-lg mb-12">
                    به <span className="font-bold">بازار پاراف</span> خوش اومدی!
                  </h2>
                )}
                {/* <div className="flex w-full flex-1 max-w-sm flex-col gap-6"> */}
                {renderStepContent()}
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:col-span-8 xl:col-span-8 2xl:col-span-9 h-full flex-col gap-2">
            <div className="h-16 bg-[#FFFFFF59] flex justify-between items-center border border-white rounded-full px-10 py-3">
              <div className="flex justify-start items-center gap-2">
                <Image
                  src="/images/auth/reliable-purchase.svg"
                  alt="Paraf Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <p className="text-lg">اطمینان، برای خریــدار</p>
              </div>
              <div className="flex justify-start items-center gap-2">
                <Image
                  src="/images/auth/guarantee.svg"
                  alt="Paraf Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <p className="">تضمین، برای فروشنده</p>
              </div>
              <div className="flex justify-start items-center gap-2">
                <Image
                  src="/images/auth/secure-payment.svg"
                  alt="Paraf Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <p className="">پرداخت امن</p>
              </div>
            </div>
            {/* <div className="relative flex-1 bg-bg-login/35 border border-white rounded-2xl overflow-auto flex items-center justify-center">
              <Image
                src="/images/auth/auth-main-image.svg"
                alt="Paraf Logo"
                className="object-none"
              />
            </div> */}
            <div className="relative flex-1 bg-bg-login/35 border border-white rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/auth/auth-main-image.svg"
                  alt="Paraf Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
