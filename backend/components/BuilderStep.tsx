import React from 'react';

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
              {['День рождения', 'Свадьба', '8 Марта', 'Корпоратив'].map(event => (
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
              {['Торт', 'Бенто', 'Капкейки'].map(type => (
                <button
                  key={type}
                  onClick={() => updateFormData('type', type)}
                  className={`p-6 border rounded-lg text-center hover:border-chocolate transition ${
                    formData.type === type ? 'border-chocolate bg-rose-50' : 'border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );

      // Добавить остальные шаги...

      default:
        return <div>Шаг {step}</div>;
    }
  };

  return <div>{renderStep()}</div>;
};
