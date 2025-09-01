import React from 'react';
import Head from 'next/head';

const DeliveryPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Доставка и оплата - Уездный кондитер</title>
        <meta name="description" content="Условия доставки, способы оплаты, время работы курьерской службы" />
      </Head>

      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-serif text-center mb-12 text-chocolate">Доставка и оплата</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Доставка */}
            <div>
              <h2 className="text-3xl font-serif mb-8 text-chocolate">Доставка</h2>

              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h3 className="text-2xl font-bold mb-6">Способы доставки</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">🚚</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Курьерская доставка</h4>
                      <p className="text-gray-700 mb-2">Доставка по городу в течение 2-3 часов</p>
                      <p className="text-chocolate font-bold">от 300 ₽</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-2xl mr-4">🏪</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Самовывоз</h4>
                      <p className="text-gray-700 mb-2">Бесплатный самовывоз из наших точек</p>
                      <p className="text-chocolate font-bold">Бесплатно</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📦</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Почта России</h4>
                      <p className="text-gray-700 mb-2">Доставка по всей России</p>
                      <p className="text-chocolate font-bold">от 500 ₽</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6">Время доставки</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b pb-2">
                    <span>Понедельник - Пятница</span>
                    <span className="font-bold">9:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Суббота</span>
                    <span className="font-bold">10:00 - 20:00</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Воскресенье</span>
                    <span className="font-bold">10:00 - 18:00</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Оплата */}
            <div>
              <h2 className="text-3xl font-serif mb-8 text-chocolate">Оплата</h2>

              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h3 className="text-2xl font-bold mb-6">Способы оплаты</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">💳</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Банковская карта</h4>
                      <p className="text-gray-700">Оплата онлайн через защищенное соединение</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-2xl mr-4">💰</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Наличные</h4>
                      <p className="text-gray-700">Оплата при получении заказа</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📱</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">СБП (Система быстрых платежей)</h4>
                      <p className="text-gray-700">Оплата через мобильное приложение банка</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-2xl mr-4">🏦</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Банковский перевод</h4>
                      <p className="text-gray-700">Для юридических лиц</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6">Гарантии</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Безопасная оплата через защищенное соединение</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Возврат денежных средств в течение 14 дней</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Гарантия свежести продукции</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Страхование заказов при доставке</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryPage;
