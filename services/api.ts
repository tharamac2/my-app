import axios from 'axios';
import useAuthStore from '../store/authStore';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost?.split(':')[0] || '192.168.0.9';

const API_IP = Platform.OS === 'android' && !debuggerHost ? '10.0.2.2' : localIp;
const BASE_URL = Platform.OS === 'web' ? 'http://127.0.0.1:8000/api/v1' : `http://${API_IP}:8000/api/v1`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach the JWT token
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 Unauthorized globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            const logout = useAuthStore.getState().logout;
            logout();
        }
        return Promise.reject(error);
    }
);

export default api;
