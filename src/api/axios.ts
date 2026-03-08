import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
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

    if (error.response?.status === 401 && isPublicEndpoint && !originalRequest._retry) {
      originalRequest._retry = true;
      
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
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
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
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
