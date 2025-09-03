import React from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Функция для обработки ошибок загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://placehold.co/300x300/f580a2/FFFFFF?text=Нет+изображения';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative pb-[100%]"> {/* Соотношение сторон 1:1 */}
          <img
            src={product.image || '/images/placeholder-product.jpg'}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <Link href={`/product/${product.id}`} className="hover:text-primary-color transition-colors">
            {product.name}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-color">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>

          <button className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-dark-color transition-colors text-sm">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
