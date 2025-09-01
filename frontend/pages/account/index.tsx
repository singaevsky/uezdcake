// frontend/pages/account/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authAPI } from '../../lib/auth';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  bonus_points: number;
  date_joined: string;
}

const AccountPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Проверка авторизации
    if (!authAPI.isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Загрузка данных пользователя
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      // В реальном приложении здесь будет API call для получения полной информации
      setUser({
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        first_name: currentUser.first_name || '',
        last_name: currentUser.last_name || '',
        phone: currentUser.phone || '',
        bonus_points: currentUser.bonus_points || 0,
        date_joined: currentUser.date_joined || new Date().toISOString()
      });
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-chocolate mb-4">Ошибка загрузки данных</h1>
          <Link href="/" className="text-chocolate hover:underline">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Личный кабинет - Уездный Кондитер</title>
        <meta name="description" content="Ваш личный кабинет в кондитерской 'Уездный Кондитер'" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-chocolate mb-2">Личный кабинет</h1>
          <p className="text-gray-600">Добро пожаловать, {user.first_name || user.username}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Навигация по аккаунту */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="mb-6 text-center">
                <div className="mx-auto bg-chocolate text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                  {user.first_name?.charAt(0) || user.username.charAt(0)}
                </div>
                <h2 className="font-bold text-lg">
                  {user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.username}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link href="/account" className="block py-2 px-4 bg-rose rounded-lg font-medium text-chocolate">
                      Личные данные
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/orders" className="block py-2 px-4 hover:bg-gray-100 rounded-lg">
                      Мои заказы
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/favorites" className="block py-2 px-4 hover:bg-gray-100 rounded-lg">
                      Избранное
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/profile" className="block py-2 px-4 hover:bg-gray-100 rounded-lg">
                      Настройки профиля
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    authAPI.logout();
                    router.push('/');
                  }}
                  className="w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-chocolate mb-6">Личные данные</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Имя</h3>
                  <p>{user.first_name || '-'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Фамилия</h3>
                  <p>{user.last_name || '-'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p>{user.phone || '-'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Бонусные баллы</h3>
                  <p className="text-xl font-bold text-chocolate">{user.bonus_points}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Дата регистрации</h3>
                  <p>
                    {new Date(user.date_joined).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/account/profile" className="btn-secondary inline-block">
                  Редактировать профиль
                </Link>
              </div>
            </div>

            {/* Быстрые действия */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-bold text-lg mb-2">Мои заказы</h3>
                <p className="text-gray-600 mb-4">Просмотр истории заказов</p>
                <Link href="/account/orders" className="text-chocolate hover:underline">
                  Перейти
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl mb-3">❤️</div>
                <h3 className="font-bold text-lg mb-2">Избранное</h3>
                <p className="text-gray-600 mb-4">Сохраненные десерты</p>
                <Link href="/account/favorites" className="text-chocolate hover:underline">
                  Перейти
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl mb-3">🎟️</div>
                <h3 className="font-bold text-lg mb-2">Промокоды</h3>
                <p className="text-gray-600 mb-4">Доступные скидки</p>
                <Link href="/promotions" className="text-chocolate hover:underline">
                  Перейти
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
