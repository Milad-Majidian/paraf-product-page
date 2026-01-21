/**
 * API Module - Central Export
 * Import everything you need for API calls from here
 */

// Axios instance with interceptors configured
export { default as axiosInstance } from './axiosInstance';

// Types
export type {
  ApiResponse,
  ApiError,
  Snackbar,
  SnackbarType,
  ErrorResponse,
  SuccessResponse,
} from './types';

// Error utilities
export {
  ERROR_CODES,
  ERROR_MESSAGES,
  createApiError,
  createErrorResponse,
  isErrorResponse,
  getErrorMessage,
} from './problems';

// Interceptor setup (if you need to reconfigure)
export { setupInterceptors } from './interceptors';

// Re-export axios types for convenience
export type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
