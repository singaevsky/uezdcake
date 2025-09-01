// frontend/components/Slider.tsx
import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

interface SliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const Slider: React.FC<SliderProps> = ({ slides, autoPlay = true, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (autoPlay && !isPaused) {
      interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, autoPlayInterval, goToNext, isPaused]);

  if (slides.length === 0) {
    return <div className="bg-gray-200 h-64 flex items-center justify-center">Слайды отсутствуют</div>;
  }

  return (
    <div
      className="slider-container relative w-full overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="slider-slide relative">
            {slide.image ? (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            ) : (
              <div className="bg-gray-200 w-full h-64 md:h-96 flex items-center justify-center">
                Изображение отсутствует
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="text-white p-6 md:p-12 max-w-lg">
                <h2 className="text-2xl md:text-4xl font-serif font-bold mb-2">{slide.title}</h2>
                <p className="mb-4 text-sm md:text-base">{slide.description}</p>
                {slide.ctaText && slide.ctaLink && (
                  <a
                    href={slide.ctaLink}
                    className="btn-primary inline-block"
                  >
                    {slide.ctaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      <button
        className="slider-button slider-button-prev"
        onClick={goToPrev}
        aria-label="Предыдущий слайд"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        className="slider-button slider-button-next"
        onClick={goToNext}
        aria-label="Следующий слайд"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Индикаторы */}
      <div className="slider-dots absolute bottom-4 left-1/2 transform -translate-x-1/2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
