import React from 'react';
import Link from 'next/link';
import { useCart, CartItem, Product } from 'types/cart';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const uniqueCartItemId: string = uuidv4();
    const itemToAdd: Omit<CartItem, 'quantity'> = {
      id: uniqueCartItemId,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      customCakeConfig: {},
    };

    addToCart(itemToAdd);
    toast.success(`Добавлен товар "${product.name}" в корзину!`, {
      style: {
        background: '#FFF7ED',
        color: '#4A2C2A',
      },
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {product.image ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
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
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description || 'Нет описания'}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-chocolate">
            от {product.price.toLocaleString('ru-RU')} ₽
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-chocolate text-cream px-4 py-2 rounded-md hover:bg-dark-chocolate transition-colors"
            aria-label={`Добавить ${product.name} в корзину`}
          >
            В корзину
          </button>
        </div>
        <Link
          href={product.id ? `/product/${product.id}` : '#'}
          className={`text-mint hover:text-chocolate text-sm font-medium mt-2 inline-block ${
            !product.id ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          Подробнее →
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
