const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        // Не добавляем Content-Type для FormData, браузер установит его автоматически
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    // Преобразуем тело в JSON строку, если это объект и не FormData
    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      config.signal = controller.signal;

      const response = await fetch(url, config);

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Превышено время ожидания запроса');
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Не удалось подключиться к серверу. Проверьте, запущен ли бэкенд.');
      }

      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials: { username: string; password: string }) {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout/', {
      method: 'POST',
    });
  }

  async getProfile() {
    return this.request('/auth/profile/');
  }

  // Product methods
  async getProducts() {
    return this.request('/products/');
  }

  async getProduct(id: number) {
    return this.request(`/products/${id}/`);
  }

  async getCategories() {
    return this.request('/products/categories/');
  }

  // Order methods
  async getOrders() {
    return this.request('/orders/');
  }

  async createOrder(orderData: any) {
    return this.request('/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(id: number) {
    return this.request(`/orders/${id}/`);
  }

  // Builder methods
  async getBuilderOptions() {
    return this.request('/options/');
  }

  async uploadSketch(formData: FormData) {
    return this.request('/builder/sketch/upload/', {
      method: 'POST',
      body: formData,
    });
  }

  async createCustomOrder(orderData: any) {
    return this.request('/orders/custom/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }
}

// Create singleton instance
const apiClient = new ApiClient(API_BASE_URL);

export default apiClient;

// Export individual methods for convenience
export const login = apiClient.login.bind(apiClient);
export const register = apiClient.register.bind(apiClient);
export const logout = apiClient.logout.bind(apiClient);
export const getProfile = apiClient.getProfile.bind(apiClient);
export const getProducts = apiClient.getProducts.bind(apiClient);
export const getProduct = apiClient.getProduct.bind(apiClient);
export const getCategories = apiClient.getCategories.bind(apiClient);
export const getOrders = apiClient.getOrders.bind(apiClient);
export const createOrder = apiClient.createOrder.bind(apiClient);
export const getOrder = apiClient.getOrder.bind(apiClient);
export const getBuilderOptions = apiClient.getBuilderOptions.bind(apiClient);
export const uploadSketch = apiClient.uploadSketch.bind(apiClient);
export const createCustomOrder = apiClient.createCustomOrder.bind(apiClient);
