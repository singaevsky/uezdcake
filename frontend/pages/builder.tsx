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

  // Базовые цены (в реальном приложении будут браться из API)
  const basePrices = {
    cake: 1000, // Базовая цена торта
    bento: 500, // Базовая цена бенто
    cupcake: 100, // Цена за 1 капкейк
    macaron: 50, // Цена за 1 макарон
    pastry: 300, // Базовая цена пирожного
    muffin: 200, // Базовая цена кекса
  };

  // Надбавки
  const surcharges = {
    tier: 500, // Надбавка за каждый дополнительный ярус
    decoration: {
      flowers: 300,
      fruits: 200,
      chocolate: 250,
      berries: 150,
      nuts: 100,
      confetti: 50,
      inscription: 200,
      figurines: 400,
    },
    coating: {
      cream: 0,
      marzipan: 200,
      glaze: 150,
      chocolate: 300,
      meringue: 100,
    },
  };

  // Рассчитать стоимость
  const calculatePrice = (): number => {
    let price = basePrices[config.type as keyof typeof basePrices] || 1000;

    // Цена за вес (пример)
    const weightPrices: Record<string, number> = {
      '0.5 кг': 0,
      '1 кг': 0,
      '1.5 кг': 500,
      '2 кг': 1000,
      '2.5 кг': 1500,
      '3 кг': 2000,
    };
    price += weightPrices[config.weight] || 0;

    // Надбавка за ярусы
    if (config.tiers > 1) {
      price += surcharges.tier * (config.tiers - 1);
    }

    // Надбавка за декор
    const decorationPrice = surcharges.decoration[config.decoration as keyof typeof surcharges.decoration] || 0;
    price += decorationPrice;

    // Надбавка за покрытие
    const coatingPrice = surcharges.coating[config.coating as keyof typeof surcharges.coating] || 0;
    price += coatingPrice;

    // Надбавка за начинки (пример: 100 руб. за каждую)
    price += config.fillings.length * 100;

    return price;
  };

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
      case 'tiers':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите количество ярусов</h3>
            <div className="flex justify-center space-x-6 my-6">
              {[1, 2, 3].map(tier => (
                <button
                  key={tier}
                  onClick={() => updateConfig('tiers', tier)}
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold transition ${
                    config.tiers === tier
                      ? 'border-chocolate bg-chocolate text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  aria-label={`Выбрать ${tier} ярус${tier === 1 ? '' : tier === 2 ? 'а' : 'ов'}`}
                >
                  {tier}
                </button>
              ))}
            </div>
            <div className="text-center text-gray-600">
              {config.tiers === 1 && 'Один ярус - классический торт'}
              {config.tiers === 2 && 'Два яруса - торжественный вид'}
              {config.tiers === 3 && 'Три яруса - максимальный эффект'}
            </div>
          </div>
        );
      case 'decoration':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите декор</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: 'flowers', label: 'Цветы', icon: '🌸' },
                { name: 'fruits', label: 'Фрукты', icon: '🍓' },
                { name: 'chocolate', label: 'Шоколад', icon: '🍫' },
                { name: 'berries', label: 'Ягоды', icon: '🫐' },
                { name: 'nuts', label: 'Орехи', icon: '🥜' },
                { name: 'confetti', label: 'Конфетти', icon: '🎉' },
                { name: 'inscription', label: 'Надписи', icon: '✍️' },
                { name: 'figurines', label: 'Фигурки', icon: '🧸' }
              ].map(decoration => (
                <button
                  key={decoration.name}
                  onClick={() => updateConfig('decoration', decoration.name)}
                  className={`p-3 border rounded-lg text-center hover:border-chocolate transition flex flex-col items-center ${
                    config.decoration === decoration.name ? 'border-chocolate bg-rose-50 font-bold' : 'border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{decoration.icon}</div>
                  <div className="text-xs">{decoration.label}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'coating':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'cream', label: 'Крем', description: 'Классический сливочный крем' },
                { name: 'marzipan', label: 'Мастика', description: 'Гладкое покрытие для идеальных форм' },
                { name: 'glaze', label: 'Глазурь', description: 'Блестящее зеркальное покрытие' },
                { name: 'chocolate', label: 'Шоколад', description: 'Ганаш или темперированный шоколад' },
                { name: 'meringue', label: 'Меренга', description: 'Воздушное итальянское покрытие' }
              ].map(coating => (
                <button
                  key={coating.name}
                  onClick={() => updateConfig('coating', coating.name)}
                  className={`p-4 border rounded-lg text-left hover:border-chocolate transition ${
                    config.coating === coating.name ? 'border-chocolate bg-rose-50 font-bold' : 'border-gray-300'
                  }`}
                >
                  <div className="font-bold">{coating.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{coating.description}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'colors':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите цвета (до 2)</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-3">
              {[
                '#FF69B4', '#FF1493', '#FF6347', '#FF4500', '#FFD700', '#FFA500',
                '#ADFF2F', '#32CD32', '#00FF7F', '#00CED1', '#1E90FF', '#4169E1',
                '#8A2BE2', '#9370DB', '#FFB6C1', '#F5DEB3', '#FFFFFF', '#000000'
              ].map(color => (
                <div
                  key={color}
                  onClick={() => {
                    const currentColors = [...config.colors];
                    if (currentColors.includes(color)) {
                      updateConfig('colors', currentColors.filter(c => c !== color));
                    } else if (currentColors.length < 2) {
                      updateConfig('colors', [...currentColors, color]);
                    }
                  }}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer transition ${
                    config.colors.includes(color) ? 'border-chocolate ring-2 ring-chocolate' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Выбрать цвет ${color}`}
                >
                  {config.colors.includes(color) && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Выбрано: {config.colors.length}/2 цвета
            </div>
          </div>
        );
      case 'date':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Выберите дату события</h3>
            <div className="max-w-md mx-auto">
              <input
                type="date"
                value={config.date}
                onChange={(e) => updateConfig('date', e.target.value)}
                min={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Минимум за 3 дня
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-chocolate focus:border-chocolate"
              />
              <div className="mt-4 text-sm text-gray-600">
                ⚠️ Заказ на дату менее чем за 3 дня возможен только по телефону
              </div>
            </div>
          </div>
        );
      case 'sketch':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Загрузите эскиз (опционально)</h3>
            <div className="max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {config.sketch ? (
                <div>
                  <div className="text-green-600 mb-2">✓ Файл загружен</div>
                  <div className="text-sm text-gray-600 truncate">{config.sketch.name}</div>
                  <button
                    onClick={() => updateConfig('sketch', null)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Удалить
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-4">📁</div>
                  <p className="mb-4">Перетащите файл сюда или нажмите для выбора</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // В реальном приложении здесь будет загрузка на сервер
                        updateConfig('sketch', e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="sketch-upload"
                  />
                  <label
                    htmlFor="sketch-upload"
                    className="btn-secondary cursor-pointer" // Убедитесь, что этот класс определен в globals.css
                  >
                    Выбрать файл
                  </label>
                  <div className="mt-2 text-sm text-gray-600">
                    Поддерживаемые форматы: JPG, PNG, до 5 МБ
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'comment':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Добавьте комментарий к заказу</h3>
            <div className="max-w-2xl mx-auto">
              <textarea
                value={config.comment}
                onChange={(e) => updateConfig('comment', e.target.value)}
                placeholder="Например: сделать надпись 'С Днем Рождения!' крупными буквами"
                rows={5}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-chocolate focus:border-chocolate resize-none"
                maxLength={500}
              />
              <div className="mt-2 text-sm text-gray-600 text-right">
                {config.comment.length}/500 символов
              </div>
            </div>
          </div>
        );
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
  const totalPrice = calculatePrice(); // Рассчитываем цену для отображения

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
          {/* Отображение итоговой цены на каждом шаге (кроме первого) */}
          {currentIndex > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Примерная стоимость:</span>
                <span className="text-xl font-bold text-chocolate">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">* Окончательная цена будет уточнена после обработки заказа.</p>
            </div>
          )}
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
