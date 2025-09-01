import React from 'react';
import Head from 'next/head';

const PartnersPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Партнерская программа - Уездный кондитер</title>
        <meta name="description" content="Партнерская программа, реферальные ссылки, заработок на рекомендациях" />
      </Head>

      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-serif text-center mb-12 text-chocolate">Партнерская программа</h1>

          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤝</div>
              <h2 className="text-3xl font-bold text-chocolate mb-4">Зарабатывайте вместе с нами!</h2>
              <p className="text-xl text-gray-700">
                Получайте до 15% с каждой покупки ваших рефералов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-rose-50 rounded-lg">
                <div className="text-3xl font-bold text-chocolate mb-2">15%</div>
                <p className="font-bold mb-2">Комиссия</p>
                <p className="text-sm text-gray-600">С каждой покупки</p>
              </div>

              <div className="text-center p-6 bg-rose-50 rounded-lg">
                <div className="text-3xl font-bold text-chocolate mb-2">∞</div>
                <p className="font-bold mb-2">Без ограничений</p>
                <p className="text-sm text-gray-600">По времени и сумме</p>
              </div>

              <div className="text-center p-6 bg-rose-50 rounded-lg">
                <div className="text-3xl font-bold text-chocolate mb-2">₽</div>
                <p className="font-bold mb-2">Выплата</p>
                <p className="text-sm text-gray-600">Еженедельно</p>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-chocolate text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition text-lg">
                Присоединиться сейчас
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Как это работает */}
            <div>
              <h2 className="text-3xl font-serif mb-8 text-chocolate">Как это работает</h2>

              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: "Регистрация",
                    desc: "Зарегистрируйтесь в партнерской программе и получите уникальную реферальную ссылку"
                  },
                  {
                    step: "2",
                    title: "Рекомендация",
                    desc: "Делитесь своей ссылкой с друзьями, подписчиками или клиентами"
                  },
                  {
                    step: "3",
                    title: "Покупка",
                    desc: "Когда кто-то переходит по вашей ссылке и делает покупку, вы получаете комиссию"
                  },
                  {
                    step: "4",
                    title: "Заработок",
                    desc: "Комиссия автоматически начисляется на ваш баланс и выплачивается еженедельно"
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start">
                    <div className="w-10 h-10 bg-chocolate text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Преимущества */}
            <div>
              <h2 className="text-3xl font-serif mb-8 text-chocolate">Преимущества</h2>

              <div className="space-y-6">
                {[
                  {
                    icon: "💰",
                    title: "Высокая комиссия",
                    desc: "15% с каждой покупки - одна из самых высоких ставок на рынке"
                  },
                  {
                    icon: "📊",
                    title: "Подробная аналитика",
                    desc: "Отслеживайте переходы, конверсии и заработок в реальном времени"
                  },
                  {
                    icon: "📱",
                    title: "Удобные инструменты",
                    desc: "Баннеры, виджеты и промоматериалы для продвижения"
                  },
                  {
                    icon: "🔄",
                    title: "Быстрые выплаты",
                    desc: "Еженедельные выплаты без задержек и скрытых комиссий"
                  },
                  {
                    icon: "👥",
                    title: "Поддержка 24/7",
                    desc: "Наши специалисты всегда готовы помочь с любыми вопросами"
                  },
                  {
                    icon: "📈",
                    title: "Без ограничений",
                    desc: "Нет лимитов по количеству рефералов и сумме заработка"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="text-2xl mr-4">{item.icon}</div>
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-serif mb-6 text-chocolate">Готовы начать?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к нашей партнерской программе и начните зарабатывать уже сегодня!
            </p>
            <button className="bg-chocolate text-white px-12 py-4 rounded-lg font-bold hover:bg-opacity-90 transition text-xl">
              Стать партнером
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnersPage;
