// frontend/pages/account/favorites.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const AccountFavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки избранных товаров
    setTimeout(() => {
      // В реальном приложении здесь будет API call или загрузка из localStorage/cookies
      const mockFavorites: Product[] = [
        {
          id: 1,
          name: "Медовик",
          price: 1200,
          image: "/images/products/medovik.jpg",
          description: "Классический медовый торт с нежным сливочным кремом"
        },
        {
          id: 3,
          name: "Три шоколада",
          price: 1800,
          image: "/images/products/tri-shokolada.jpg",
          description: "Торт с тремя видами шоколада: горьким, молочным и белым"
        }
      ];
      setFavorites(mockFavorites);
      setLoading(false);
    }, 800);
  }, []);

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
    // В реальном приложении здесь будет API call или обновление localStorage/cookies
  };

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Избранное - Уездный Кондитер</title>
        <meta name="description" content="Ваши избранные десерты в кондитерской 'Уездный Кондитер'" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-chocolate mb-2">Избранное</h1>
              <p className="text-gray-600">Сохраненные вами десерты</p>
            </div>
            <Link href="/account" className="text-chocolate hover:underline">
              ← Назад в кабинет
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="bg-gray-300 h-48 w-full"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-3"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-chocolate mb-4">Список избранного пуст</h2>
            <p className="text-gray-600 mb-6">Добавьте сюда десерты, которые вам понравились</p>
            <Link href="/catalog" className="btn-primary inline-block">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-4 text-gray-600">
              Найдено: {favorites.length} товаров
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map(product => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    aria-label="Удалить из избранного"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountFavoritesPage;
