// frontend/pages/about.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif text-center mb-12">О нас</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-serif mb-6">Наша история</h2>
            <p className="text-gray-700 mb-6">
              Кондитерская "Уездный кондитер" основана в 2010 году с мечтой создавать
              по-настоящему вкусные и красивые десерты для самых важных моментов в жизни
              наших клиентов.
            </p>
            <p className="text-gray-700 mb-6">
              Наши кондитеры - настоящие мастера своего дела, прошедшие обучение в лучших
              школах Европы и обладающие многолетним опытом.
            </p>
          </div>

          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Фото команды</span>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-serif text-center mb-8">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Свежие ингредиенты', desc: 'Только натуральные продукты премиум-класса' },
              { title: 'Индивидуальный подход', desc: 'Каждый торт создается специально для вас' },
              { title: 'Гарантия качества', desc: 'Возврат или переделка в случае несоответствия' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
