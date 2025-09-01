// frontend/components/ProductCard.tsx
import React from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  // Добавим вес и начинки для демонстрации
  weight_options?: { weight: string; price: number }[];
  fillings?: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    // Логика добавления в корзину
    console.log(`Добавлен товар ${product.name} в корзину`);
    // Здесь будет вызов функции из cartAPI
  };

  return (
    <div className="product-card fade-in">
      {product.image ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={product.image || '/images/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-product.jpg';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Изображение отсутствует</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-serif font-bold text-chocolate mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-chocolate">от {product.price} ₽</span>
          <button
            onClick={handleAddToCart}
            className="bg-gold hover:bg-opacity-90 text-chocolate text-sm font-bold py-1 px-3 rounded-full transition"
          >
            В корзину
          </button>
        </div>
        <Link href={`/product/${product.id}`} className="text-mint hover:text-chocolate text-sm font-medium mt-2 inline-block">
          Подробнее →
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
