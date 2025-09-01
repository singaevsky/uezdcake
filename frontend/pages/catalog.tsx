// frontend/pages/catalog.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  // Добавим поля для фильтрации
  category?: string;
  weight_options?: { weight: string; price: number }[];
  fillings?: string[];
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 5000,
    filling: 'all',
    sortBy: 'popular'
  });

  // Имитация загрузки данных
  useEffect(() => {
    // В реальном приложении здесь будет API call
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Медовик",
          price: 1200,
          image: "/images/products/medovik.jpg",
          description: "Классический медовый торт с нежным сливочным кремом",
          category: "cakes",
          weight_options: [
            { weight: "1 кг", price: 1200 },
            { weight: "2 кг", price: 2200 }
          ],
          fillings: ["Медовая", "Сливочный пломбир с ягодами"]
        },
        {
          id: 2,
          name: "Чёрный лес",
          price: 1500,
          image: "/images/products/cherny-les.jpg",
          description: "Шоколадный бисквит с вишней и взбитыми сливками",
          category: "cakes",
          weight_options: [
            { weight: "1 кг", price: 1500 },
            { weight: "1.5 кг", price: 2100 }
          ],
          fillings: ["Шоколадная с арахисом и карамелью", "Вишня"]
        },
        {
          id: 3,
          name: "Три шоколада",
          price: 1800,
          image: "/images/products/tri-shokolada.jpg",
          description: "Торт с тремя видами шоколада: горьким, молочным и белым",
          category: "cakes",
          weight_options: [
            { weight: "1 кг", price: 1800 },
            { weight: "2 кг", price: 3200 }
          ],
          fillings: ["Шоколадно-ванильная", "Шоколадный мусс"]
        },
        {
          id: 4,
          name: "Эстерхази",
          price: 2200,
          image: "/images/products/esterhazi.jpg",
          description: "Венгерский торт с орехами и меренговым кремом",
          category: "cakes",
          weight_options: [
            { weight: "1 кг", price: 2200 },
            { weight: "1.5 кг", price: 3100 }
          ],
          fillings: ["Эстерхази"]
        },
        {
          id: 5,
          name: "Тирамису",
          price: 1600,
          image: "/images/products/tiramisu.jpg",
          description: "Классический итальянский десерт с маскарпоне и кофе",
          category: "desserts",
          weight_options: [
            { weight: "1 кг", price: 1600 }
          ],
          fillings: ["Кофе", "Маскарпоне"]
        },
        {
          id: 6,
          name: "Капкейки Ванильные",
          price: 300,
          image: "/images/products/cupcakes-vanilla.jpg",
          description: "Нежные ванильные капкейки с кремом",
          category: "cupcakes",
          weight_options: [
            { weight: "6 шт", price: 300 },
            { weight: "12 шт", price: 550 }
          ],
          fillings: ["Ванильная"]
        }
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Применение фильтров (имитация)
  useEffect(() => {
    // В реальном приложении здесь будет логика фильтрации
    setFilteredProducts(products);
  }, [filters, products]);

  const handleFilterChange = (filterName: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // Получение уникальных начинок для фильтра
  const getUniqueFillings = () => {
    const allFillings = products.flatMap(p => p.fillings || []);
    return Array.from(new Set(allFillings));
  };

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Каталог десертов - Уездный Кондитер</title>
        <meta name="description" content="Широкий выбор тортов, десертов и выпечки от кондитерской 'Уездный Кондитер'" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-chocolate mb-2">Каталог десертов</h1>
          <p className="text-gray-600">Выберите идеальный десерт для вашего события</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Боковая панель фильтров */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
              <h2 className="text-xl font-bold text-chocolate mb-4">Фильтры</h2>

              {/* Категории */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Категория</h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', name: 'Все' },
                    { id: 'cakes', name: 'Торты' },
                    { id: 'desserts', name: 'Десерты' },
                    { id: 'cupcakes', name: 'Капкейки' }
                  ].map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={() => handleFilterChange('category', category.id)}
                        className="mr-2 text-chocolate"
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Цена */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Цена</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="От"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 5000)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="До"
                  />
                </div>
              </div>

              {/* Начинки */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Начинки</h3>
                <select
                  value={filters.filling}
                  onChange={(e) => handleFilterChange('filling', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="all">Все начинки</option>
                  {getUniqueFillings().map(filling => (
                    <option key={filling} value={filling}>{filling}</option>
                  ))}
                </select>
              </div>

              {/* Сортировка */}
              <div>
                <h3 className="font-semibold mb-2">Сортировать по</h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
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
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
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
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Найдено: {filteredProducts.length} товаров
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
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
