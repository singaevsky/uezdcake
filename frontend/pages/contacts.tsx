import React from 'react';
import Head from 'next/head';

const ContactsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Контакты - Уездный кондитер</title>
        <meta name="description" content="Контактная информация, адреса, телефон, график работы кондитерской" />
      </Head>

      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-serif text-center mb-12 text-chocolate">Контакты</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Контактная информация */}
            <div>
              <h2 className="text-2xl font-serif mb-6 text-chocolate">Наш адрес</h2>

              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold mb-4">Главный офис</h3>
                <p className="text-gray-700 mb-2">📍 ул. Кондитерская, д. 1</p>
                <p className="text-gray-700 mb-2">⏰ Пн-Вс: 9:00 - 21:00</p>
                <p className="text-gray-700 mb-2">📞 +7 (XXX) XXX-XX-XX</p>
                <p className="text-gray-700">📧 info@uezdny-konditer.ru</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Точки самовывоза</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Точка 1', address: 'ул. Центральная, д. 15', time: '10:00 - 20:00' },
                    { name: 'Точка 2', address: 'пр. Победы, д. 32', time: '9:00 - 21:00' }
                  ].map((point, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-bold">{point.name}</h4>
                      <p className="text-gray-600">{point.address}</p>
                      <p className="text-gray-600 text-sm">{point.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Карта */}
            <div>
              <h2 className="text-2xl font-serif mb-6 text-chocolate">Как нас найти</h2>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-500 text-xl">Интерактивная карта</span>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Обратная связь</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Имя</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Сообщение</label>
                    <textarea
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
                      placeholder="Ваше сообщение"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-chocolate text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsPage;
