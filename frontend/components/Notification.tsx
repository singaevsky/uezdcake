// frontend/components/Notification.js
import React, { useState } from 'react';

const NotificationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "Добро пожаловать!", body: "Это тестовое уведомление.", read: false }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed bottom-24 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-chocolate text-white p-3 rounded-full shadow-lg relative"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border">
          <div className="p-4 border-b">
            <h3 className="font-bold">Уведомления</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Нет уведомлений
              </div>
            ) : (
              notifications.map(notification => (
                <div key={notification.id} className="p-4 border-b">
                  <div className="font-bold">{notification.title}</div>
                  <div className="text-sm text-gray-600">{notification.body}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ВАЖНО: Экспорт по умолчанию
export default NotificationComponent;
