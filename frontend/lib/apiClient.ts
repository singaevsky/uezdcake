// frontend/lib/apiClient.ts
// Клиент для взаимодействия с бэкенд API

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    // Базовый URL API, обычно берется из переменных окружения
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Установка токена авторизации
  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  // Универсальный метод для выполнения запросов
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Обработка ошибок HTTP
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail ||
          errorData.message ||
          `HTTP error! status: ${response.status}`
        );
      }

      // Для DELETE запросов, которые могут не возвращать тело
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // GET запрос
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST запрос
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT запрос
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH запрос
  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE запрос
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Специфичные методы для приложения

  // Получение списка продуктов
  async getProducts(params: Record<string, string> = {}): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/products/?${queryParams}` : '/products/';
    return this.get(url);
  }

  // Получение одного продукта
  async getProduct(id: number): Promise<any> {
    return this.get(`/products/${id}/`);
  }

  // Получение начинок
  async getFillings(): Promise<any> {
    return this.get('/fillings/');
  }

  // Регистрация пользователя
  async register(userData: { username: string; email: string; password: string }): Promise<any> {
    return this.post('/auth/register/', userData);
  }

  // Вход пользователя
  async login(credentials: { username: string; password: string }): Promise<any> {
    return this.post('/auth/login/', credentials);
  }

  // Выход пользователя
  async logout(refreshToken: string): Promise<any> {
    return this.post('/auth/logout/', { refresh_token: refreshToken });
  }

  // Получение профиля пользователя
  async getProfile(): Promise<any> {
    return this.get('/auth/profile/');
  }

  // Обновление профиля пользователя
  async updateProfile(profileData: any): Promise<any> {
    return this.put('/auth/profile/update/', profileData);
  }

  // Создание заказа
  async createOrder(orderData: any): Promise<any> {
    return this.post('/orders/', orderData);
  }

  // Получение заказов пользователя
  async getUserOrders(): Promise<any> {
    return this.get('/orders/my/');
  }

  // Отправка токена уведомлений
  async sendNotificationToken(token: string): Promise<any> {
    return this.post('/users/notification-token/', { token });
  }
}

// Экземпляр клиента для использования в приложении
const apiClient = new ApiClient();

// Установим токен авторизации, если он есть в localStorage
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('access_token');
  if (token) {
    apiClient.setAuthToken(token);
  }
}

export default apiClient;
