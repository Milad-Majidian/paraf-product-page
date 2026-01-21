/**
 * Query Keys
 * Centralized query keys for React Query cache management
 * Organized by feature domain
 */

export const queryKeys = {
  // Authentication queries
  auth: {
    all: ['auth'] as const,
    captcha: () => [...queryKeys.auth.all, 'captcha'] as const,
    currentUser: () => [...queryKeys.auth.all, 'current-user'] as const,
    checkRegistration: (phoneOrEmail: string) =>
      [...queryKeys.auth.all, 'check-registration', phoneOrEmail] as const,
  },

  // User queries
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },

  // Product queries
  product: {
    all: ['product'] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.product.all, 'list', filters] as const,
    detail: (slug: string) => [...queryKeys.product.all, 'detail', slug] as const,
    search: (query: string) => [...queryKeys.product.all, 'search', query] as const,
  },
} as const;
