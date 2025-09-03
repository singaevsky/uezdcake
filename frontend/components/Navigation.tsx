import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

const Navigation: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window !== 'undefined') {
        const cart = localStorage.getItem('cart');
        if (cart) {
          try {
            const cartItems = JSON.parse(cart);
            const count = cartItems.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
            setCartItemsCount(count);
          } catch (e) {
            setCartItemsCount(0);
          }
        } else {
          setCartItemsCount(0);
        }
      }
    };

    updateCartCount();

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
            <Link href="/" className={`text-gray-700 hover:text-primary-color transition-colors ${router.pathname === '/' ? 'text-primary-color font-medium' : ''}`}>
              Главная
            </Link>
            <Link href="/catalog" className={`text-gray-700 hover:text-primary-color transition-colors ${router.pathname === '/catalog' ? 'text-primary-color font-medium' : ''}`}>
              Каталог
            </Link>
            <Link href="/builder" className={`text-gray-700 hover:text-primary-color transition-colors ${router.pathname === '/builder' ? 'text-primary-color font-medium' : ''}`}>
              Конструктор
            </Link>
            <Link href="/about" className={`text-gray-700 hover:text-primary-color transition-colors ${router.pathname === '/about' ? 'text-primary-color font-medium' : ''}`}>
              О нас
            </Link>
            <Link href="/delivery" className={`text-gray-700 hover:text-primary-color transition-colors ${router.pathname === '/delivery' ? 'text-primary-color font-medium' : ''}`}>
              Доставка
            </Link>

            {user ? (
              <>
                <Link href="/account" className={`text-gray-700 hover:text-primary-color transition-colors ${router.pathname.startsWith('/account') ? 'text-primary-color font-medium' : ''}`}>
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
              <Link href="/login" className={`text-gray-700 hover:text-primary-color transition-colors ${router.pathname === '/login' ? 'text-primary-color font-medium' : ''}`}>
                Вход
              </Link>
            )}

            <Link href="/cart" className={`text-gray-700 hover:text-primary-color transition-colors relative ${router.pathname === '/cart' ? 'text-primary-color font-medium' : ''}`}>
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
