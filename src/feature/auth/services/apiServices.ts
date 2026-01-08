/**
 * Authentication Services
 * Updated to use the centralized API error handling system
 */

import axiosInstance from '@/share/api/axiosInstance';
import { ApiResponse } from '@/share/api/types';
import { CheckEmailRegistrationPayload, CheckPhoneRegistrationPayload, CheckSendEmailOtpPayload, CheckSendPhoneOtpPayload } from '../types';

/**
 * Get captcha for authentication
 */
export const fetchCaptcha = async () => {
  const response = await axiosInstance.get('/api/captcha/request');
  return response.data;
};


/**
 * Check if phone or email is registered
 */
export const isPhoneRegistered = async (data: CheckPhoneRegistrationPayload) => {
  const payloadData = { ...data, resend: true };
  const response = await axiosInstance.post<ApiResponse<{ registered: boolean }>>('api/users/check-phone', payloadData);
  return response.data;
};

/**
 * Check if phone or email is registered
 */
export const isEmailRegistered = async (data: CheckEmailRegistrationPayload) => {
const payloadData = { ...data, resend: true };
  const response = await axiosInstance.post<ApiResponse<{ registered: boolean }>>('api/users/check-email', payloadData);
  return response.data;
};


/**
 * Send OTP to phone 
 */
export const sendPhoneOtp = async (data:CheckSendPhoneOtpPayload) => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>('api/user/verify-code', data);
  return response.data;
};

/**
 * Send OTP to email
 */
export const sendEmailOtp = async (data: CheckSendEmailOtpPayload) => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>('api/auth/send-otp', data);
  return response.data;
};

/**
 * Verify OTP
 */
export const verifyOTPAPI = async (phoneOrEmail: string, otp: string) => {
  const response = await axiosInstance.post<ApiResponse<{ 
    isNewUser: boolean;
    message: string;
  }>>('/auth/verify-otp', {
    phoneOrEmail,
    otp,
  });
  return response.data;
};

/**
 * Login with password
 * Sets HttpOnly cookies for accessToken and refreshToken
 */
export const loginWithPasswordAPI = async (phoneOrEmail: string, password: string) => {
  const response = await axiosInstance.post<ApiResponse<{
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
    };
    message: string;
  }>>('/auth/login', {
    phoneOrEmail,
    password,
  });
  return response.data;
};

/**
 * Register new user
 * Sets HttpOnly cookies for accessToken and refreshToken
 */
export const registerAPI = async (data: {
  phoneOrEmail: string;
  password: string;
  name: string;
  otp: string;
}) => {
  const response = await axiosInstance.post<ApiResponse<{
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
    };
    message: string;
  }>>('/auth/register', data);
  return response.data;
};

/**
 * Request password reset
 */
export const requestPasswordResetAPI = async (phoneOrEmail: string) => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>('/auth/forgot-password', {
    phoneOrEmail,
  });
  return response.data;
};

/**
 * Reset password with OTP
 */
export const resetPasswordAPI = async (phoneOrEmail: string, otp: string, newPassword: string) => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
    phoneOrEmail,
    otp,
    newPassword,
  });
  return response.data;
};

/**
 * Logout user
 * Clears HttpOnly cookies
 */
export const logoutAPI = async () => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>('/auth/logout');
  return response.data;
};

/**
 * Get current user profile (requires authentication)
 */
export const getCurrentUserAPI = async () => {
  const response = await axiosInstance.get<ApiResponse<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  }>>('/auth/me');
  return response.data;
};
