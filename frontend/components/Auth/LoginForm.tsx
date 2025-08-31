// components/Auth/LoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../../lib/auth';

interface FormData {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
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
      await authAPI.login(formData);
      router.push('/account');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
        {loading ? 'Вход...' : 'Войти'}
      </button>

      <div className="mt-4 text-center">
        <a href="/register" className="text-chocolate hover:underline">
          Нет аккаунта? Зарегистрироваться
        </a>
      </div>
    </form>
  );
};
