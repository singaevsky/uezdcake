// frontend/lib/chartjs.ts
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
  Legend,
  Filler
} from 'chart.js';

// Регистрируем все необходимые компоненты
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Глобальные настройки
ChartJS.defaults.font.family = "'Inter', 'sans-serif'";
ChartJS.defaults.color = '#6B4423';
ChartJS.defaults.borderColor = '#E5E7EB';

export default ChartJS;
