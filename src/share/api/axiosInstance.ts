import axios from 'axios';
import { setupInterceptors } from './interceptors';

const axiosInstance = axios.create({    
    baseURL:
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        'http://localhost:3000/api',
    withCredentials: true, // Required for HttpOnly cookies
    timeout: 30000, // 30 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Setup interceptors with configuration
setupInterceptors({
    axiosInstance,
    refreshTokenEndpoint: '/auth/refresh',
    loginUrl: '/auth',
    onLogout: () => {
        // Clear any client-side state if needed
        if (typeof window !== 'undefined') {
            // Redirect to login page
            window.location.href = '/auth';
        }
    },
    onSnackbar: (type, message) => {
        // You can integrate with your toast/snackbar library here
        console.log(`[${type.toUpperCase()}]:`, message);
        
        // Example: If you're using a toast library
        // toast[type](message);
    },
});

export default axiosInstance;