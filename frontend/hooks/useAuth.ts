import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import authAPI from '../lib/auth';
import type { User, LoginData, RegisterData } from '../lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (authAPI.isAuthenticated()) {
        try {
          const currentUser = authAPI.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            authAPI.logout();
          }
        } catch (error) {
          console.error('Ошибка проверки аутентификации:', error);
          authAPI.logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginData) => {
    try {
      const response = await authAPI.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Ошибка входа в useAuth:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await authAPI.register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Ошибка регистрации в useAuth:', error);
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};
