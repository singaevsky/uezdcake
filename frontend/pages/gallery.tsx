import React, { useState } from 'react';
import Head from 'next/head';

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Моковые данные для галереи
  const galleryImages = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    src: `/gallery/image-${i + 1}.jpg`,
    alt: `Торт ${i + 1}`,
    category: ['Свадьбы', 'Дни рождения', 'Корпоративы', 'Детские'][i % 4]
  }));

  const categories = ['Все', 'Свадьбы', 'Дни рождения', 'Корпоративы', 'Детские'];

  return (
    <>
      <Head>
        <title>Галерея работ - Уездный кондитер</title>
        <meta name="description" content="Фотогалерея наших работ: свадебные торты, десерты, оформление" />
      </Head>

      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-serif text-center mb-12 text-chocolate">Галерея наших работ</h1>

          {/* Фильтры категорий */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition border-2 border-transparent hover:border-chocolate"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Галерея */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="bg-gray-200 aspect-square flex items-center justify-center">
                  <span className="text-gray-500">Фото {image.id}</span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-lg font-bold">{image.category}</span>
                </div>
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

          {/* Модальное окно просмотра */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <button
                  className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
                <div className="bg-gray-800 aspect-square flex items-center justify-center">
                  <span className="text-white text-2xl">Фото {selectedImage}</span>
                </div>
                <div className="text-white text-center mt-4">
                  <p>Торт {selectedImage}</p>
                  <p className="text-gray-300 text-sm mt-2">
                    {galleryImages.find(img => img.id === selectedImage)?.category}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
