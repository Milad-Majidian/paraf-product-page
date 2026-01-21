import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ErrorResponse } from './types';
import { createErrorResponse, ERROR_CODES, getErrorMessage } from './problems';

/**
 * Configuration for the interceptor
 */
interface InterceptorConfig {
  /** Axios instance to attach interceptors to */
  axiosInstance: AxiosInstance;
  /** URL endpoint for refreshing the access token */
  refreshTokenEndpoint?: string;
  /** URL to redirect to when authentication fails */
  loginUrl?: string;
  /** Function to call when user needs to be logged out */
  onLogout?: () => void;
  /** Function to show snackbar notifications */
  onSnackbar?: (type: string, message: string) => void;
}

/**
 * Tracks if a token refresh is currently in progress
 */
let isRefreshing = false;

/**
 * Queue of failed requests waiting for token refresh
 */
let failedRequestsQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

/**
 * Process all requests in the queue after token refresh
 */
function processQueue(error: any = null, token: any = null) {
  failedRequestsQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  
  failedRequestsQueue = [];
}

/**
 * Setup request interceptor
 * Handles outgoing requests
 */
function setupRequestInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Since tokens are in HttpOnly cookies, they're automatically sent
      // No need to manually attach Authorization header
      
      // Optional: Add custom headers if needed
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}

/**
 * Setup response interceptor
 * Handles incoming responses and errors
 */
function setupResponseInterceptor(
  axiosInstance: AxiosInstance,
  config: InterceptorConfig
) {
  const {
    refreshTokenEndpoint = '/auth/refresh',
    loginUrl = '/auth',
    onLogout,
    onSnackbar,
  } = config;

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // Handle successful response
      const data = response.data;
      
      // Show snackbar if present in response
      if (data?.snackbar && onSnackbar) {
        const message = typeof data.snackbar.message === 'string' 
          ? data.snackbar.message 
          : data.snackbar.message?.['en'] || JSON.stringify(data.snackbar.message);
        
        onSnackbar(data.snackbar.type, message);
      }
      
      return response;
    },
    async (error: AxiosError<ErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      
      // Handle network errors
      if (!error.response) {
        const networkError = createErrorResponse(
          0,
          'Network error. Please check your internet connection.',
          ERROR_CODES.NETWORK_ERROR
        );
        
        if (onSnackbar) {
          onSnackbar('error', getErrorMessage(networkError.error));
        }
        
        return Promise.reject(networkError);
      }
      
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized - Token expired
      if (status === 401 && originalRequest && !originalRequest._retry) {
        // Check if this is the refresh token request itself
        if (originalRequest.url?.includes(refreshTokenEndpoint)) {
          // Refresh token has expired - logout user
          console.error('Refresh token expired. Logging out user.');
          
          if (onSnackbar) {
            onSnackbar('error', 'Your session has expired. Please login again.');
          }
          
          // Perform logout
          if (onLogout) {
            onLogout();
          } else if (typeof window !== 'undefined') {
            // Fallback: redirect to login page
            window.location.href = loginUrl;
          }
          
          const sessionError = createErrorResponse(
            401,
            'Your session has expired. Please login again.',
            ERROR_CODES.REFRESH_TOKEN_EXPIRED
          );
          
          return Promise.reject(sessionError);
        }
        
        // Access token expired - try to refresh
        if (isRefreshing) {
          // Token refresh is already in progress, queue this request
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          })
            .then(() => {
              // Retry the original request after token refresh
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        
        originalRequest._retry = true;
        isRefreshing = true;
        
        try {
          // Attempt to refresh the access token
          await axiosInstance.post(refreshTokenEndpoint);
          
          // Token refresh successful
          isRefreshing = false;
          processQueue(null, null);
          
          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError: any) {
          // Token refresh failed
          isRefreshing = false;
          processQueue(refreshError, null);
          
          console.error('Token refresh failed:', refreshError);
          
          // Refresh token is invalid or expired - logout user
          if (onSnackbar) {
            onSnackbar('error', 'Your session has expired. Please login again.');
          }
          
          if (onLogout) {
            onLogout();
          } else if (typeof window !== 'undefined') {
            window.location.href = loginUrl;
          }
          
          const sessionError = createErrorResponse(
            401,
            'Your session has expired. Please login again.',
            ERROR_CODES.SESSION_EXPIRED
          );
          
          return Promise.reject(sessionError);
        }
      }
      
      // Handle other HTTP errors
      const errorResponse: ErrorResponse = data || createErrorResponse(
        status,
        error.message,
        status === 403 ? ERROR_CODES.FORBIDDEN : undefined
      );
      
      // Show snackbar for errors if present
      if (errorResponse.snackbar && onSnackbar) {
        const message = typeof errorResponse.snackbar.message === 'string'
          ? errorResponse.snackbar.message
          : errorResponse.snackbar.message?.['en'] || JSON.stringify(errorResponse.snackbar.message);
        
        onSnackbar(errorResponse.snackbar.type, message);
      } else if (errorResponse.error && onSnackbar) {
        // Show error message if no snackbar is present
        onSnackbar('error', getErrorMessage(errorResponse.error));
      }
      
      return Promise.reject(errorResponse);
    }
  );
}

/**
 * Setup all interceptors for the axios instance
 */
export function setupInterceptors(config: InterceptorConfig) {
  const { axiosInstance } = config;
  
  // Clear any existing interceptors
  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.response.clear();
  
  // Setup new interceptors
  setupRequestInterceptor(axiosInstance);
  setupResponseInterceptor(axiosInstance, config);
  
  return axiosInstance;
}

/**
 * Default export for direct usage
 */
export default setupInterceptors;
