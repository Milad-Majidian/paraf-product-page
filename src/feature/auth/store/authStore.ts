import { create } from "zustand";

export type AuthStep = "initial" | "otp" | "password" | "forget-password" | "register";
export type LoginMethod = "phone" | "email";

interface AuthState {
  currentStep: AuthStep;
  loginMethod: LoginMethod;
  isRegistered: boolean | null;
  phoneOrEmail: string;
  isPhone : boolean;
  captchaData: { captcha: string; captchaId: string };
  
  // Actions
  setStep: (step: AuthStep) => void;
  setLoginMethod: (method: LoginMethod) => void;
  setIsRegistered: (isRegistered: boolean) => void;
  setPhoneOrEmail: (value: string) => void;
  setIsPhone:(isPhone: boolean) => void;
  setCaptchaData: (captcha: string, captchaId: string) => void;
  reset: () => void;
}

const initialState = {
  currentStep: "initial" as AuthStep,
  loginMethod: "phone" as LoginMethod,
  isRegistered: null,
  phoneOrEmail: "",
  captchaData: { captcha: "", captchaId: "" },
  isPhone: true,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),
  setLoginMethod: (method) => set({ loginMethod: method }),
  setIsRegistered: (isRegistered) => set({ isRegistered }),
  setPhoneOrEmail: (value) => set({ phoneOrEmail: value }),
  setCaptchaData: (captcha, captchaId) => set({ captchaData: { captcha, captchaId } }),
  setIsPhone: (isPhone) => set({ isPhone }),
  reset: () => set(initialState),
}));
