// frontend/pages/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';

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
    // Имитация загрузки данных (в реальном приложении будет API call)
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Медовик",
          price: 1200,
          image: "/images/products/medovik.jpg",
          description: "Классический медовый торт с нежным сливочным кремом"
        },
        {
          id: 2,
          name: "Чёрный лес",
          price: 1500,
          image: "/images/products/cherny-les.jpg",
          description: "Шоколадный бисквит с вишней и взбитыми сливками"
        },
        {
          id: 3,
          name: "Три шоколада",
          price: 1800,
          image: "/images/products/tri-shokolada.jpg",
          description: "Торт с тремя видами шоколада: горьким, молочным и белым"
        },
        {
          id: 4,
          name: "Эстерхази",
          price: 2200,
          image: "/images/products/esterhazi.jpg",
          description: "Венгерский торт с орехами и меренговым кремом"
        },
        {
          id: 5,
          name: "Тирамису",
          price: 1600,
          image: "/images/products/tiramisu.jpg",
          description: "Классический итальянский десерт с маскарпоне и кофе"
        },
        {
          id: 6,
          name: "Наполеон",
          price: 1400,
          image: "/images/products/napoleon.jpg",
          description: "Слоеный торт с заварным кремом и карамелью"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Слайды для главного слайдера
  const slides = [
    {
      id: 1,
      image: "/images/slider/slide1.jpg",
      title: "Скидка 15% на торты к Новому году!",
      description: "Закажите праздничный торт со скидкой до 31 декабря",
      ctaText: "Выбрать торт",
      ctaLink: "/catalog"
    },
    {
      id: 2,
      image: "/images/slider/slide2.jpg",
      title: "Создайте свой уникальный торт",
      description: "Воспользуйтесь нашим конструктором и воплотите свою мечту в сладость",
      ctaText: "Конструктор",
      ctaLink: "/builder"
    },
    {
      id: 3,
      image: "/images/slider/slide3.jpg",
      title: "Свежие десерты каждый день",
      description: "Только натуральные ингредиенты и свежая выпечка",
      ctaText: "Каталог десертов",
      ctaLink: "/catalog?category=desserts"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Уездный Кондитер - Свежие и вкусные десерты</title>
        <meta name="description" content="Закажите свежие и вкусные торты, десерты и выпечку от кондитерской 'Уездный Кондитер'. Индивидуальный подход и высокое качество." />
      </Head>

      <main>
        {/* Слайдер */}
        <section className="mb-12">
          <Slider slides={slides} />
        </section>

        {/* Хиты продаж */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate mb-3">Хиты продаж</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Самые популярные десерты наших клиентов</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Скелетоны для загрузки
                Array.from({ length: 6 }).map((_, index) => (
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
                ))
              ) : (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
            <div className="text-center mt-10">
              <Link href="/catalog" className="btn-primary inline-block">
                Смотреть весь каталог
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Создай свой торт */}
        <section className="py-16 bg-mint">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate mb-4">Создайте свой уникальный торт</h2>
            <p className="text-gray-700 mb-8 text-lg">
              Воспользуйтесь нашим конструктором и создайте торт своей мечты. Выбирайте форму, начинку, декор и многое другое!
            </p>
            <Link href="/builder" className="btn-primary inline-block text-lg px-8 py-3">
              Перейти в конструктор
            </Link>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate mb-3">Почему выбирают нас</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Мы делаем всё, чтобы вы остались довольны</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🍓",
                  title: "Свежие ингредиенты",
                  description: "Только натуральные продукты премиум-класса"
                },
                {
                  icon: "🎨",
                  title: "Индивидуальный подход",
                  description: "Каждый десерт создается специально для вас"
                },
                {
                  icon: "🚚",
                  title: "Быстрая доставка",
                  description: "Свежие десерты прямо к вашему порогу"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-chocolate mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="py-16 bg-rose px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate mb-3">Отзывы клиентов</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Что говорят те, кто уже попробовал наши десерты</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Анна Петрова",
                  rating: 5,
                  text: "Заказала торт на день рождения дочери - просто восторг! Качество и вкус на высоте! Доставили вовремя, всё было красиво упаковано.",
                  date: "15 декабря 2023"
                },
                {
                  name: "Михаил Сидоров",
                  rating: 5,
                  text: "Лучшие десерты в городе! Регулярно заказываю для офиса. Всегда свежие и красивые.",
                  date: "10 декабря 2023"
                },
                {
                  name: "Елена Козлова",
                  rating: 4,
                  text: "Очень понравился медовик. Единственное - немного сладковат для моего вкуса, но в целом отлично!",
                  date: "5 декабря 2023"
                }
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold">{review.name}</h4>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
