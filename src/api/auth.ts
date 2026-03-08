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
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login/', credentials);
    return response.data.data || response.data;
  },

  register: async (userData: RegisterData): Promise<{ message: string }> => {
    const response = await api.post('/auth/register/', userData);
    return response.data.data || response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me/');
    return response.data.data || response.data;
  },

  refreshToken: async (refresh: string): Promise<{ access: string }> => {
    const response = await api.post('/auth/refresh/', { refresh });
    return response.data.data || response.data;
  },

  adminLogin: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/admin/login/', credentials);
    return response.data.data || response.data;
  },
};
