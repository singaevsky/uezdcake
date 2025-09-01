// frontend/pages/cart.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  weight?: string;
  fillings?: string[];
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка корзины из localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (e) {
        console.error('Ошибка при загрузке корзины', e);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id: number, weight: string | undefined, fillings: string[] | undefined, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id, weight, fillings);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id &&
        item.weight === weight &&
        JSON.stringify(item.fillings) === JSON.stringify(fillings)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (id: number, weight: string | undefined, fillings: string[] | undefined) => {
    setCartItems(prevItems =>
      prevItems.filter(item =>
        !(item.id === id &&
          item.weight === weight &&
          JSON.stringify(item.fillings) === JSON.stringify(fillings))
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-xl">Загрузка корзины...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Корзина - Уездный Кондитер</title>
        <meta name="description" content="Ваша корзина покупок в кондитерской 'Уездный Кондитер'" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-chocolate mb-2">Ваша корзина</h1>
          <p className="text-gray-600">
            {cartItems.length > 0
              ? `В корзине ${getTotalItems()} товаров на сумму ${getTotalPrice().toLocaleString()} ₽`
              : 'Ваша корзина пуста'}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-chocolate mb-4">Корзина пуста</h2>
            <p className="text-gray-600 mb-6">Добавьте в неё что-нибудь вкусное!</p>
            <Link href="/catalog" className="btn-primary inline-block">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Список товаров в корзине */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.weight}-${item.fillings?.join('-') || 'no-fillings'}-${index}`}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <div className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:w-1/4 mb-4 sm:mb-0 flex justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>

                      <div className="sm:w-3/4 sm:pl-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-chocolate">{item.name}</h3>
                            {item.weight && (
                              <p className="text-gray-600">Вес: {item.weight}</p>
                            )}
                            {item.fillings && item.fillings.length > 0 && (
                              <p className="text-gray-600">
                                Начинки: {item.fillings.join(', ')}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.weight, item.fillings)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                          <div className="flex items-center mb-4 sm:mb-0">
                            <span className="mr-3">Количество:</span>
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.weight, item.fillings, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.weight, item.fillings, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-xl font-bold text-chocolate">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Итог заказа */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-chocolate mb-6">Итого</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Товаров:</span>
                    <span>{getTotalItems()} шт.</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Сумма:</span>
                    <span>{getTotalPrice().toLocaleString()} ₽</span>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary w-full py-3 text-center block mb-4">
                  Оформить заказ
                </Link>

                <Link href="/catalog" className="text-chocolate hover:underline text-center block">
                  ← Продолжить покупки
                </Link>
              </div>

              {/* Промокод */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <h3 className="font-bold text-chocolate mb-3">Промокод</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                  />
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-r">
                    Применить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
