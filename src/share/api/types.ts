/**
 * API Response Types
 * Defines the structure of all API responses
 */

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface ApiError {
  /** Application-specific error code */
  code: number;
  /** HTTP status code */
  httpCode: number;
  /** Error message (can be string or localization object) */
  message: string | Record<string, string>;
}

export interface Snackbar {
  /** Type of snackbar notification */
  type: SnackbarType;
  /** Snackbar message (can be string or localization object) */
  message: string | Record<string, string>;
}

export interface ApiResponse<T = any> {
  /** Indicates if the request was successful */
  success: boolean;
  /** Response data (only present when success is true) */
  data?: T;
/** Result data (alternative to data) */
  result?: T;
  /** Error details (only present when success is false) */
  error?: ApiError;
  /** Snackbar notification data */
  snackbar?: Snackbar;
}


/**
 * Standard error response from API
 */
export interface ErrorResponse {
  success: false;
  error: ApiError;
  snackbar?: Snackbar;
}

/**
 * Standard success response from API
 */
export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  snackbar?: Snackbar;
}
