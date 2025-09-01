// frontend/components/Cart.js
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Простая имитация корзины
  useEffect(() => {
    const savedItems = localStorage.getItem('cart');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error('Ошибка при парсинге корзины из localStorage', e);
      }
    }
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-chocolate text-white p-4 rounded-full shadow-lg z-50"
      >
        🛒 Корзина ({itemCount})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif">Корзина</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl"
                >
                  &times;
                </button>
              </div>
              {items.length === 0 ? (
                <p>Корзина пуста</p>
              ) : (
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>{item.name} x {item.quantity}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ВАЖНО: Экспорт по умолчанию
export default Cart;
