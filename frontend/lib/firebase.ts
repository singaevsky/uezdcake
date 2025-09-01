// frontend/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Проверяем, что мы в браузерной среде
const isBrowser = typeof window !== 'undefined';

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Инициализация Firebase только в браузере
let app: any = null;
let messaging: any = null;

if (isBrowser && firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
  } catch (error) {
    console.warn('Ошибка инициализации Firebase:', error);
  }
}

export const requestNotificationPermission = async (): Promise<string | null> => {
  // Если Firebase не инициализирован или мы не в браузере
  if (!messaging || !isBrowser) {
    console.log('Firebase messaging не доступен');
    return null;
  }

  try {
    // Запрашиваем разрешение на уведомления
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Получаем токен для push-уведомлений
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error('Ошибка получения токена Firebase:', error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    // Если Firebase не инициализирован
    if (!messaging) {
      console.log('Firebase messaging не доступен для прослушивания сообщений');
      resolve(null);
      return;
    }

    try {
      // Слушаем входящие сообщения
      onMessage(messaging, (payload) => {
        console.log('Получено сообщение Firebase:', payload);
        resolve(payload);
      });
    } catch (error) {
      console.error('Ошибка при подписке на сообщения:', error);
      resolve(null);
    }
  });

// Экспортируем для возможного использования в других частях приложения
export { app, messaging };
