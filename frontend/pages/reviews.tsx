import React, { useState } from 'react';
import Head from 'next/head';

const ReviewsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Head>
        <title>Отзывы клиентов - Уездный кондитер</title>
        <meta name="description" content="Отзывы наших клиентов, рейтинги, фотографии десертов" />
      </Head>

      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-serif text-center mb-12 text-chocolate">Отзывы клиентов</h1>

          {/* Статистика отзывов */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-chocolate mb-2">4.8</div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-600">На основе 127 отзывов</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center justify-center">
                  <span className="mr-2">{stars}</span>
                  <span className="text-yellow-400">★</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full mx-2">
                    <div
                      className="h-2 bg-yellow-400 rounded-full"
                      style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 2 : 3}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{stars === 5 ? 89 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 3 : 6}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Форма отзыва */}
          <div className="text-center mb-12">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-chocolate text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              {showForm ? 'Отменить' : 'Оставить отзыв'}
            </button>

            {showForm && (
              <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mt-6">
                <h3 className="text-2xl font-bold mb-6 text-chocolate">Ваш отзыв</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Ваше имя</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Рейтинг</label>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <button key={i} type="button" className="text-3xl text-gray-300 hover:text-yellow-400 transition">
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Отзыв</label>
                    <textarea
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
                      placeholder="Расскажите о вашем опыте..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Фото (опционально)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <p className="text-gray-500 mb-4">Перетащите фото сюда или нажмите для выбора</p>
                      <button
                        type="button"
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                      >
                        Выбрать файл
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-chocolate text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                  >
                    Отправить отзыв
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Отзывы */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Анна Петрова",
                rating: 5,
                date: "15 декабря 2024",
                text: "Заказала торт на день рождения дочери - просто восторг! Качество и вкус на высоте! Доставили вовремя, все было красиво упаковано.",
                photo: null,
                verified: true
              },
              {
                name: "Михаил Сидоров",
                rating: 5,
                date: "10 декабря 2024",
                text: "Лучшие десерты в городе! Регулярно заказываю для офиса. Всегда свежие и красивые.",
                photo: null,
                verified: true
              },
              {
                name: "Елена Козлова",
                rating: 4,
                date: "5 декабря 2024",
                text: "Очень понравился медовик. Единственное - немного сладковат для моего вкуса, но в целом отлично!",
                photo: null,
                verified: false
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{review.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                      {review.verified && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Проверено
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <p className="text-gray-700 mb-4">{review.text}</p>

                {review.photo && (
                  <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Фото продукта</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Пагинация */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-chocolate text-white rounded">1</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">2</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">3</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Следующая →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
