// frontend/lib/auth.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'; // Импортируем типы для лучшей типизации

// Определим базовый URL API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Интерфейсы для типизации данных
// Добавляем date_joined как опциональное поле
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone?: string;
  bonus_points?: number;
  // Добавлено поле, которого не хватало. Сделано опциональным.
  date_joined?: string;
  // Можно добавить и другие потенциальные поля из Django User, если они есть в API
  // last_login?: string;
  // is_active?: boolean;
  // created_at?: string; // Альтернативное имя
  // Добавьте другие поля, если они есть в вашем API
}

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

interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// Экспортируемый объект с методами аутентификации
export const authAPI = {
  // Логин
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(`${API_URL}/auth/login/`, data);
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Ошибка входа:', error);
      throw error;
    }
  },

  // Регистрация
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(`${API_URL}/auth/register/`, data);
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Ошибка регистрации:', error);
      throw error;
    }
  },

  // Выход
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  // Проверка аутентификации
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  // Получение токена доступа
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  },

  // Получение токена обновления
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  },

  // Получение текущего пользователя
  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user) as User;
      } catch (e) {
        console.error('Ошибка парсинга данных пользователя из localStorage', e);
        return null;
      }
    }
    return null;
  },

  // Обновление токена доступа
  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response: AxiosResponse<{ access: string }> = await axios.post<{ access: string }>(`${API_URL}/auth/token/refresh/`, {
        refresh: refreshToken
      });
      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    } catch (error: any) {
      console.error('Ошибка обновления токена:', error);
      this.logout(); // Если не удалось обновить, выходим
      throw error;
    }
  },

  // Обновление профиля пользователя (если API поддерживает)
  async updateProfile(profileData: Partial<User>): Promise<User> {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`
        }
      };
      const response: AxiosResponse<User> = await axios.put<User>(`${API_URL}/auth/profile/`, profileData, config);
      // Обновляем пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      console.error('Ошибка обновления профиля:', error);
      throw error;
    }
  }
};

// Axios interceptor для автоматического добавления токена к запросам
axios.interceptors.request.use(
  (config) => {
    const token = authAPI.getAccessToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`; // Используем скобочную нотацию
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor для автоматического обновления токена при 401 ошибке
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, что ошибка 401, запрос существует и еще не был повторен
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем, что запрос будет повторен

      try {
        // Пытаемся обновить токен
        const newAccessToken = await authAPI.refreshAccessToken();
        if (newAccessToken) {
          // Если токен обновлен, повторяем оригинальный запрос с новым токеном
          // Улучшаем проверку существования headers
          if (originalRequest.headers) {
             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Если обновление не удалось, выходим и перенаправляем на логин
        console.error('Не удалось обновить токен, выход из системы:', refreshError);
        authAPI.logout();
        if (typeof window !== 'undefined') {
          // window.location.href = '/login'; // Перенаправление на страницу логина
          // Или лучше использовать роутер Next.js, если это возможно в контексте вызова
        }
        // return Promise.reject(refreshError); // Просто пробрасываем ошибку обновления
         // Или возвращаем оригинальную ошибку 401
         return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default authAPI;
