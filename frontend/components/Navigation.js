import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth'; // Используем хук вместо прямого импорта authAPI

const Navigation = () => {
  const router = useRouter();
  const { user, logout } = useAuth(); // Получаем user и logout из хука
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Получаем количество товаров в корзине
  useEffect(() => {
    const updateCartCount = () => {
      const cart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
      if (cart) {
        try {
          const cartItems = JSON.parse(cart);
          const count = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
          setCartItemsCount(count);
        } catch (e) {
          setCartItemsCount(0);
        }
      } else {
        setCartItemsCount(0);
      }
    };

    updateCartCount();

    // Слушаем изменения в localStorage
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', updateCartCount);
      return () => window.removeEventListener('storage', updateCartCount);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-color">
              Уездный Кондитер
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-color transition-colors">
              Главная
            </Link>
            <Link href="/catalog" className="text-gray-700 hover:text-primary-color transition-colors">
              Каталог
            </Link>
            <Link href="/builder" className="text-gray-700 hover:text-primary-color transition-colors">
              Конструктор
            </Link>

            {user ? (
              <>
                <Link href="/account" className="text-gray-700 hover:text-primary-color transition-colors">
                  Личный кабинет
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-color transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-primary-color transition-colors">
                Вход
              </Link>
            )}

            <Link href="/cart" className="text-gray-700 hover:text-primary-color transition-colors relative">
              Корзина
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
