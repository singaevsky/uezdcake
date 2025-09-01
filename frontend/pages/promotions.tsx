import React from 'react';
import Head from 'next/head';

const PromotionsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Акции и скидки - Уездный кондитер</title>
        <meta name="description" content="Текущие акции, скидки, промокоды на торты и десерты" />
      </Head>

      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-serif text-center mb-12 text-chocolate">Акции и спецпредложения</h1>

          {/* Активные акции */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif mb-8 text-center text-chocolate">Активные акции</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Скидка 15% на торты",
                  description: "При заказе торта на сумму от 2000 ₽",
                  valid: "До 31 декабря 2024",
                  code: "TOR15",
                  image: "🎂"
                },
                {
                  title: "Бесплатная доставка",
                  description: "При заказе от 3000 ₽ по городу",
                  valid: "До 31 января 2025",
                  code: "DELIVFREE",
                  image: "🚚"
                },
                {
                  title: "Подарок к заказу",
                  description: "Мини-десерт в подарок при заказе от 1500 ₽",
                  valid: "До 15 декабря 2024",
                  code: "GIFT15",
                  image: "🎁"
                }
              ].map((promo, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="p-6">
                    <div className="text-4xl mb-4 text-center">{promo.image}</div>
                    <h3 className="text-xl font-bold mb-3 text-chocolate">{promo.title}</h3>
                    <p className="text-gray-700 mb-4">{promo.description}</p>
                    <div className="bg-rose-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-600">Промокод:</p>
                      <p className="font-bold text-lg">{promo.code}</p>
                    </div>
                    <p className="text-sm text-gray-500 text-center">{promo.valid}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Сезонные предложения */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif mb-8 text-center text-chocolate">Сезонные предложения</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-chocolate">Зимние десерты</h3>
                <p className="text-gray-700 mb-4">
                  Теплые десерты для холодной зимы! Скидка 20% на все зимние десерты
                  до конца января.
                </p>
                <button className="bg-chocolate text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
                  Посмотреть меню
                </button>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-chocolate">Новогодние торты</h3>
                <p className="text-gray-700 mb-4">
                  Специальные новогодние торты с индивидуальным дизайном.
                  Закажите до 25 декабря со скидкой 25%.
                </p>
                <button className="bg-chocolate text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
                  Заказать
                </button>
              </div>
            </div>
          </div>

          {/* Программа лояльности */}
          <div>
            <h2 className="text-3xl font-serif mb-8 text-center text-chocolate">Программа лояльности</h2>

            <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-chocolate mb-2">1 бонус = 1 ₽</div>
                  <p className="text-gray-600">Копите бонусы с каждого заказа</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chocolate mb-2">5%_cashback</div>
                  <p className="text-gray-600">Постоянный кэшбэк</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chocolate mb-2">VIP статус</div>
                  <p className="text-gray-600">При покупке от 10000 ₽</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button className="bg-chocolate text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                  Узнать больше
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionsPage;
