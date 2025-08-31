# admin/analytics.py
from django.db.models import Sum, Count, Avg
from django.utils import timezone
from datetime import timedelta
from orders.models import Order
from products.models import Product
from users.models import User

class AnalyticsService:
    @staticmethod
    def get_revenue_stats(days=30):
        """Статистика выручки за последние N дней"""
        start_date = timezone.now() - timedelta(days=days)

        daily_revenue = Order.objects.filter(
            created_at__gte=start_date
        ).extra(
            select={'date': 'date(created_at)'}
        ).values('date').annotate(
            revenue=Sum('total_price'),
            orders_count=Count('id')
        ).order_by('date')

        return list(daily_revenue)

    @staticmethod
    def get_top_products(limit=10):
        """Топ продаваемых продуктов"""
        top_products = Product.objects.annotate(
            total_sold=Sum('orderitem__quantity')
        ).filter(
            total_sold__gt=0
        ).order_by('-total_sold')[:limit]

        return [
            {
                'name': product.name,
                'sold': product.total_sold or 0,
                'revenue': float(
                    (product.total_sold or 0) * product.base_price
                )
            }
            for product in top_products
        ]

    @staticmethod
    def get_customer_stats():
        """Статистика по клиентам"""
        total_customers = User.objects.filter(role='customer').count()

        # Новые клиенты за последние 30 дней
        thirty_days_ago = timezone.now() - timedelta(days=30)
        new_customers = User.objects.filter(
            role='customer',
            date_joined__gte=thirty_days_ago
        ).count()

        # Активные клиенты (с заказами за последние 90 дней)
        ninety_days_ago = timezone.now() - timedelta(days=90)
        active_customers = User.objects.filter(
            role='customer',
            order__created_at__gte=ninety_days_ago
        ).distinct().count()

        return {
            'total': total_customers,
            'new_last_30_days': new_customers,
            'active_last_90_days': active_customers
        }

    @staticmethod
    def get_order_status_stats():
        """Статистика по статусам заказов"""
        return list(
            Order.objects.values('status').annotate(
                count=Count('id')
            )
        )
