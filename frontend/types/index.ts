export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'customer' | 'chef' | 'admin';
  phone?: string;
  address?: string;
}

export interface Order {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
  delivery_address: string;
  phone: string;
  notes: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}
