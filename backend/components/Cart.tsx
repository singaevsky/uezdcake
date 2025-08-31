import React, { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Загрузка корзины из localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
      updateCart(cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      updateCart([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    updateCart(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-chocolate text-white p-4 rounded-full shadow-lg z-50"
      >
        🛒 Корзина ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif">Корзина</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl"
                >
                  ×
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-center py-8">Корзина пуста</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center border-b pb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-chocolate">{item.price} ₽</p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Итого:</span>
                      <span>{getTotalPrice()} ₽</span>
                    </div>
                  </div>

                  <button className="w-full bg-chocolate text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                    Оформить заказ
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
