// frontend/components/Cart.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// Определим интерфейс для товара в корзине
export interface CartItem {
  id: number; // Уникальный ID элемента корзины
  productId?: number; // ID продукта из каталога (опционально, если стандартный товар)
  name: string;
  price: number; // Цена за единицу
  quantity: number;
  image?: string; // URL изображения (опционально)
  // Для тортов из конструктора или специфичных товаров
  customCakeConfig?: any; // Конфигурация пользовательского торта (или более конкретный тип)
  // Можно добавить другие поля, например, выбранная начинка, вес и т.д., если они влияют на цену/описание
}

// Определим тип для функции добавления в корзину
export type AddToCartFunction = (item: Omit<CartItem, 'quantity'>) => void;

// --- Логика корзины как хук для переиспользования ---
const useCart = () => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка корзины из localStorage
  const loadCart = useCallback(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        // Базовая валидация
        if (Array.isArray(parsedCart)) {
          setCartItemsState(parsedCart);
        } else {
          console.warn('Некорректные данные корзины в localStorage, сброс до пустой корзины.');
          setCartItemsState([]);
          localStorage.removeItem('cart'); // Очищаем некорректные данные
        }
      }
    } catch (err) {
      console.error('Ошибка при загрузке корзины из localStorage:', err);
      // В случае ошибки парсинга, начинаем с пустой корзины
      setCartItemsState([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Сохранение корзины в localStorage
  const saveCart = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
      // Dispatch события для синхронизации между вкладками
      window.dispatchEvent(new StorageEvent('cart_update', { // Используем уникальное имя события
        key: 'cart',
        newValue: JSON.stringify(items)
      }));
    } catch (err) {
      console.error('Ошибка при сохранении корзины в localStorage:', err);
      // Можно показать пользователю уведомление об ошибке сохранения
    }
  }, []);

  // Инициализация и слушатели
  useEffect(() => {
    loadCart();

    const handleStorageChange = (event: StorageEvent) => {
      // Прослушиваем наше кастомное событие или изменения в localStorage
      if ((event.key === 'cart' && event.type === 'cart_update') || (event.key === 'cart' && event.type === 'storage')) {
        try {
          const newValue = event.newValue;
          if (newValue === null) {
            setCartItemsState([]);
          } else {
            const parsedItems = JSON.parse(newValue);
            if (Array.isArray(parsedItems)) {
              setCartItemsState(parsedItems);
            }
          }
        } catch (err) {
          console.error('Ошибка при обновлении корзины из StorageEvent:', err);
        }
      }
    };

    window.addEventListener('cart_update', handleStorageChange as EventListener); // Приведение типа
    // Также слушаем прямые изменения localStorage (на случай других вкладок)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('cart_update', handleStorageChange as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadCart]);

  // --- Функции управления корзиной ---
  const setCartItems = useCallback((items: CartItem[] | ((prevItems: CartItem[]) => CartItem[])) => {
    if (typeof items === 'function') {
      setCartItemsState(prevItems => {
        const newItems = items(prevItems);
        saveCart(newItems);
        return newItems;
      });
    } else {
      setCartItemsState(items);
      saveCart(items);
    }
  }, [saveCart]);

  const addToCart: AddToCartFunction = useCallback((item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      let updatedItems;

      if (existingItemIndex >= 0) {
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
      } else {
        updatedItems = [...prevItems, { ...item, quantity: 1 }];
      }
      return updatedItems;
    });
  }, [setCartItems]);

  const removeFromCart = useCallback((itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, [setCartItems]);

  const updateQuantity = useCallback((itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart, setCartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    loadCart, // Может быть полезно для ручной перезагрузки
  };
};

// --- Компонент корзины ---
const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    cartItems,
    isLoading,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  // Закрытие корзины при клике вне её
  const handleClickOutside = useCallback((event: globalThis.MouseEvent) => { // Используем globalThis.MouseEvent
    if (
      isOpen &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  // Обработчики для кнопок
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (isLoading) {
    return (
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={handleOpen}
          className="p-2 text-chocolate hover:text-dark-chocolate relative"
          aria-label="Корзина"
          aria-expanded={isOpen}
          aria-controls={isOpen ? "cart-modal" : undefined} // Условный атрибут
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-gold text-chocolate text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    );
  }

  const totalItems = getTotalItems();

  return (
    <div className="relative">
      {/* Кнопка корзины в навигации */}
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="p-2 text-chocolate hover:text-dark-chocolate relative"
        aria-label="Корзина"
        aria-expanded={isOpen}
        aria-controls={isOpen ? "cart-modal" : undefined} // Условный атрибут
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-gold text-chocolate text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Модальное окно корзины */}
      {isOpen && (
        <div
          // id="cart-modal" // Не используем id для стилизации, только для aria
          ref={modalRef}
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          aria-describedby="cart-description" // Добавим описание
        >
          <div className="modal-content">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 id="cart-title" className="text-xl font-bold">Ваша корзина</h2>
                <p id="cart-description" className="text-sm text-gray-500 sr-only">Просмотр и управление товарами в корзине</p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Закрыть корзину"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="mt-4 text-gray-600">Ваша корзина пуста</p>
                  <Link
                    href="/catalog"
                    onClick={handleClose}
                    className="mt-4 inline-block btn-primary"
                    aria-label="Перейти в каталог товаров"
                  >
                    Перейти в каталог
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-gray-200" aria-label="Список товаров в корзине">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name} // Альтернативный текст важен для доступности
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/placeholder-product.jpg'; // Убедитесь, что этот файл существует
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs" aria-label={`Изображение для ${item.name} отсутствует`}>
                              Нет фото
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Цена за шт: {item.price.toLocaleString('ru-RU')} ₽</p>
                            {item.customCakeConfig && (
                              <p className="mt-1 text-xs text-gray-400">Конструктор</p> // Индикатор для кастомных товаров
                            )}
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm mt-2">
                            <div className="flex items-center border rounded-md" role="group" aria-label={`Изменить количество ${item.name}`}>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-chocolate"
                                aria-label={`Уменьшить количество ${item.name}`}
                                disabled={item.quantity <= 1} // Отключаем кнопку "-"
                              >
                                &minus;
                              </button>
                              <span className="px-3 py-1" aria-live="polite">{item.quantity}</span> {/* aria-live для озвучки изменений скринридером */}
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-chocolate"
                                aria-label={`Увеличить количество ${item.name}`}
                              >
                                &#43;
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-chocolate hover:text-dark-chocolate focus:outline-none focus:underline"
                              aria-label={`Удалить ${item.name} из корзины`}
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gray-200 py-4 mt-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Итого</p>
                      <p>{getTotalPrice().toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Доставка и налоги рассчитываются при оформлении заказа.</p>
                    <div className="mt-6">
                      <Link
                        href="/checkout" // Убедитесь, что маршрут /checkout существует
                        onClick={handleClose}
                        className="btn-primary block w-full text-center"
                        aria-label="Перейти к оформлению заказа"
                      >
                        Оформить заказ
                      </Link>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={clearCart}
                        className="text-sm font-medium text-chocolate hover:text-dark-chocolate focus:outline-none focus:underline"
                        aria-label="Очистить всю корзину"
                      >
                        Очистить корзину
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Экспортируем компонент и хук для использования в других частях приложения
// Например, чтобы добавлять товары в корзину из ProductCard
export { useCart };
export default Cart;
