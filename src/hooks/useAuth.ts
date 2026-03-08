import { useState, useCallback, useEffect } from 'react';
import { authAPI, User, AuthResponse } from '../api/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const loading = useState(() => {
    const token = localStorage.getItem('access_token');
    return !token; 
  })[0];

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token && !user) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
    };

    initializeAuth();
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const response: AuthResponse = await authAPI.login({ email, password });
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    setUser(response.user);
    return response;
  }, []);

  const register = useCallback(async (userData: {
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
  }) => {
    const response = await authAPI.register(userData);
    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  }, []);

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};
