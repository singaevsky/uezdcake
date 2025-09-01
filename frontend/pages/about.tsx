import React from 'react';
import Head from 'next/head';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>О нас - Уездный кондитер</title>
        <meta name="description" content="История кондитерской 'Уездный кондитер', наша команда и преимущества" />
      </Head>

      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-serif text-center mb-12 text-chocolate">О нас</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-serif mb-6 text-chocolate">Наша история</h2>
              <p className="text-gray-700 mb-6 text-lg">
                Кондитерская "Уездный кондитер" основана в 2010 году с мечтой создавать
                по-настоящему вкусные и красивые десерты для самых важных моментов в жизни
                наших клиентов.
              </p>
              <p className="text-gray-700 mb-6 text-lg">
                Наши кондитеры - настоящие мастера своего дела, прошедшие обучение в лучших
                школах Европы и обладающие многолетним опытом.
              </p>
            </div>

            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xl">Фото команды</span>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-serif text-center mb-12 text-chocolate">Наши преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Свежие ингредиенты',
                  desc: 'Только натуральные продукты премиум-класса',
                  icon: '🍓'
                },
                {
                  title: 'Индивидуальный подход',
                  desc: 'Каждый торт создается специально для вас',
                  icon: '🎨'
                },
                {
                  title: 'Гарантия качества',
                  desc: 'Возврат или переделка в случае несоответствия',
                  icon: '💯'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-chocolate">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-serif mb-8 text-chocolate">Наши сертификаты</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Сертификат {item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
