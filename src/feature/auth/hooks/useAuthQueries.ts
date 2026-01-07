/**
 * Authentication React Query Hooks
 * Provides hooks for all auth-related API calls using React Query
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  isPhoneRegistered,
  sendOTPAPI,
  verifyOTPAPI,
  loginWithPasswordAPI,
  registerAPI,
  requestPasswordResetAPI,
  resetPasswordAPI,
  logoutAPI,
  getCurrentUserAPI,
  fetchCaptcha,
} from "../services/apiServices";
import { queryKeys } from "@/share/api/queryKeys";
import { useAuthStore } from "../store/authStore";
import { CheckPhoneRegistrationPayload } from "../types";

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


interface PhoneEmailRegistrationResponse {
  registered: boolean;
}

/**
 * Hook to check if phone is registered
 * Manual trigger only
 */
export function usePhoneRegistration() {
  return useMutation<PhoneEmailRegistrationResponse, Error, CheckPhoneRegistrationPayload>({
    mutationFn: async (payload: CheckPhoneRegistrationPayload): Promise<PhoneEmailRegistrationResponse> => {
      const response = await isPhoneRegistered(payload);

      if (response.success && response.result) {
        console.log('response',response);
        return { registered: response.result.registered };
      }

      throw new Error(
        (response.error?.message as string) || "Failed to check registration"
      );
    },
    onSuccess: (data) => {
      const authStore = useAuthStore.getState();
      authStore.setIsRegistered(data.registered);
    },
  });
}

/**
 * Hook to send OTP
 */
export function useSendOTP() {
  return useMutation({
    mutationFn: async ({
      phoneOrEmail,
      captchaId,
      captchaValue,
    }: {
      phoneOrEmail: string;
      captchaId: string;
      captchaValue: string;
    }) => {
      const response = await sendOTPAPI(phoneOrEmail, captchaId, captchaValue);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        (response.error?.message as string) || "Failed to send OTP"
      );
    },
  });
}

/**
 * Hook to verify OTP
 */
export function useVerifyOTP() {
  return useMutation({
    mutationFn: async ({
      phoneOrEmail,
      otp,
    }: {
      phoneOrEmail: string;
      otp: string;
    }) => {
      const response = await verifyOTPAPI(phoneOrEmail, otp);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        (response.error?.message as string) || "Failed to verify OTP"
      );
    },
    onSuccess: (data) => {
      const authStore = useAuthStore.getState();

      if (data.isNewUser) {
        authStore.setStep("register");
      } else {
        // User is logged in via OTP
        authStore.setStep("initial");
      }
    },
  });
}

/**
 * Hook to login with password
 */
export function useLoginWithPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      phoneOrEmail,
      password,
    }: {
      phoneOrEmail: string;
      password: string;
    }) => {
      const response = await loginWithPasswordAPI(phoneOrEmail, password);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error((response.error?.message as string) || "Login failed");
    },
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser() });

      // Reset auth store
      useAuthStore.getState().reset();
    },
  });
}

/**
 * Hook to register new user
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      phoneOrEmail: string;
      password: string;
      name: string;
      otp: string;
    }) => {
      const response = await registerAPI(data);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        (response.error?.message as string) || "Registration failed"
      );
    },
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser() });

      // Reset auth store
      useAuthStore.getState().reset();
    },
  });
}

/**
 * Hook to request password reset
 */
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: async (phoneOrEmail: string) => {
      const response = await requestPasswordResetAPI(phoneOrEmail);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        (response.error?.message as string) ||
          "Failed to request password reset"
      );
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
 * Hook to logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await logoutAPI();

      if (response.success) {
        return response.data;
      }

      throw new Error((response.error?.message as string) || "Logout failed");
    },
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });
      queryClient.removeQueries({ queryKey: queryKeys.user.all });

      // Reset auth store
      useAuthStore.getState().reset();
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
