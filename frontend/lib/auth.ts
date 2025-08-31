// lib/auth.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export const authAPI = {
  async login(data: LoginData) {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, data);
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async register(data: RegisterData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register/`, data);
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  },

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
        refresh: refreshToken
      });
      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    } catch (error) {
      this.logout();
      throw error;
    }
  }
};

// Axios interceptor для автоматического добавления токена
axios.interceptors.request.use(
  (config) => {
    const token = authAPI.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor для автоматического обновления токена
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authAPI.refreshAccessToken();
        const token = authAPI.getAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        authAPI.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
