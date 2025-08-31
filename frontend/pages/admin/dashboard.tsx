// frontend/pages/admin/dashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { authAPI } from '../../lib/auth';

// Регистрация компонентов Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueData {
  date: string;
  revenue: number;
  orders_count: number;
}

interface TopProduct {
  name: string;
  sold: number;
  revenue: number;
}

interface CustomerStats {
  total: number;
  new_last_30_days: number;
  active_last_90_days: number;
}

interface OrderStatus {
  status: string;
  count: number;
}

const AdminDashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [customerStats, setCustomerStats] = useState<CustomerStats | null>(null);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем авторизацию
    if (!authAPI.isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats/', {
        headers: {
          'Authorization': `Bearer ${authAPI.getAccessToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();

      setRevenueData(data.recent_orders);
      setTopProducts(data.top_products);
      setCustomerStats(data.stats);
      setOrderStatuses(data.order_statuses);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Настройки графиков
  const revenueChartData = {
    labels: revenueData.map(item => new Date(item.date).toLocaleDateString('ru-RU')),
    datasets: [
      {
        label: 'Выручка (₽)',
        data: revenueData.map(item => item.revenue),
        borderColor: '#6B4423',
        backgroundColor: 'rgba(107, 68, 35, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Выручка за 30 дней',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value.toLocaleString('ru-RU') + ' ₽';
          }
        }
      }
    }
  };

  const ordersChartData = {
    labels: revenueData.map(item => new Date(item.date).toLocaleDateString('ru-RU')),
    datasets: [
      {
        label: 'Количество заказов',
        data: revenueData.map(item => item.orders_count),
        backgroundColor: '#FADADD',
        borderColor: '#F87171',
        borderWidth: 1
      }
    ]
  };

  const ordersChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Заказы за 30 дней',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const statusChartData = {
    labels: orderStatuses.map(item => {
      const statusMap: Record<string, string> = {
        'new': 'Новые',
        'processing': 'В обработке',
        'baking': 'Готовятся',
        'ready': 'Готовы',
        'delivered': 'Доставлены',
        'cancelled': 'Отменены'
      };
      return statusMap[item.status] || item.status;
    }),
    datasets: [
      {
        data: orderStatuses.map(item => item.count),
        backgroundColor: [
          '#3B82F6', // blue
          '#F59E0B', // yellow
          '#EF4444', // red
          '#10B981', // green
          '#8B5CF6', // purple
          '#6B7280'  // gray
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }
    ]
  };

  const statusChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Статусы заказов',
      },
    }
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
        <h1 className="text-3xl font-serif mb-8">Админ-панель</h1>

        {/* Статистика */}
        {customerStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-chocolate">{customerStats.total}</div>
              <div className="text-gray-600">Всего клиентов</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-chocolate">{customerStats.new_last_30_days}</div>
              <div className="text-gray-600">Новых за 30 дней</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-chocolate">{customerStats.active_last_90_days}</div>
              <div className="text-gray-600">Активных за 90 дней</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-chocolate">
                {revenueData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-gray-600">Выручка за 30 дней</div>
            </div>
          </div>
        )}

        {/* Графики */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Line data={revenueChartData} options={revenueChartOptions} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Bar data={ordersChartData} options={ordersChartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Pie data={statusChartData} options={statusChartOptions} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-serif mb-4">Топ продуктов</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-gray-600">Продано: {product.sold} шт.</div>
                  </div>
                  <div className="text-chocolate font-bold">
                    {product.revenue.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
