// frontend/pages/account/orders.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authAPI } from '../../lib/auth';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date: string;
  status: 'new' | 'processing' | 'baking' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

const AccountOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Проверка авторизации
    if (!authAPI.isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Имитация загрузки заказов
    setTimeout(() => {
      // В реальном приложении здесь будет API call
      const mockOrders: Order[] = [
        {
          id: 1001,
          date: '2023-12-15T14:30:00Z',
          status: 'delivered',
          total: 2400,
          items: [
            { id: 1, product_name: 'Медовик 1.5 кг', quantity: 1, price: 1700 },
            { id: 2, product_name: 'Капкейки Ванильные 12 шт', quantity: 1, price: 700 }
          ]
        },
        {
          id: 1002,
          date: '2023-12-10T11:15:00Z',
          status: 'cancelled',
          total: 1500,
          items: [
            { id: 3, product_name: 'Чёрный лес 1 кг', quantity: 1, price: 1500 }
          ]
        },
        {
          id: 1003,
          date: '2023-12-05T09:45:00Z',
          status: 'delivered',
          total: 3200,
          items: [
            { id: 4, product_name: 'Три шоколада 2 кг', quantity: 1, price: 3200 }
          ]
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 800);
  }, [router]);

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'processing': return 'В обработке';
      case 'baking': return 'Готовится';
      case 'ready': return 'Готов';
      case 'delivered': return 'Доставлен';
      case 'cancelled': return 'Отменён';
      default: return status;
    }
  };

  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'baking': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-xl">Загрузка заказов...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>Мои заказы - Уездный Кондитер</title>
        <meta name="description" content="История ваших заказов в кондитерской 'Уездный Кондитер'" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-chocolate mb-2">Мои заказы</h1>
              <p className="text-gray-600">История ваших покупок</p>
            </div>
            <Link href="/account" className="text-chocolate hover:underline">
              ← Назад в кабинет
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-chocolate mb-4">У вас пока нет заказов</h2>
            <p className="text-gray-600 mb-6">Сделайте первый заказ и он появится здесь</p>
            <Link href="/catalog" className="btn-primary inline-block">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {orders.map(order => (
              <div key={order.id} className="border-b border-gray-200 last:border-b-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Заказ №{order.id}</h3>
                      <p className="text-gray-600">
                        {new Date(order.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Товары:</h4>
                    <ul className="space-y-2">
                      {order.items.map(item => (
                        <li key={item.id} className="flex justify-between">
                          <span>{item.product_name} × {item.quantity}</span>
                          <span>{item.price.toLocaleString()} ₽</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xl font-bold text-chocolate">
                      Итого: {order.total.toLocaleString()} ₽
                    </div>
                    <button className="mt-2 sm:mt-0 text-chocolate hover:underline">
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountOrdersPage;
