import React, { useState } from 'react';
import Head from 'next/head';

const AboutPage: React.FC = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'partnership'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Feedback form submitted:', feedbackForm);
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    setFeedbackForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      type: 'partnership'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>О нас - Уездный Кондитер</title>
        <meta name="description" content="Информация о кондитерской Уездный Кондитер" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Уездный Кондитер</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Свежая выпечка каждый день. Лучшие кондитерские изделия от местных мастеров.
          </p>
        </div>

        {/* О компании */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
              <p className="text-gray-600 mb-4">
                Кондитерская "Уездный Кондитер" была основана в 2015 году с мечтой создавать
                по-настоящему вкусные и красивые десерты для каждого праздника и повседневной жизни.
              </p>
              <p className="text-gray-600 mb-4">
                Наши кондитеры - настоящие мастера своего дела, которые используют только
                свежие и качественные ингредиенты. Мы гордимся тем, что каждое наше изделие
                создается с любовью и вниманием к деталям.
              </p>
              <p className="text-gray-600">
                Сегодня мы обслуживаем тысячи довольных клиентов по всему Московскому региону
                и продолжаем расти, сохраняя при этом высокое качество продукции и сервиса.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/about-shop.jpg"
                alt="Кондитерская Уездный Кондитер"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/8B4513/FFFFFF?text=Кондитерская';
                }}
              />
            </div>
          </div>
        </div>

        {/* Преимущества */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-color text-white mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Свежесть каждый день</h3>
              <p className="text-gray-600">Вся продукция готовится в день доставки из свежих ингредиентов</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-secondary-color text-white mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Качество и безопасность</h3>
              <p className="text-gray-600">Строгий контроль качества на всех этапах производства</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
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

        {/* Акции и предложения */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Акции и специальные предложения</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Акция
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Скидка именинникам</h3>
              <p className="text-gray-600 mb-4">15% скидка на любой заказ в день рождения</p>
              <div className="text-sm text-gray-500">
                <p>Действует при предъявлении документа</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Предложение
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Система лояльности</h3>
              <p className="text-gray-600 mb-4">Копите баллы и получайте подарки</p>
              <div className="text-sm text-gray-500">
                <p>1 балл = 1 рубль скидки</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Скидка
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Самовывоз со скидкой</h3>
              <p className="text-gray-600 mb-4">5% скидка при самовывозе из магазина</p>
              <div className="text-sm text-gray-500">
                <p>Адрес: ул. Кондитерская, д. 15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Форма обратной связи */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Сотрудничество и обратная связь</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Предложения по сотрудничеству</h3>
              <p className="text-gray-600 mb-6">
                Мы всегда открыты для новых идей и предложений по сотрудничеству.
                Если вы хотите стать нашим партнером, поставщиком или предложить
                интересную идею для развития бизнеса, заполните форму обратной связи.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Поставки ингредиентов и упаковки</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Открытие новых точек</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Маркетинговые партнерства</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Корпоративные заказы</span>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Тип обращения
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={feedbackForm.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    required
                  >
                    <option value="partnership">Предложение о сотрудничестве</option>
                    <option value="feedback">Обратная связь</option>
                    <option value="complaint">Жалоба</option>
                    <option value="suggestion">Предложение по улучшению</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={feedbackForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={feedbackForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={feedbackForm.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-color text-white py-2 px-4 rounded-md hover:bg-dark-color transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
