// frontend/pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

// Предполагаем, что все компоненты экспортируются по умолчанию
// Если они экспортируются иначе, нужно изменить импорт
import Navigation from '../components/Navigation';
import Cart from '../components/Cart';
import NotificationComponent from '../components/Notification';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <main>
        <Component {...pageProps} />
      </main>
      <Cart />
      <NotificationComponent />
    </>
  );
}

export default MyApp;
