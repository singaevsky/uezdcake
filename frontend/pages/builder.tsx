// frontend/pages/builder.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Типы для шагов конструктора
type BuilderStep =
  | 'event'
  | 'type'
  | 'shape'
  | 'weight'
  | 'fillings'
  | 'tiers'
  | 'decoration'
  | 'coating'
  | 'colors'
  | 'date'
  | 'sketch'
  | 'comment';

interface CakeConfig {
  event: string;
  type: string;
  shape: string;
  weight: string;
  fillings: string[];
  tiers: number;
  decoration: string;
  coating: string;
  colors: string[];
  date: string;
  sketch: File | null;
  comment: string;
}

const CakeBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BuilderStep>('event');
  const [config, setConfig] = useState<CakeConfig>({
    event: '',
    type: '',
    shape: '',
    weight: '',
    fillings: [],
    tiers: 1,
    decoration: '',
    coating: '',
    colors: [],
    date: '',
    sketch: null,
    comment: ''
  });

  const steps: { id: BuilderStep; title: string }[] = [
    { id: 'event', title: 'Событие' },
    { id: 'type', title: 'Тип' },
    { id: 'shape', title: 'Форма' },
    { id: 'weight', title: 'Вес' },
    { id: 'fillings', title: 'Начинки' },
    { id: 'tiers', title: 'Ярусы' },
    { id: 'decoration', title: 'Декор' },
    { id: 'coating', title: 'Покрытие' },
    { id: 'colors', title: 'Цвета' },
    { id: 'date', title: 'Дата' },
    { id: 'sketch', title: 'Эскиз' },
    { id: 'comment', title: 'Комментарий' }
  ];

  const updateConfig = (field: keyof CakeConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'event':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите событие</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['День рождения', 'Свадьба', 'Юбилей', 'Корпоратив', '8 Марта', 'Детский праздник'].map(event => (
                <button
                  key={event}
                  className={`p-3 border rounded-lg text-center hover:border-chocolate transition ${
                    config.event === event ? 'border-chocolate bg-rose-50 font-bold' : 'border-gray-300'
                  }`}
                  onClick={() => updateConfig('event', event)}
                >
                  {event}
                </button>
              ))}
            </div>
          </div>
        );
      case 'type':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите тип десерта</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Торт', icon: '🎂' },
                { name: 'Бенто-торт', icon: '🍱' },
                { name: 'Капкейки', icon: '🧁' },
                { name: 'Макарон', icon: '🍪' },
                { name: 'Пирожное', icon: '🍰' },
                { name: 'Кекс', icon: '🥮' }
              ].map(item => (
                <button
                  key={item.name}
                  className={`p-4 border rounded-lg text-center hover:border-chocolate transition flex flex-col items-center ${
                    config.type === item.name ? 'border-chocolate bg-rose-50 font-bold' : 'border-gray-300'
                  }`}
                  onClick={() => updateConfig('type', item.name)}
                >
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 'shape':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите форму</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Круг', icon: '⭕' },
                { name: 'Квадрат', icon: '⬜' },
                { name: 'Сердце', icon: '❤️' },
                { name: 'Прямоугольник', icon: '▭' },
                { name: 'Ромб', icon: '💎' },
                { name: 'Звезда', icon: '⭐' },
                { name: 'Овал', icon: '🥚' },
                { name: 'Произвольная', icon: '✏️' }
              ].map(shape => (
                <button
                  key={shape.name}
                  className={`p-3 border rounded-lg text-center hover:border-chocolate transition ${
                    config.shape === shape.name ? 'border-chocolate bg-rose-50 font-bold' : 'border-gray-300'
                  }`}
                  onClick={() => updateConfig('shape', shape.name)}
                >
                  <div className="text-xl mb-1">{shape.icon}</div>
                  <div className="text-xs">{shape.name}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'weight':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите вес/порции</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { weight: '0.5 кг', portions: '4 порции', price: '+0 ₽' },
                { weight: '1 кг', portions: '8 порций', price: '+0 ₽' },
                { weight: '1.5 кг', portions: '12 порций', price: '+500 ₽' },
                { weight: '2 кг', portions: '16 порций', price: '+1000 ₽' },
                { weight: '2.5 кг', portions: '20 порций', price: '+1500 ₽' },
                { weight: '3 кг', portions: '24 порции', price: '+2000 ₽' }
              ].map(item => (
                <button
                  key={item.weight}
                  className={`p-3 border rounded-lg text-center hover:border-chocolate transition ${
                    config.weight === item.weight ? 'border-chocolate bg-rose-50 font-bold' : 'border-gray-300'
                  }`}
                  onClick={() => updateConfig('weight', item.weight)}
                >
                  <div className="font-bold">{item.weight}</div>
                  <div className="text-xs text-gray-600">{item.portions}</div>
                  <div className="text-xs text-chocolate">{item.price}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'fillings':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите начинки (до 3)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2">
              {[
                'Шоколадная с арахисом и карамелью',
                'Творожно-ягодная',
                'Ванильная с фруктами',
                'Ореховая с медом',
                'Крем-брюле',
                'Малиновая с маком',
                'Кофейная с шоколадом',
                'Лимонная с малиной',
                'Банановая с карамелью',
                'Клубничная с сливками',
                'Апельсиновая с шоколадом',
                'Фисташковая с малиной'
              ].map(filling => (
                <div
                  key={filling}
                  onClick={() => {
                    const currentFillings = [...config.fillings];
                    if (currentFillings.includes(filling)) {
                      updateConfig('fillings', currentFillings.filter(f => f !== filling));
                    } else if (currentFillings.length < 3) {
                      updateConfig('fillings', [...currentFillings, filling]);
                    }
                  }}
                  className={`p-3 border rounded-lg cursor-pointer transition ${
                    config.fillings.includes(filling)
                      ? 'border-chocolate bg-rose-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                      config.fillings.includes(filling) ? 'bg-chocolate border-chocolate' : 'border-gray-400'
                    }`}>
                      {config.fillings.includes(filling) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span className="text-sm">{filling}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Выбрано: {config.fillings.length}/3 начинок
            </div>
          </div>
        );
      // Для остальных шагов можно добавить подобную логику
      default:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Шаг: {currentStep}</h3>
            <p>Содержимое для шага {currentStep} будет реализовано позже.</p>
          </div>
        );
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 'event':
        return config.event !== '';
      case 'type':
        return config.type !== '';
      case 'shape':
        return config.shape !== '';
      case 'weight':
        return config.weight !== '';
      case 'fillings':
        return config.fillings.length > 0;
      default:
        return true;
    }
  };

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-cream py-8">
      <Head>
        <title>Конструктор тортов - Уездный Кондитер</title>
        <meta name="description" content="Создайте свой уникальный торт с помощью нашего онлайн-конструктора" />
      </Head>

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-chocolate">Конструктор тортов</h1>
          <p className="text-gray-600">Создайте торт своей мечты шаг за шагом</p>
        </div>

        {/* Прогресс бар */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            {steps.map((step, index) => (
              <span
                key={step.id}
                className={`px-2 py-1 rounded-full ${
                  index <= currentIndex
                    ? 'bg-chocolate text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-chocolate h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Контент шага */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Навигация */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentIndex === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Назад
          </button>
          {currentIndex === steps.length - 1 ? (
            <button
              onClick={() => alert('Заказ оформлен!')} // Заменить на реальную логику
              className="px-6 py-2 bg-chocolate text-white rounded-lg font-medium hover:bg-dark-chocolate"
            >
              Оформить заказ
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`px-6 py-2 rounded-lg font-medium ${
                !isStepValid()
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-chocolate text-white hover:bg-dark-chocolate'
              }`}
            >
              Далее
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-chocolate hover:underline">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CakeBuilder;
