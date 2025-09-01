// frontend/components/Navigation.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authAPI } from '../lib/auth';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  // Предполагаем, что authAPI.getCurrentUser() возвращает объект или null
  const user = authAPI.getCurrentUser();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Получаем количество товаров в корзине
  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        try {
          const items = JSON.parse(cart);
          const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartItemsCount(count);
        } catch (e) {
          console.error('Ошибка при подсчете товаров в корзине', e);
        }
      }
    };

    // Инициальная загрузка
    updateCartCount();

    // Добавляем обработчик события для обновления счетчика при изменении localStorage
    // Это базовая реализация, в реальном приложении лучше использовать состояние (например, Context API)
    const handleStorageChange = (event) => {
      if (event.key === 'cart') {
        updateCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Очищаем слушатель при размонтировании
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navItems = [
    { name: 'Главная', href: '/' },
    { name: 'Каталог', href: '/catalog' },
    { name: 'Конструктор', href: '/builder' },
    { name: 'Акции', href: '/promotions' },
    { name: 'О нас', href: '/about' },
    { name: 'Блог', href: '/blog' },
    { name: 'Доставка', href: '/delivery' },
    { name: 'Контакты', href: '/contacts' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-serif font-bold text-chocolate">Уездный Кондитер</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${router.pathname === item.href ? 'nav-link-active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/cart" className="p-2 text-chocolate hover:text-dark-chocolate relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-chocolate text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="ml-4 relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex text-sm rounded-full focus:outline-none"
                >
                  <span className="sr-only">Открыть меню пользователя</span>
                  <div className="h-8 w-8 rounded-full bg-chocolate flex items-center justify-center text-white font-bold">
                    {user.first_name?.charAt(0) || user.username.charAt(0)}
                  </div>
                </button>
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Личный кабинет
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Мои заказы
                    </Link>
                    <button
                      onClick={() => {
                        authAPI.logout();
                        router.push('/');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-4 flex space-x-2">
                <Link href="/login" className="btn-secondary text-sm">
                  Войти
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Регистрация
                </Link>
              </div>
            )}
            <button
              type="button"
              className="ml-2 md:hidden inline-flex items-center justify-center p-2 rounded-md text-chocolate hover:text-dark-chocolate hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Открыть главное меню</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 ${router.pathname === item.href ? 'bg-rose-50 border-gold text-chocolate' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300'} sm:pl-5 sm:pr-6`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
