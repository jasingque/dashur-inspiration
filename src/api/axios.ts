import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    // Only add auth header for protected endpoints (not for public ones)
    const publicEndpoints = [
      '/auth/login/',
      '/auth/register/',
      '/auth/refresh/',
      '/careers/positions/',
      '/contact/submit/',
      '/content/documents/',
      '/content/images/',
      '/content/pages/'
    ];
    
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );
    
    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const publicEndpoints = [
      '/auth/login/',
      '/auth/register/',
      '/auth/refresh/',
      '/careers/positions/',
      '/contact/submit/',
      '/content/documents/',
      '/content/images/',
      '/content/pages/'
    ];
    
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      originalRequest.url?.includes(endpoint)
    );

    // If we get 401 on a public endpoint, clear tokens and retry without auth
    if (error.response?.status === 401 && isPublicEndpoint && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear potentially invalid tokens
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // Retry request without Authorization header
      delete originalRequest.headers.Authorization;
      return api(originalRequest);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh/`,
            { refresh: refreshToken }
          );
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
