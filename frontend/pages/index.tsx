import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard } from '../components/ProductCard';
import { Notification } from '../components/Notification';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Медовик",
          price: 1200,
          image: "/products/medovik.jpg",
          description: "Классический медовый торт с кремом"
        },
        {
          id: 2,
          name: "Чёрный лес",
          price: 1500,
          image: "/products/cherny-les.jpg",
          description: "Шоколадный торт с вишней"
        },
        {
          id: 3,
          name: "Три шоколада",
          price: 1800,
          image: "/products/tri-shokolada.jpg",
          description: "Торт с тремя видами шоколада"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Слайдер акций */}
      <div className="bg-chocolate text-white py-16 text-center">
        <h1 className="text-4xl font-serif mb-4">Скидка 15% на торты к Новому году!</h1>
        <Link href="/promotions" className="bg-gold text-chocolate px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition">
          Подробнее
        </Link>
      </div>

      {/* Хиты продаж */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">Хиты продаж</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center">Загрузка...</div>
            ) : (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Создай свой торт */}
      <section className="bg-mint py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif mb-6">Создай свой торт</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Уникальный торт по вашему вкусу и дизайну
          </p>
          <Link href="/builder" className="bg-chocolate text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition">
            Собрать торт за 5 минут
          </Link>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Анна Петрова</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p>Заказала торт на день рождения дочери - просто восторг! Качество и вкус на высоте!</p>
            </div>
            {/* Добавить больше отзывов */}
          </div>
        </div>
      </section>

      <Notification />
    </div>
  );
};

export default HomePage;
