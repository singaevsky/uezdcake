// pages/chef/index.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../../lib/auth';

interface Order {
  id: number;
  user: {
    username: string;
  };
  status: string;
  total_price: number;
  delivery_date: string;
  created_at: string;
}

const ChefPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Проверяем авторизацию
    if (!authAPI.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const user = authAPI.getCurrentUser();
    if (user?.role !== 'chef') {
      router.push('/');
      return;
    }

    // Загружаем заказы
    loadOrders();

    // Подключаемся к WebSocket
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws/chef/orders/';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_order') {
        // Добавляем новый заказ
        loadOrders();
      } else if (data.type === 'status_updated') {
        // Обновляем статус заказа
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === data.order_id
              ? { ...order, status: data.status }
              : order
          )
        );
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setWebsocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/orders/chef/');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({
        type: 'status_update',
        order_id: orderId,
        status: status
      }));
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-blue-100 text-blue-800',
      'processing': 'bg-yellow-100 text-yellow-800',
      'baking': 'bg-orange-100 text-orange-800',
      'ready': 'bg-green-100 text-green-800',
      'delivered': 'bg-purple-100 text-purple-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-2xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Панель кондитера</h1>
          <div className="text-right">
            <div className="text-lg">Активных заказов: {orders.length}</div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍰</div>
            <h2 className="text-2xl font-serif mb-2">Нет активных заказов</h2>
            <p className="text-gray-600">Новые заказы появятся здесь автоматически</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Заказ #{order.id}</h3>
                    <p className="text-gray-600">{order.user.username}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status === 'new' && 'Новый'}
                    {order.status === 'processing' && 'В обработке'}
                    {order.status === 'baking' && 'Готовится'}
                    {order.status === 'ready' && 'Готов'}
                    {order.status === 'delivered' && 'Доставлен'}
                    {order.status === 'cancelled' && 'Отменён'}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-2xl font-bold text-chocolate">{order.total_price} ₽</p>
                  <p className="text-sm text-gray-600">
                    Доставка: {new Date(order.delivery_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {order.status === 'new' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'processing')}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                    >
                      Взять в работу
                    </button>
                  )}

                  {order.status === 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'baking')}
                      className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition"
                    >
                      Начать готовить
                    </button>
                  )}

                  {order.status === 'baking' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                    >
                      Готов
                    </button>
                  )}

                  {(order.status === 'new' || order.status === 'processing' || order.status === 'baking') && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                    >
                      Отменить
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefPanel;
