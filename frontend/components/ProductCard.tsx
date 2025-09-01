// frontend/components/ProductCard.tsx
import React from 'react';
import Link from 'next/link';
import { useCart, CartItem } from './Cart'; // 1. Импортируем хук и тип

interface Product {
  id: number; // ID из API/базы данных
  name: string;
  price: number;
  image: string;
  description: string;
  // Дополнительные поля, если нужны
  weight_options?: { weight: string; price: number }[];
  fillings?: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart(); // 2. Получаем функцию addToCart из хука

  const handleAddToCart = () => {
    // 3. Создаем уникальный числовой ID для элемента корзины
    // Date.now() возвращает миллисекунды, что обычно достаточно уникально
    // для клиентской генерации ID в рамках одной сессии.
    // Для продакшена лучше использовать более надежный UUID или ID от сервера.
    const uniqueCartItemId: number = Date.now(); // Будет числом

    // 4. Формируем объект товара для добавления в корзину в соответствии с типом CartItem
    const itemToAdd: Omit<CartItem, 'quantity'> = {
      // 5. Используем сгенерированный числовой ID
      id: uniqueCartItemId, // Теперь это number
      productId: product.id, // Сохраняем оригинальный ID продукта
      name: product.name,
      price: product.price,
      image: product.image,
      // customCakeConfig: {} // Оставляем пустым для стандартных товаров,
                             // можно заполнять для товаров из конструктора
    };

    // 6. Вызываем функцию из хука
    addToCart(itemToAdd);
    console.log(`Добавлен товар ${product.name} в корзину с ID элемента ${uniqueCartItemId}`);
    // Здесь можно добавить уведомление пользователю, например, с помощью toast-сообщения
  };

  return (
    // 7. Используем классы из globals.css для стилизации
    <div className="product-card fade-in">
      {product.image ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name} // Важно для доступности
            className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-105"
            // 8. Обработка ошибок загрузки изображения
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-product.jpg'; // Убедитесь, что файл существует
            }}
          />
        </div>
      ) : (
        // 9. Заглушка, если изображение отсутствует
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Изображение отсутствует</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-serif font-bold text-chocolate mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          {/* 10. Форматирование цены */}
          <span className="text-xl font-bold text-chocolate">от {product.price.toLocaleString('ru-RU')} ₽</span>
          {/* 11. Используем класс btn-primary из globals.css и добавляем aria-label */}
          <button
            onClick={handleAddToCart}
            // className="bg-gold hover:bg-opacity-90 text-chocolate text-sm font-bold py-1 px-3 rounded-full transition"
            className="btn-primary text-sm py-1 px-3" // Используем общий класс стилей кнопки
            aria-label={`Добавить ${product.name} в корзину`}
          >
            В корзину
          </button>
        </div>
        {/* 12. Ссылка на детальную страницу товара */}
        <Link href={`/product/${product.id}`} className="text-mint hover:text-chocolate text-sm font-medium mt-2 inline-block">
          Подробнее →
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
