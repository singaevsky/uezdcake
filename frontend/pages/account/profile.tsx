// frontend/pages/account/profile.tsx
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
}

const AccountProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error'; text: string} | null>(null);
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
      const userData = {
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        first_name: currentUser.first_name || '',
        last_name: currentUser.last_name || '',
        phone: currentUser.phone || ''
      };
      setUser(userData);
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone
      });
    }
    setLoading(false);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // В реальном приложении здесь будет API call для обновления профиля
      // await authAPI.updateProfile(formData);

      // Имитация API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Обновляем данные в localStorage
      const currentUser = authAPI.getCurrentUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      setMessage({ type: 'success', text: 'Профиль успешно обновлен!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при обновлении профиля' });
    } finally {
      setSaving(false);
    }
  };

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
          <Link href="/account" className="text-chocolate hover:underline">
            ← Вернуться в кабинет
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Настройки профиля - Уездный Кондитер</title>
        <meta name="description" content="Редактирование профиля в кондитерской 'Уездный Кондитер'" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-chocolate mb-2">Настройки профиля</h1>
              <p className="text-gray-600">Редактирование личной информации</p>
            </div>
            <Link href="/account" className="text-chocolate hover:underline">
              ← Назад в кабинет
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Имя
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Фамилия
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="Введите вашу фамилию"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={saving}
                className={`btn-primary py-2 px-6 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>

              <Link href="/account/change-password" className="mt-4 sm:mt-0 text-chocolate hover:underline">
                Изменить пароль
              </Link>
            </div>
          </form>
        </div>

        {/* Раздел удаления аккаунта */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 max-w-2xl">
          <h2 className="text-xl font-bold text-red-600 mb-4">Опасная зона</h2>
          <p className="text-gray-700 mb-4">
            Удаление аккаунта приведет к безвозвратному удалению всех ваших данных, включая историю заказов и персональную информацию.
          </p>
          <button
            onClick={() => {
              if (confirm('Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить.')) {
                // В реальном приложении здесь будет API call для удаления аккаунта
                authAPI.logout();
                router.push('/');
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
          >
            Удалить аккаунт
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountProfilePage;
