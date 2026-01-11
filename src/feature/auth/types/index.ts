// API response types for authentication

export interface OTPVerifyResponse {
  success: boolean;
  message?: string;
}

export interface RegistrationResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
  message?: string;
}

export interface CaptchaResponse {
  id: string;
  data: string;
}

export interface PhoneEmailRegistrationResponse {
  registered: boolean;
}

interface Cacptcha {
  captcha: string;
  captchaId: string;
};

interface AuthItem {
  phone?: string;
  email?: string;
}

export interface PhoneRegistrationPayload extends Cacptcha {
  phone: string;
}

export interface EmailRegistrationPayload extends Cacptcha {
  email: string;
}

export interface SendPhoneOtpPayload {
  phone: string;
  code: string;
}

// Sending OTP may require captcha fields (captcha + captchaId)
export interface SendPhoneOtpPayloadWithCaptcha extends Cacptcha {
  phone: string;
  code: string;
}

export interface SendEmailOtpPayload {
  email: string;
  code: string;
}

export interface SendEmailOtpPayloadWithCaptcha extends Cacptcha {
  email: string;
  code: string;
}

export interface VerfiyPasswordPayload extends AuthItem {
  password: string;
}

export interface RegistrationPayload extends AuthItem {
  firstName: string;
  lastName: string;
  password: string;
}