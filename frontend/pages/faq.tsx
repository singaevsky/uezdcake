import React, { useState } from 'react';
import Head from 'next/head';

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Как сделать заказ?",
      answer: "Вы можете сделать заказ через наш сайт, мобильное приложение или по телефону. Выберите понравившийся торт, добавьте его в корзину, укажите параметры и оформите заказ."
    },
    {
      question: "Какие способы оплаты доступны?",
      answer: "Мы принимаем оплату банковскими картами, наличными при получении, через СБП и банковский перевод для юридических лиц."
    },
    {
      question: "Сколько времени занимает доставка?",
      answer: "Доставка по городу осуществляется в течение 2-3 часов. Для отдаленных районов сроки могут быть увеличены. Самовывоз доступен сразу после готовности заказа."
    },
    {
      question: "Можно ли изменить заказ после оформления?",
      answer: "Изменения возможны в течение 2 часов после оформления заказа. После этого времени изменения невозможны из-за начала приготовления."
    },
    {
      question: "Какие гарантии качества?",
      answer: "Мы гарантируем свежесть всех изделий. В случае несоответствия заказа, вы можете вернуть товар или получить его переделку в течение 24 часов."
    },
    {
      question: "Есть ли аллергены в ваших изделиях?",
      answer: "Большинство наших изделий содержат молочные продукты, яйца, глютен и орехи. Подробный состав каждого изделия указан в карточке товара."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>Часто задаваемые вопросы - Уездный кондитер</title>
        <meta name="description" content="Ответы на частые вопросы о заказе, доставке, оплате десертов и тортов" />
      </Head>

      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-serif text-center mb-12 text-chocolate">Часто задаваемые вопросы</h1>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    <h3 className="text-lg font-bold text-chocolate">{faq.question}</h3>
                    <span className="text-2xl">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-6 text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-serif mb-6 text-chocolate">Не нашли ответ на свой вопрос?</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Наши специалисты всегда готовы помочь вам. Свяжитесь с нами любым удобным способом:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="font-bold mb-2">По телефону</h3>
                <p className="text-chocolate">+7 (XXX) XXX-XX-XX</p>
                <p className="text-sm text-gray-600">Пн-Вс: 9:00 - 21:00</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="font-bold mb-2">В чате</h3>
                <p className="text-chocolate">Telegram, WhatsApp</p>
                <p className="text-sm text-gray-600">Круглосуточно</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">✉️</div>
                <h3 className="font-bold mb-2">По email</h3>
                <p className="text-chocolate">info@uezdny-konditer.ru</p>
                <p className="text-sm text-gray-600">Ответ в течение 24 часов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
