// components/Auth/RegisterForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../../lib/auth';

interface FormData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authAPI.register(formData);
      router.push('/account');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Имя</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Фамилия</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Имя пользователя</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Телефон</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Пароль</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
        />
      </div>

      {error && (
        <div className="mb-4 text-red-500 text-center">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-chocolate text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>

      <div className="mt-4 text-center">
        <a href="/login" className="text-chocolate hover:underline">
          Уже есть аккаунт? Войти
        </a>
      </div>
    </form>
  );
};
