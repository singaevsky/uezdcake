import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ProductList } from '../components/Product'; // Измененный импорт
import apiClient from '../lib/apiClient';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getProducts();
        setFeaturedProducts(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (err: any) {
        console.error('Error fetching featured products:', err);
        setError(err.message || 'Не удалось загрузить продукты');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);

    const fetchFeaturedProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        setFeaturedProducts(Array.isArray(data) ? data.slice(0, 4) : []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching featured products:', err);
        setError(err.message || 'Не удалось загрузить продукты');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Уездный Кондитер - Главная</title>
        <meta name="description" content="Свежая выпечка каждый день" />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-primary-color">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://placehold.co/1200x600/f580a2/FFFFFF?text=Уездный+Кондитер"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-primary-color opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Уездный Кондитер
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Свежая выпечка каждый день. Лучшие кондитерские изделия от местных мастеров.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalog"
                className="bg-white text-primary-color px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Перейти в каталог
              </Link>
              <Link
                href="/builder"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white hover:text-primary-color transition-colors"
              >
                Создать торт
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Популярные товары</h2>
          <p className="text-lg text-gray-600">Лучшие предложения от наших кондитеров</p>
        </div>

        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-dark-color transition-colors"
            >
              Повторить попытку
            </button>
          </div>
        ) : (
          <ProductList products={featuredProducts} loading={loading} />
        )}

        <div className="text-center mt-12">
          <Link
            href="/catalog"
            className="inline-block bg-primary-color text-white px-6 py-3 rounded-md hover:bg-dark-color transition-colors"
          >
            Смотреть весь каталог
          </Link>
        </div>
      </div>

      {/* Advantages */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают нас</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-color text-white mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Свежесть каждый день</h3>
              <p className="text-gray-600">Вся продукция готовится в день доставки из свежих ингредиентов</p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-secondary-color text-white mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Качество и безопасность</h3>
              <p className="text-gray-600">Строгий контроль качества на всех этапах производства</p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-accent-color text-white mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставка в течение 1-2 часов по Московскому региону</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
