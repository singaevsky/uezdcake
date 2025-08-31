import React, { useState } from 'react';
import { BuilderStep } from '../components/BuilderStep';

const CakeBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    event: '',
    type: '',
    shape: '',
    weight: '',
    fillings: [] as string[],
    tiers: 1,
    decoration: '',
    coating: '',
    colors: [] as string[],
    date: '',
    sketch: null as File | null,
    comment: ''
  });

  const steps = [
    'Событие',
    'Тип',
    'Форма',
    'Вес',
    'Начинки',
    'Ярусы',
    'Декор',
    'Покрытие',
    'Цвета',
    'Дата',
    'Эскиз',
    'Комментарий'
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif text-center mb-8">Конструктор тортов</h1>

        {/* Прогресс бар */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((stepName, index) => (
              <span
                key={index}
                className={`text-sm ${index + 1 <= step ? 'text-chocolate font-bold' : 'text-gray-400'}`}
              >
                {stepName}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-chocolate h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <BuilderStep
            step={step}
            formData={formData}
            updateFormData={updateFormData}
          />

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded disabled:opacity-50"
            >
              Назад
            </button>
            <button
              onClick={handleNext}
              disabled={step === steps.length}
              className="bg-chocolate text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
            >
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeBuilder;
