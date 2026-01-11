/**
 * Authentication Services
 * Updated to use the centralized API error handling system
 */

import axiosInstance from '@/share/api/axiosInstance';
import { ApiResponse } from '@/share/api/types';
import {
    EmailRegistrationPayload,
    PhoneRegistrationPayload,
    RegistrationPayload, 
    SendEmailOtpPayload, 
    SendPhoneOtpPayload, 
    VerfiyPasswordPayload
  } from '../types';

/**
 * Get captcha for authentication
 */
export const fetchCaptcha = async () => {
  const response = await axiosInstance.get('/api/captcha/request');
  return response.data;
};


/**
 *  Register by phone
 */
export const phoneRegister = async (data: PhoneRegistrationPayload) => {
  const payloadData = { ...data, resend: true };
  const response = await axiosInstance.post<ApiResponse<{ registered: boolean }>>('api/users/check-phone', payloadData);
  console.log('phoneRegister',response)
  return response.data;
};

/**
 * Register by email
 */
export const emailRegister = async (data: EmailRegistrationPayload) => {
const payloadData = { ...data, resend: true };
  const response = await axiosInstance.post<ApiResponse<{ registered: boolean }>>('api/users/check-email', payloadData);
  console.log('emailRegister',response)
  return response.data;
};


/**
 * Send OTP to phone 
 */
export const sendPhoneOtp = async (data:SendPhoneOtpPayload) => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>('api/users/verify-code', data);
  console.log('OTP to phone',response)
  return response.data;
};

/**
 * Send OTP to email
 */
export const sendEmailOtp = async (data: SendEmailOtpPayload) => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>('api/users/verify-email-code', data);
  console.log('Send OTP to email',response)
  return response.data;
};


/**
 * Register new user
 */
export const registerUser = async (data: RegistrationPayload) => {
  const response = await axiosInstance.post<ApiResponse>('api/users/signup', data);
  return response.data;
};

/**
 * Verify with password
 */
export const verifyPassword = async (data: VerfiyPasswordPayload) => {
  const response = await axiosInstance.post<ApiResponse>('/api/users/login', data);
      console.log('response',response.data)
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
