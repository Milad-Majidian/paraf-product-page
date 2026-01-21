import { ApiError, ErrorResponse } from './types';

/**
 * Error Codes
 * Centralized definition of all application error codes
 */
export const ERROR_CODES = {
  // Authentication Errors (1000-1099)
  UNAUTHORIZED: 1001,
  TOKEN_EXPIRED: 1002,
  REFRESH_TOKEN_EXPIRED: 1003,
  INVALID_CREDENTIALS: 1004,
  SESSION_EXPIRED: 1005,
  
  // Validation Errors (1100-1199)
  VALIDATION_ERROR: 1100,
  INVALID_INPUT: 1101,
  MISSING_REQUIRED_FIELD: 1102,
  
  // Resource Errors (1200-1299)
  NOT_FOUND: 1200,
  ALREADY_EXISTS: 1201,
  RESOURCE_CONFLICT: 1202,
  
  // Permission Errors (1300-1399)
  FORBIDDEN: 1300,
  INSUFFICIENT_PERMISSIONS: 1301,
  
  // Server Errors (1400-1499)
  INTERNAL_SERVER_ERROR: 1400,
  SERVICE_UNAVAILABLE: 1401,
  DATABASE_ERROR: 1402,
  
  // Network Errors (1500-1599)
  NETWORK_ERROR: 1500,
  TIMEOUT: 1501,
  CONNECTION_REFUSED: 1502,
  
  // Unknown Error
  UNKNOWN_ERROR: 9999,
} as const;

/**
 * HTTP Status Code to Application Error Code mapping
 */
const HTTP_TO_ERROR_CODE_MAP: Record<number, number> = {
  400: ERROR_CODES.VALIDATION_ERROR,
  401: ERROR_CODES.UNAUTHORIZED,
  403: ERROR_CODES.FORBIDDEN,
  404: ERROR_CODES.NOT_FOUND,
  409: ERROR_CODES.RESOURCE_CONFLICT,
  500: ERROR_CODES.INTERNAL_SERVER_ERROR,
  503: ERROR_CODES.SERVICE_UNAVAILABLE,
};

/**
 * Default error messages for each error code
 */
export const ERROR_MESSAGES: Record<number, string> = {
  [ERROR_CODES.UNAUTHORIZED]: 'Unauthorized access. Please login again.',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Your session has expired. Please login again.',
  [ERROR_CODES.REFRESH_TOKEN_EXPIRED]: 'Your session has expired. Please login again.',
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Invalid credentials provided.',
  [ERROR_CODES.SESSION_EXPIRED]: 'Your session has expired. Please login again.',
  
  [ERROR_CODES.VALIDATION_ERROR]: 'Validation error occurred.',
  [ERROR_CODES.INVALID_INPUT]: 'Invalid input provided.',
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: 'Required field is missing.',
  
  [ERROR_CODES.NOT_FOUND]: 'Resource not found.',
  [ERROR_CODES.ALREADY_EXISTS]: 'Resource already exists.',
  [ERROR_CODES.RESOURCE_CONFLICT]: 'Resource conflict occurred.',
  
  [ERROR_CODES.FORBIDDEN]: 'Access forbidden.',
  [ERROR_CODES.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions.',
  
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Internal server error occurred.',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service is currently unavailable.',
  [ERROR_CODES.DATABASE_ERROR]: 'Database error occurred.',
  
  [ERROR_CODES.NETWORK_ERROR]: 'Network error occurred. Please check your connection.',
  [ERROR_CODES.TIMEOUT]: 'Request timeout. Please try again.',
  [ERROR_CODES.CONNECTION_REFUSED]: 'Connection refused. Please try again later.',
  
  [ERROR_CODES.UNKNOWN_ERROR]: 'An unknown error occurred.',
};

/**
 * Creates a standardized error object
 */
export function createApiError(
  httpCode: number,
  message?: string | Record<string, string>,
  code?: number
): ApiError {
  const errorCode = code || HTTP_TO_ERROR_CODE_MAP[httpCode] || ERROR_CODES.UNKNOWN_ERROR;
  const errorMessage = message || ERROR_MESSAGES[errorCode] || ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR];

  return {
    code: errorCode,
    httpCode,
    message: errorMessage,
  };
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  httpCode: number,
  message?: string | Record<string, string>,
  code?: number
): ErrorResponse {
  return {
    success: false,
    error: createApiError(httpCode, message, code),
  };
}

/**
 * Checks if a response is an error response
 */
export function isErrorResponse(response: any): response is ErrorResponse {
  return response && response.success === false && !!response.error;
}

/**
 * Extracts error message from error object
 */
export function getErrorMessage(error: ApiError | string): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (typeof error.message === 'string') {
    return error.message;
  }
  
  // If message is a localization object, try to get the default language or first available
  if (typeof error.message === 'object') {
    return error.message['en'] || error.message['default'] || Object.values(error.message)[0] || 'An error occurred';
  }
  
  return 'An error occurred';
}
