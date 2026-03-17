import axios from 'axios';
import useAuthStore from '@/store/authStore';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Toast } from '@/components/ToastManager';

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost?.split(':')[0] || '192.168.0.4';

const API_IP = Platform.OS === 'android' && !debuggerHost ? '10.0.2.2' : localIp;
// Hardcode to local machine for simulator, or use VITE_API_URL equivalent
const BASE_URL = Platform.OS === 'web' ? 'http://127.0.0.1:8000/api/v1' : `http://${API_IP}:8000/api/v1`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10s timeout
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Handle Network Errors / Timeouts
        if (!error.response) {
            Toast.show({ type: 'error', message: 'Network Error: Please check your internet connection.' });
            
            // Basic Auto-Retry logic for network errors (max 1 retry)
            if (!originalRequest._retryCount) {
                originalRequest._retryCount = 0;
            }
            if (originalRequest._retryCount < 1) {
                originalRequest._retryCount += 1;
                return new Promise(resolve => setTimeout(() => resolve(api(originalRequest)), 1000));
            }
            return Promise.reject(error);
        }

        // Handle 401 Unauthorized globally
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = 'Bearer ' + token;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Attempt to refresh token (assuming backend supports it)
                const refreshToken = useAuthStore.getState().refreshToken; // Mock retrieval
                if (!refreshToken) throw new Error('No refresh token');
                
                const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
                const newToken = data.access_token;
                
                // Update store (mock implementation)
                // useAuthStore.getState().setToken(newToken);
                
                processQueue(null, newToken);
                originalRequest.headers.Authorization = 'Bearer ' + newToken;
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                // Force logout
                useAuthStore.getState().logout();
                Toast.show({ type: 'error', message: 'Session expired. Please log in again.' });
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        
        // General Error Handler
        if (error.response.status >= 500) {
            Toast.show({ type: 'error', message: 'Server currently unavailable. Please try again later.' });
        } else if (error.response.status === 403) {
            Toast.show({ type: 'error', message: "You don't have permission to perform this action." });
        }

        return Promise.reject(error);
    }
);

export default api;
