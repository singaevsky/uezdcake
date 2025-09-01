// frontend/lib/cart.ts
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartAPI = {
  getCart(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  },

  saveCart(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  addToCart(item: Omit<CartItem, 'quantity'>): void {
    const cart = this.getCart();
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      this.saveCart(updatedCart);
    } else {
      this.saveCart([...cart, { ...item, quantity: 1 }]);
    }
  },

  removeFromCart(id: number): void {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    this.saveCart(updatedCart);
  },

  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    const cart = this.getCart();
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    this.saveCart(updatedCart);
  },

  getTotalItems(): number {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
};
