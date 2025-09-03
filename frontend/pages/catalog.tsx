import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import apiClient from '../lib/apiClient';
import { useCart } from './index';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
  weight_options?: { weight: string; price: number }[];
  fillings?: string[];
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 5000,
    filling: 'all',
    sortBy: 'popular',
  });

  // Функция для загрузки продуктов
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getProducts();
      setProducts(Array.isArray(data) ? data : []);
      setFilteredProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Не удалось загрузить каталог');
    } finally {
      setLoading(false);
    }
  };

  // Загрузка продуктов при монтировании
  useEffect(() => {
    fetchProducts();
  }, []);

  // Фильтрация и сортировка продуктов
  useEffect(() => {
    let result = [...products];

    // Фильтр по категории
    if (filters.category !== 'all') {
      result = result.filter((product) => product.category === filters.category);
    }

    // Фильтр по цене
    result = result.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Фильтр по начинкам
    if (filters.filling !== 'all') {
      result = result.filter((product) =>
        product.fillings?.includes(filters.filling)
      );
    }

    // Сортировка
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      default:
        // Предполагаем, что популярность уже учтена в порядке от API
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleFilterChange = (filterName: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Получение уникальных начинок
  const getUniqueFillings = () => {
    const allFillings = products.flatMap((p) => p.fillings || []);
    return Array.from(new Set(allFillings));
  };

  // Получение уникальных категорий
  const getUniqueCategories = () => {
    const allCategories = products.map((p) => p.category || 'other');
    return Array.from(new Set(allCategories)).map((id) => ({
      id,
      name: id === 'other' ? 'Другое' : id.charAt(0).toUpperCase() + id.slice(1),
    }));
  };

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Каталог десертов - Уездный Кондитер</title>
        <meta
          name="description"
          content="Широкий выбор тортов, десертов и выпечки от кондитерской 'Уездный Кондитер'"
        />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-dark-chocolate mb-2">
            Каталог десертов
          </h1>
          <p className="text-chocolate">
            Выберите идеальный десерт для вашего события
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Боковая панель фильтров */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
              <h2 className="text-xl font-bold text-dark-chocolate mb-4">
                Фильтры
              </h2>

              {/* Категории */}
              <div className="mb-6">
                <h3 className="font-semibold text-chocolate mb-2">Категория</h3>
                <div className="space-y-2">
                  {[{ id: 'all', name: 'Все' }, ...getUniqueCategories()].map(
                    (category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={filters.category === category.id}
                          onChange={() =>
                            handleFilterChange('category', category.id)
                          }
                          className="mr-2 text-chocolate focus:ring-chocolate"
                        />
                        <span className="text-chocolate">{category.name}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Цена */}
              <div className="mb-6">
                <h3 className="font-semibold text-chocolate mb-2">Цена, ₽</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange('minPrice', parseInt(e.target.value) || 0)
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-chocolate focus:border-chocolate"
                    placeholder="От"
                  />
                  <span className="text-chocolate">-</span>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange(
                        'maxPrice',
                        parseInt(e.target.value) || 5000
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-chocolate focus:border-chocolate"
                    placeholder="До"
                  />
                </div>
              </div>

              {/* Начинки */}
              <div className="mb-6">
                <h3 className="font-semibold text-chocolate mb-2">Начинки</h3>
                <select
                  value={filters.filling}
                  onChange={(e) => handleFilterChange('filling', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-chocolate focus:border-chocolate"
                >
                  <option value="all">Все начинки</option>
                  {getUniqueFillings().map((filling) => (
                    <option key={filling} value={filling}>
                      {filling}
                    </option>
                  ))}
                </select>
              </div>

              {/* Сортировка */}
              <div>
                <h3 className="font-semibold text-chocolate mb-2">
                  Сортировать по
                </h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-chocolate focus:border-chocolate"
                >
                  <option value="popular">Популярности</option>
                  <option value="price-low">Цене: по возрастанию</option>
                  <option value="price-high">Цене: по убыванию</option>
                  <option value="name">Названию</option>
                </select>
              </div>
            </div>
          </div>

          {/* Список продуктов */}
          <div className="md:w-3/4">
            {error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <svg
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-dark-chocolate mb-2">
                  Ошибка загрузки
                </h3>
                <p className="text-chocolate mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setLoading(true);
                    fetchProducts(); // Исправлено: теперь fetchProducts доступна
                  }}
                  className="bg-chocolate text-cream px-4 py-2 rounded-md hover:bg-dark-chocolate transition-colors"
                >
                  Повторить попытку
                </button>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                  >
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
            ) : (
              <>
                <div className="mb-4 text-chocolate">
                  Найдено: {filteredProducts.length} товаров
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CatalogPage;
