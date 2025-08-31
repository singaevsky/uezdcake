// components/Notification.tsx
import React, { useState, useEffect } from 'react';
import { onMessageListener, requestNotificationPermission } from '../lib/firebase';
import { authAPI } from '../lib/auth';

interface Notification {
  id: number;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
}

export const NotificationComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Запрашиваем разрешение на уведомления
    requestNotificationPermission().then(token => {
      if (token && authAPI.isAuthenticated()) {
        // Отправляем токен на сервер для сохранения
        fetch('/api/users/notification-token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authAPI.getAccessToken()}`
          },
          body: JSON.stringify({ token })
        });
      }
    });

    // Слушаем входящие сообщения
    const unsubscribe = onMessageListener().then((payload: any) => {
      if (payload) {
        const newNotification = {
          id: Date.now(),
          title: payload.notification.title,
          body: payload.notification.body,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev]);

        // Показываем системное уведомление
        if (Notification.permission === 'granted') {
          new Notification(newNotification.title, {
            body: newNotification.body,
            icon: '/favicon.ico'
          });
        }
      }
    });

    return () => {
      // Очистка
    };
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="bg-chocolate text-white p-3 rounded-full shadow-lg relative"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
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
                <div
                  key={notification.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="font-bold">{notification.title}</div>
                  <div className="text-sm text-gray-600">{notification.body}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
