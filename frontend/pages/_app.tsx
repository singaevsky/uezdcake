// frontend/pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navigation from '../components/Navigation';
// Cart больше не импортируем и не рендерим здесь напрямую
import NotificationComponent from '../components/Notification'; // Убедитесь, что в Notification.tsx есть экспорт по умолчанию

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <main>
        <Component {...pageProps} />
      </main>
      {/* Компонент уведомлений, если он полностью самостоятельный */}
      <NotificationComponent />
    </>
  );
}

export default MyApp;
