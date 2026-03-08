import api from './axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export const authAPI = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login/', credentials);
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  // Register new user
  register: async (userData: RegisterData): Promise<{ message: string }> => {
    const response = await api.post('/auth/register/', userData);
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me/');
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  // Refresh token
  refreshToken: async (refresh: string): Promise<{ access: string }> => {
    const response = await api.post('/auth/refresh/', { refresh });
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  // Admin login
  adminLogin: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/admin/login/', credentials);
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },
};
