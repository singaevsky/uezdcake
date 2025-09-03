import { useState } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  weight_options?: { weight: string; price: number }[];
  fillings?: string[];
}

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
  category?: string;
  customCakeConfig?: any;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(ci => ci.productId === item.productId);
      if (existingItem) {
        return prevItems.map(ci =>
          ci.productId === item.productId
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  return { cartItems, addToCart };
};
