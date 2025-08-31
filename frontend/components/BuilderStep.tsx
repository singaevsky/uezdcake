import React, { useState } from 'react';

interface FormData {
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

interface BuilderStepProps {
  step: number;
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export const BuilderStep: React.FC<BuilderStepProps> = ({ step, formData, updateFormData }) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите событие</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['День рождения', 'Свадьба', '8 Марта', 'Корпоратив', 'Юбилей', 'Детский праздник'].map(event => (
                <button
                  key={event}
                  onClick={() => updateFormData('event', event)}
                  className={`p-4 border rounded-lg text-center hover:border-chocolate transition ${
                    formData.event === event ? 'border-chocolate bg-rose-50' : 'border-gray-300'
                  }`}
                >
                  {event}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите тип</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Торт', icon: '🎂' },
                { name: 'Бенто', icon: '🍱' },
                { name: 'Капкейки', icon: '🧁' },
                { name: 'Макарон', icon: '🍪' },
                { name: 'Пирожное', icon: '🍰' },
                { name: 'Кекс', icon: '🥮' }
              ].map(item => (
                <button
                  key={item.name}
                  onClick={() => updateFormData('type', item.name)}
                  className={`p-6 border rounded-lg text-center hover:border-chocolate transition ${
                    formData.type === item.name ? 'border-chocolate bg-rose-50' : 'border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div>{item.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите форму</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  onClick={() => updateFormData('shape', shape.name)}
                  className={`p-4 border rounded-lg text-center hover:border-chocolate transition ${
                    formData.shape === shape.name ? 'border-chocolate bg-rose-50' : 'border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{shape.icon}</div>
                  <div className="text-sm">{shape.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите вес/порции</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  onClick={() => updateFormData('weight', item.weight)}
                  className={`p-4 border rounded-lg text-center hover:border-chocolate transition ${
                    formData.weight === item.weight ? 'border-chocolate bg-rose-50' : 'border-gray-300'
                  }`}
                >
                  <div className="font-bold">{item.weight}</div>
                  <div className="text-sm text-gray-600">{item.portions}</div>
                  <div className="text-sm text-chocolate">{item.price}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите начинки (до 3)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    const currentFillings = [...formData.fillings];
                    if (currentFillings.includes(filling)) {
                      updateFormData('fillings', currentFillings.filter(f => f !== filling));
                    } else if (currentFillings.length < 3) {
                      updateFormData('fillings', [...currentFillings, filling]);
                    }
                  }}
                  className={`p-3 border rounded-lg cursor-pointer transition ${
                    formData.fillings.includes(filling)
                      ? 'border-chocolate bg-rose-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                      formData.fillings.includes(filling) ? 'bg-chocolate border-chocolate' : 'border-gray-400'
                    }`}>
                      {formData.fillings.includes(filling) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span>{filling}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Выбрано: {formData.fillings.length}/3 начинок
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите количество ярусов</h2>
            <div className="flex justify-center space-x-6">
              {[1, 2, 3].map(tier => (
                <button
                  key={tier}
                  onClick={() => updateFormData('tiers', tier)}
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold transition ${
                    formData.tiers === tier
                      ? 'border-chocolate bg-chocolate text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-gray-600">
              {formData.tiers === 1 && 'Один ярус - классический торт'}
              {formData.tiers === 2 && 'Два яруса - торжественный вид'}
              {formData.tiers === 3 && 'Три яруса - максимальный эффект'}
            </div>
          </div>
        );

      case 7:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите декор</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Цветы', icon: '🌸' },
                { name: 'Фрукты', icon: '🍓' },
                { name: 'Шоколад', icon: '🍫' },
                { name: 'Ягоды', icon: '🫐' },
                { name: 'Орехи', icon: '🥜' },
                { name: 'Конфетти', icon: '🎉' },
                { name: 'Надписи', icon: '✍️' },
                { name: 'Фигурки', icon: '🧸' }
              ].map(decoration => (
                <button
                  key={decoration.name}
                  onClick={() => updateFormData('decoration', decoration.name)}
                  className={`p-4 border rounded-lg text-center hover:border-chocolate transition ${
                    formData.decoration === decoration.name ? 'border-chocolate bg-rose-50' : 'border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{decoration.icon}</div>
                  <div className="text-sm">{decoration.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите покрытие</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Крем', description: 'Классический сливочный крем' },
                { name: 'Мастика', description: 'Гладкое покрытие для идеальных форм' },
                { name: 'Глазурь', description: 'Блестящее зеркальное покрытие' },
                { name: 'Марципан', description: 'Натуральное покрытие из миндаля' },
                { name: 'Шоколад', description: 'Ганаш или темперированный шоколад' },
                { name: 'Меренга', description: 'Воздушное итальянское покрытие' }
              ].map(coating => (
                <button
                  key={coating.name}
                  onClick={() => updateFormData('coating', coating.name)}
                  className={`p-4 border rounded-lg text-left hover:border-chocolate transition ${
                    formData.coating === coating.name ? 'border-chocolate bg-rose-50' : 'border-gray-300'
                  }`}
                >
                  <div className="font-bold">{coating.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{coating.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите цвета (до 2)</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                '#FF69B4', '#FF1493', '#FF6347', '#FF4500', '#FFD700', '#FFA500',
                '#ADFF2F', '#32CD32', '#00FF7F', '#00CED1', '#1E90FF', '#4169E1',
                '#8A2BE2', '#9370DB', '#FF69B4', '#F5DEB3', '#FFFFFF', '#000000'
              ].map(color => (
                <div
                  key={color}
                  onClick={() => {
                    const currentColors = [...formData.colors];
                    if (currentColors.includes(color)) {
                      updateFormData('colors', currentColors.filter(c => c !== color));
                    } else if (currentColors.length < 2) {
                      updateFormData('colors', [...currentColors, color]);
                    }
                  }}
                  className={`w-12 h-12 rounded-full border-2 cursor-pointer transition ${
                    formData.colors.includes(color) ? 'border-chocolate ring-2 ring-chocolate' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {formData.colors.includes(color) && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Выбрано: {formData.colors.length}/2 цвета
            </div>
          </div>
        );

      case 10:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Выберите дату события</h2>
            <div className="max-w-md mx-auto">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateFormData('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate"
              />
              <div className="mt-4 text-sm text-gray-600">
                ⚠️ Заказ на дату менее чем за 3 дня возможен только по телефону
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Загрузите эскиз (опционально)</h2>
            <div className="max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {formData.sketch ? (
                <div>
                  <div className="text-green-600 mb-2">✓ Файл загружен</div>
                  <div className="text-sm text-gray-600">{formData.sketch.name}</div>
                  <button
                    onClick={() => updateFormData('sketch', null)}
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
                        updateFormData('sketch', e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="sketch-upload"
                  />
                  <label
                    htmlFor="sketch-upload"
                    className="bg-chocolate text-white px-4 py-2 rounded cursor-pointer hover:bg-opacity-90 transition"
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

      case 12:
        return (
          <div>
            <h2 className="text-2xl font-serif mb-6">Добавьте комментарий к заказу</h2>
            <div className="max-w-2xl mx-auto">
              <textarea
                value={formData.comment}
                onChange={(e) => updateFormData('comment', e.target.value)}
                placeholder="Например: сделать надпись 'С Днем Рождения!' крупными буквами"
                rows={5}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-chocolate resize-none"
              />
              <div className="mt-2 text-sm text-gray-600 text-right">
                {formData.comment.length}/500 символов
              </div>
            </div>
          </div>
        );

      default:
        return <div>Шаг {step}</div>;
    }
  };

  return <div>{renderStep()}</div>;
};
