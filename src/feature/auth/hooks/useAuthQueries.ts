/**
 * Authentication React Query Hooks
 * Provides hooks for all auth-related API calls using React Query
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  resetPasswordAPI,
  getCurrentUserAPI,
  fetchCaptcha,
  sendPhoneOtp,
  sendEmailOtp,
  verifyPassword,
  phoneRegister,
  emailRegister,
  resendPhoneOtp,
  resendEmailOtp
} from "../services/apiServices";
import { queryKeys } from "@/share/api/queryKeys";
import { useAuthStore } from "../store/authStore";
import { 
  EmailRegistrationPayload, 
  PhoneEmailRegistrationResponse, 
  PhoneRegistrationPayload, 
  RegistrationPayload, 
  SendEmailOtpPayload, 
  SendPhoneOtpPayload,
  VerfiyPasswordPayload, 
} from "../types";

interface CaptchaResponse {
  id: string;
  data: string; // base64-encoded image string
}

/**
 * Hook to fetch captcha
 * Automatically fetches on mount
 */
export function useCaptcha() {
  return useQuery<CaptchaResponse, Error, CaptchaResponse | undefined>({
    queryKey: queryKeys.auth.captcha(),
    queryFn: async (): Promise<CaptchaResponse> => {
      const response = await fetchCaptcha(); // returns ApiResponse<CaptchaResponse>

      if (response) {
        return response;
      }

      throw new Error(
        (response?.error?.message as string) || "Failed to fetch captcha"
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    // ensure we fetch fresh captcha when the component mounts
    refetchOnMount: true,
  });
}


/**
 * Hook to check if phone is registered
 * Manual trigger only
 */
export function usePhoneRegistration() {
  return useMutation<PhoneEmailRegistrationResponse, Error, PhoneRegistrationPayload>({
    mutationFn: async (payload) => {
      const response = await phoneRegister(payload);
      console.log('response',response)
      if (response.success && response.result) {
        return { registered: response.result.registered };
      }

      throw new Error(
        (response.error?.message as string) || "Failed to check registration"
      );
    },
  });
}

/**
 * Hook to check if email is registered
 * Manual trigger only
 */
export function useEmailRegistration() {
  return useMutation<PhoneEmailRegistrationResponse, Error, EmailRegistrationPayload>({
    mutationFn: async (payload) => {
      const response = await emailRegister(payload);
      console.log('response',response)
      if (response.success && response.result) {
        return { registered: response.result.registered };
      }
      throw new Error(
        (response.error?.message as string) || "Failed to check registration"
      );
    },
  });
}

/**
 * Hook to send OTP to phone
 */
export function useSendPhoneOTP() {
  // { message?: string }
  return useMutation<boolean, Error, SendPhoneOtpPayload>({
    mutationFn: async (payload) => {
      const response = await sendPhoneOtp(payload);

      if (response.success) {
        // return (response.data || response.result) as { message?: string };
        return response.success
      }

      throw new Error((response.error?.message as string) || "Failed to send OTP");
    },
  });
}

/**
 * Hook to send OTP to email
 */
export function useSendEmailOTP() {
  return useMutation<boolean, Error, SendEmailOtpPayload>({
    mutationFn: async (payload) => {
      const response = await sendEmailOtp(payload);

      if (response.success) {
        // return (response.data || response.result) as { message?: string };
        return response.success
      }

      throw new Error((response.error?.message as string) || "Failed to send OTP");
    },
  });
}

/**
 * Hook to Resend OTP to phone
 */
export function useResendPhoneOTP() {
  return useMutation<boolean, Error, PhoneRegistrationPayload>({
    mutationFn: async (payload) => {
      const response = await resendPhoneOtp(payload);

      if (response.success) {
        // return (response.data || response.result) as { message?: string };
        return response.success
      }

      throw new Error((response.error?.message as string) || "Failed to send OTP");
    },
  });
}

/**
 * Hook to Resend OTP to email
 */
export function useResendEmailOTP() {
  return useMutation<boolean, Error, EmailRegistrationPayload>({
    mutationFn: async (payload) => {
      const response = await resendEmailOtp(payload);

      if (response.success) {
        // return (response.data || response.result) as { message?: string };
        return response.success
      }

      throw new Error((response.error?.message as string) || "Failed to send OTP");
    },
  });
}

/**
 * Hook to register new user
 */
export function useRegister() {
  return useMutation<boolean, Error, RegistrationPayload>({
    mutationFn: async (payload) => {
      const response = await registerUser(payload);

      if (response.success ) {
        return (response.data || response.result) 
      }

      throw new Error(
        (response.error?.message as string) || "Registration failed"
      );
    },
  });
}


/**
 * Hook to request password reset
 */
export function userVerifyPassword() {
  return useMutation<boolean, Error, VerfiyPasswordPayload>({
    mutationFn: async (payload) => {
      const response = await verifyPassword(payload);
        console.log('response',response)
      if (response.success) {
        return (response.data || response.result) 
      }
      // throw new Error(
      //   (response.error?.message as string) ||
      //     "Failed to request password reset"
      // );
    },
  });
}

/**
 * Hook to reset password
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: async ({
      phoneOrEmail,
      otp,
      newPassword,
    }: {
      phoneOrEmail: string;
      otp: string;
      newPassword: string;
    }) => {
      const response = await resetPasswordAPI(phoneOrEmail, otp, newPassword);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        (response.error?.message as string) || "Failed to reset password"
      );
    },
    onSuccess: () => {
      const authStore = useAuthStore.getState();
      authStore.setStep("initial");
    },
  });
}


/**
 * Hook to get current user
 * Automatically fetches on mount
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: async () => {
      const response = await getCurrentUserAPI();

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        (response.error?.message as string) || "Failed to fetch user"
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if user is not authenticated
  });
}
