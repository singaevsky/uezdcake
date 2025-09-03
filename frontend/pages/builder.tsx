
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import apiClient from '@/lib/apiClient';
import { useCart, CartItem } from 'types/cart';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

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
  sketchUrl?: string;
  comment: string;
}

interface Option {
   name: string;
  label?: string;
  icon?: string;
  description?: string;
  price?: number;
  portions?: string; // добавлено свойство portions для опций веса
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
    sketchUrl: '',
    comment: '',
  });
  const [options, setOptions] = useState<{
    events: Option[];
    types: Option[];
    shapes: Option[];
    weights: Option[];
    fillings: Option[];
    decorations: Option[];
    coatings: Option[];
  }>({
    events: [],
    types: [],
    shapes: [],
    weights: [],
    fillings: [],
    decorations: [],
    coatings: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

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
    { id: 'comment', title: 'Комментарий' },
  ];

  const fetchOptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getBuilderOptions();
      setOptions(response || {
        events: [
          { name: 'День рождения' },
          { name: 'Свадьба' },
          { name: 'Юбилей' },
          { name: 'Корпоратив' },
          { name: '8 Марта' },
          { name: 'Детский праздник' },
        ],
        types: [
          { name: 'Торт', icon: '🎂', price: 1000 },
          { name: 'Бенто-торт', icon: '🍱', price: 500 },
          { name: 'Капкейки', icon: '🧁', price: 100 },
          { name: 'Макарон', icon: '🍪', price: 50 },
          { name: 'Пирожное', icon: '🍰', price: 300 },
          { name: 'Кекс', icon: '🥮', price: 200 },
        ],
        shapes: [
          { name: 'Круг', icon: '⭕' },
          { name: 'Квадрат', icon: '⬜' },
          { name: 'Сердце', icon: '❤️' },
          { name: 'Прямоугольник', icon: '▭' },
          { name: 'Ромб', icon: '💎' },
          { name: 'Звезда', icon: '⭐' },
          { name: 'Овал', icon: '🥚' },
          { name: 'Произвольная', icon: '✏️' },
        ],
        weights: [
          { name: '0.5 кг', portions: '4 порции', price: 0 },
          { name: '1 кг', portions: '8 порций', price: 0 },
          { name: '1.5 кг', portions: '12 порций', price: 500 },
          { name: '2 кг', portions: '16 порций', price: 1000 },
          { name: '2.5 кг', portions: '20 порций', price: 1500 },
          { name: '3 кг', portions: '24 порций', price: 2000 },
        ],
        fillings: [
          { name: 'Шоколадная с арахисом и карамелью', price: 100 },
          { name: 'Творожно-ягодная', price: 100 },
          { name: 'Ванильная с фруктами', price: 100 },
          { name: 'Ореховая с медом', price: 100 },
          { name: 'Крем-брюле', price: 100 },
          { name: 'Малиновая с маком', price: 100 },
          { name: 'Кофейная с шоколадом', price: 100 },
          { name: 'Лимонная с малиной', price: 100 },
          { name: 'Банановая с карамелью', price: 100 },
          { name: 'Клубничная с сливками', price: 100 },
          { name: 'Апельсиновая с шоколадом', price: 100 },
          { name: 'Фисташковая с малиной', price: 100 },
        ],
        decorations: [
          { name: 'flowers', label: 'Цветы', icon: '🌸', price: 300 },
          { name: 'fruits', label: 'Фрукты', icon: '🍓', price: 200 },
          { name: 'chocolate', label: 'Шоколад', icon: '🍫', price: 250 },
          { name: 'berries', label: 'Ягоды', icon: '🫐', price: 150 },
          { name: 'nuts', label: 'Орехи', icon: '🥜', price: 100 },
          { name: 'confetti', label: 'Конфетти', icon: '🎉', price: 50 },
          { name: 'inscription', label: 'Надписи', icon: '✍️', price: 200 },
          { name: 'figurines', label: 'Фигурки', icon: '🧸', price: 400 },
        ],
        coatings: [
          { name: 'cream', label: 'Крем', description: 'Классический сливочный крем', price: 0 },
          { name: 'marzipan', label: 'Мастика', description: 'Гладкое покрытие для идеальных форм', price: 200 },
          { name: 'glaze', label: 'Глазурь', description: 'Блестящее зеркальное покрытие', price: 150 },
          { name: 'chocolate', label: 'Шоколад', description: 'Ганаш или темперированный шоколад', price: 300 },
          { name: 'meringue', label: 'Меренга', description: 'Воздушное итальянское покрытие', price: 100 },
        ],
      });
    } catch (err: any) {
      console.error('Error fetching builder options:', err);
      setError(err.message || 'Не удалось загрузить опции конструктора');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const calculatePrice = (): number => {
    const typeOption = options.types.find((opt) => opt.name === config.type);
    let price = typeOption?.price || 1000;

    const weightOption = options.weights.find((opt) => opt.name === config.weight);
    price += weightOption?.price || 0;

    if (config.tiers > 1) {
      price += 500 * (config.tiers - 1);
    }

    const decorationOption = options.decorations.find((opt) => opt.name === config.decoration);
    price += decorationOption?.price || 0;

    const coatingOption = options.coatings.find((opt) => opt.name === config.coating);
    price += coatingOption?.price || 0;

    price += config.fillings.reduce((sum, filling) => {
      const fillingOption = options.fillings.find((opt) => opt.name === filling);
      return sum + (fillingOption?.price || 100);
    }, 0);

    return price;
  };

  const updateConfig = (field: keyof CakeConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const submitOrder = async () => {
    try {
      let sketchUrl = config.sketchUrl;
      if (config.sketch) {
        const formData = new FormData();
        formData.append('file', config.sketch);
        const response = await apiClient.uploadSketch(formData);
        sketchUrl = response.url;
      }

      const order = {
        ...config,
        sketchUrl,
        totalPrice: calculatePrice(),
      };

      await apiClient.createCustomOrder(order);
      const itemToAdd: Omit<CartItem, 'quantity'> = {
        id: uuidv4(),
        productId: 0,
        name: `Индивидуальный ${config.type || 'торт'}`,
        price: calculatePrice(),
        image: sketchUrl || '/images/custom-cake.jpg',
        description: config.comment || 'Индивидуальный торт, созданный в конструкторе',
        category: 'custom',
        customCakeConfig: config,
      };

      addToCart(itemToAdd);
      toast.success('Заказ успешно оформлен и добавлен в корзину!', {
        style: {
          background: '#FFF7ED',
          color: '#4A2C2A',
        },
      });

      setConfig({
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
        sketchUrl: '',
        comment: '',
      });
      setCurrentStep('event');
    } catch (err: any) {
      console.error('Error submitting order:', err);
      toast.error('Ошибка при оформлении заказа: ' + (err.message || 'Попробуйте снова'), {
        style: {
          background: '#FFF7ED',
          color: '#4A2C2A',
        },
      });
    }
  };

  const renderStepContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="animate-pulse text-chocolate">Загрузка опций...</div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-dark-chocolate mb-2">Ошибка загрузки</h3>
          <p className="text-chocolate mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchOptions();
            }}
            className="bg-chocolate text-cream px-4 py-2 rounded-md hover:bg-dark-chocolate transition-colors"
          >
            Повторить попытку
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 'event':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите событие</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {options.events.map((event) => (
                <button
                  key={event.name}
                  className={`p-3 border rounded-lg text-center hover:border-chocolate transition ${
                    config.event === event.name
                      ? 'border-chocolate bg-cream font-bold'
                      : 'border-gray-300'
                  }`}
                  onClick={() => updateConfig('event', event.name)}
                >
                  {event.name}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'type':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите тип десерта</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {options.types.map((item) => (
                <button
                  key={item.name}
                  className={`p-4 border rounded-lg text-center hover:border-chocolate transition flex flex-col items-center ${
                    config.type === item.name
                      ? 'border-chocolate bg-cream font-bold'
                      : 'border-gray-300'
                  }`}
                  onClick={() => updateConfig('type', item.name)}
                >
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <span>{item.name}</span>
                  <span className="text-sm text-chocolate">{item.price} ₽</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'shape':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите форму</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {options.shapes.map((shape) => (
                <button
                  key={shape.name}
                  className={`p-3 border rounded-lg text-center hover:border-chocolate transition ${
                    config.shape === shape.name
                      ? 'border-chocolate bg-cream font-bold'
                      : 'border-gray-300'
                  }`}
                  onClick={() => updateConfig('shape', shape.name)}
                >
                  <div className="text-xl mb-1">{shape.icon}</div>
                  <div className="text-xs">{shape.name}</div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'weight':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите вес/порции</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {options.weights.map((item) => (
                <button
                  key={item.name}
                  className={`p-3 border rounded-lg text-center hover:border-chocolate transition ${
                    config.weight === item.name
                      ? 'border-chocolate bg-cream font-bold'
                      : 'border-gray-300'
                  }`}
                  onClick={() => updateConfig('weight', item.name)}
                >
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.portions}</div>
                  <div className="text-xs text-chocolate">+{item.price} ₽</div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'fillings':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите начинки (до 3)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2">
              {options.fillings.map((filling) => (
                <div
                  key={filling.name}
                  onClick={() => {
                    const currentFillings = [...config.fillings];
                    if (currentFillings.includes(filling.name)) {
                      updateConfig('fillings', currentFillings.filter((f) => f !== filling.name));
                    } else if (currentFillings.length < 3) {
                      updateConfig('fillings', [...currentFillings, filling.name]);
                    }
                  }}
                  className={`p-3 border rounded-lg cursor-pointer transition ${
                    config.fillings.includes(filling.name)
                      ? 'border-chocolate bg-cream'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        config.fillings.includes(filling.name)
                          ? 'bg-chocolate border-chocolate'
                          : 'border-gray-400'
                      }`}
                    >
                      {config.fillings.includes(filling.name) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span className="text-sm">{filling.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Выбрано: {config.fillings.length}/3 начинок
            </div>
          </motion.div>
        );
      case 'tiers':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите количество ярусов</h3>
            <div className="flex justify-center space-x-6 my-6">
              {[1, 2, 3].map((tier) => (
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
          </motion.div>
        );
      case 'decoration':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите декор</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {options.decorations.map((decoration) => (
                <button
                  key={decoration.name}
                  onClick={() => updateConfig('decoration', decoration.name)}
                  className={`p-3 border rounded-lg text-center hover:border-chocolate transition flex flex-col items-center ${
                    config.decoration === decoration.name
                      ? 'border-chocolate bg-cream font-bold'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{decoration.icon}</div>
                  <div className="text-xs">{decoration.label}</div>
                  <div className="text-xs text-chocolate">+{decoration.price} ₽</div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'coating':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {options.coatings.map((coating) => (
                <button
                  key={coating.name}
                  onClick={() => updateConfig('coating', coating.name)}
                  className={`p-4 border rounded-lg text-left hover:border-chocolate transition ${
                    config.coating === coating.name
                      ? 'border-chocolate bg-cream font-bold'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="font-bold">{coating.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{coating.description}</div>
                  <div className="text-xs text-chocolate mt-1">+{coating.price} ₽</div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'colors':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите цвета (до 2)</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-3">
              {[
                '#FF69B4',
                '#FF1493',
                '#FF6347',
                '#FF4500',
                '#FFD700',
                '#FFA500',
                '#ADFF2F',
                '#32CD32',
                '#00FF7F',
                '#00CED1',
                '#1E90FF',
                '#4169E1',
                '#8A2BE2',
                '#9370DB',
                '#FFB6C1',
                '#F5DEB3',
                '#FFFFFF',
                '#000000',
              ].map((color) => (
                <div
                  key={color}
                  onClick={() => {
                    const currentColors = [...config.colors];
                    if (currentColors.includes(color)) {
                      updateConfig('colors', currentColors.filter((c) => c !== color));
                    } else if (currentColors.length < 2) {
                      updateConfig('colors', [...currentColors, color]);
                    }
                  }}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer transition ${
                    config.colors.includes(color)
                      ? 'border-chocolate ring-2 ring-chocolate'
                      : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
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
          </motion.div>
        );
      case 'date':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Выберите дату события</h3>
            <div className="max-w-md mx-auto">
              <input
                type="date"
                value={config.date}
                onChange={(e) => updateConfig('date', e.target.value)}
                min={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-chocolate focus:border-chocolate"
              />
              <div className="mt-4 text-sm text-gray-600">
                ⚠️ Заказ на дату менее чем за 3 дня возможен только по телефону
              </div>
            </div>
          </motion.div>
        );
      case 'sketch':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Загрузите эскиз (опционально)</h3>
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
                  <p className="mb-4 text-gray-600">Перетащите файл сюда или нажмите для выбора</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updateConfig('sketch', e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="sketch-upload"
                  />
                  <label
                    htmlFor="sketch-upload"
                    className="inline-block bg-chocolate text-cream px-4 py-2 rounded-md hover:bg-dark-chocolate transition-colors cursor-pointer"
                  >
                    Выбрать файл
                  </label>
                  <div className="mt-2 text-sm text-gray-600">
                    Поддерживаемые форматы: JPG, PNG, до 5 МБ
                  </div>
                </>
              )}
            </div>
          </motion.div>
        );
      case 'comment':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-dark-chocolate mb-4">Добавить комментарий</h3>
            <div className="max-w-md mx-auto">
              <textarea
                value={config.comment}
                onChange={(e) => updateConfig('comment', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-chocolate focus:border-chocolate"
                rows={4}
                placeholder="Ваши пожелания или комментарии к заказу"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Уездный Кондитер - Конструктор торта</title>
        <meta name="description" content="Создайте свой уникальный торт" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-dark-chocolate mb-8 text-center">
          Конструктор торта
        </h1>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  steps.findIndex((s) => s.id === currentStep) >= index
                    ? 'text-chocolate'
                    : 'text-gray-400'
                }`}
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    steps.findIndex((s) => s.id === currentStep) >= index
                      ? 'border-chocolate bg-cream'
                      : 'border-gray-300'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="ml-2 text-sm">{step.title}</span>
                {index < steps.length - 1 && (
                  <span className="mx-2">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {renderStepContent()}
        </AnimatePresence>

        <div className="flex justify-between max-w-md mx-auto mt-8">
          <button
            onClick={prevStep}
            disabled={steps.findIndex((s) => s.id === currentStep) === 0}
            className="bg-gray-300 text-dark-chocolate px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-400 transition-colors"
          >
            Назад
          </button>
          {currentStep === 'comment' ? (
            <button
              onClick={submitOrder}
              className="bg-chocolate text-cream px-4 py-2 rounded-md hover:bg-dark-chocolate transition-colors"
            >
              Оформить заказ
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={
                !config[currentStep as keyof CakeConfig] ||
                (currentStep === 'fillings' && config.fillings.length === 0) ||
                (currentStep === 'colors' && config.colors.length === 0)
              }
              className="bg-chocolate text-cream px-4 py-2 rounded-md disabled:opacity-50 hover:bg-dark-chocolate transition-colors"
            >
              Далее
            </button>
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/catalog"
            className="text-mint hover:text-chocolate text-sm font-medium"
          >
            Вернуться в каталог
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CakeBuilder;
