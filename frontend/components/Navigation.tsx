// frontend/components/Navigation.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authAPI } from '../lib/auth';

interface NavItem {
  name: string;
  href: string;
  mobileOnly?: boolean;
}

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const user = authAPI.getCurrentUser();

  const navItems: NavItem[] = [
    { name: 'Главная', href: '/' },
    { name: 'Каталог', href: '/catalog' },
    { name: 'Конструктор', href: '/builder' },
    { name: 'Акции', href: '/promotions' },
    { name: 'О нас', href: '/about' },
    { name: 'Блог', href: '/blog' },
    { name: 'Доставка', href: '/delivery' },
    { name: 'Контакты', href: '/contacts' },
    { name: 'Отзывы', href: '/reviews' },
    { name: 'Галерея', href: '/gallery' },
    { name: 'FAQ', href: '/faq' }
  ];

  const userMenuItems = user
    ? [
        { name: 'Личный кабинет', href: '/account' },
        { name: 'Мои заказы', href: '/account/orders' },
        { name: 'Избранное', href: '/account/favorites' },
        { name: 'Выйти', href: '#', action: 'logout' }
      ]
    : [
        { name: 'Войти', href: '/login' },
        { name: 'Регистрация', href: '/register' }
      ];

  const handleLogout = () => {
    authAPI.logout();
    router.push('/');
  };

  const handleUserMenuClick = (item: any) => {
    if (item.action === 'logout') {
      handleLogout();
    }
  };

  return (
    <nav className="bg-chocolate text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link href="/" className="text-2xl font-serif font-bold">
            Уездный кондитер
          </Link>

          {/* Навигация для десктопа */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-gold transition ${
                    router.pathname === item.href ? 'text-gold font-bold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Пользовательское меню */}
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-gold transition">
                <span>{user ? user.first_name || user.username : 'Аккаунт'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white text-chocolate rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {userMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => item.action === 'logout' && handleLogout()}
                    className="block px-4 py-2 hover:bg-rose-50 hover:text-chocolate transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Мобильное меню кнопка */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gold transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 px-4 rounded hover:bg-gold hover:bg-opacity-20 transition ${
                    router.pathname === item.href ? 'text-gold font-bold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-gold pt-4 mt-4">
                <h3 className="px-4 text-sm font-bold mb-2">Аккаунт</h3>
                {userMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (item.action === 'logout') handleLogout();
                    }}
                    className="block py-2 px-4 rounded hover:bg-gold hover:bg-opacity-20 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
