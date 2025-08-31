# admin/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from orders.models import Order
from users.models import User
from products.models import Product
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta

@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard_stats(request):
    """Статистика для админ-панели"""

    # Общая статистика
    total_orders = Order.objects.count()
    total_revenue = Order.objects.aggregate(
        total=Sum('total_price')
    )['total'] or 0

    total_customers = User.objects.filter(role='customer').count()
    total_products = Product.objects.filter(is_available=True).count()

    # Заказы за последние 30 дней
    thirty_days_ago = timezone.now() - timedelta(days=30)
    recent_orders = Order.objects.filter(
        created_at__gte=thirty_days_ago
    ).extra(
        select={'date': 'date(created_at)'}
    ).values('date').annotate(
        count=Count('id'),
        revenue=Sum('total_price')
    ).order_by('date')

    # Топ товаров
    top_products = Product.objects.annotate(
        order_count=Count('orderitem')
    ).filter(order_count__gt=0).order_by('-order_count')[:10]

    # Статусы заказов
    order_statuses = Order.objects.values('status').annotate(
        count=Count('id')
    )

    return Response({
        'stats': {
            'total_orders': total_orders,
            'total_revenue': float(total_revenue),
            'total_customers': total_customers,
            'total_products': total_products
        },
        'recent_orders': list(recent_orders),
        'top_products': [
            {
                'name': product.name,
                'count': product.order_count
            }
            for product in top_products
        ],
        'order_statuses': list(order_statuses)
    })

@api_view(['GET'])
@permission_classes([IsAdminUser])
def order_list(request):
    """Список заказов для админ-панели"""
    orders = Order.objects.select_related('user').prefetch_related('items__product').all()

    # Фильтрация
    status = request.GET.get('status')
    if status:
        orders = orders.filter(status=status)

    # Сортировка
    sort = request.GET.get('sort', '-created_at')
    orders = orders.order_by(sort)

    # Пагинация
    page = int(request.GET.get('page', 1))
    per_page = int(request.GET.get('per_page', 20))
    start = (page - 1) * per_page
    end = start + per_page

    orders_data = orders[start:end]

    return Response({
        'orders': [
            {
                'id': order.id,
                'user': {
                    'id': order.user.id,
                    'username': order.user.username,
                    'first_name': order.user.first_name,
                    'last_name': order.user.last_name
                },
                'status': order.status,
                'total_price': float(order.total_price),
                'delivery_address': order.delivery_address,
                'delivery_date': order.delivery_date,
                'created_at': order.created_at,
                'items': [
                    {
                        'id': item.id,
                        'product': {
                            'id': item.product.id,
                            'name': item.product.name
                        },
                        'quantity': item.quantity,
                        'price': float(item.price)
                    }
                    for item in order.items.all()
                ]
            }
            for order in orders_data
        ],
        'total': orders.count(),
        'page': page,
        'per_page': per_page
    })

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order_status(request, order_id):
    """Обновление статуса заказа"""
    try:
        order = Order.objects.get(id=order_id)
        new_status = request.data.get('status')

        if new_status in dict(Order.STATUS_CHOICES):
            old_status = order.status
            order.status = new_status
            order.save()

            # Отправляем уведомление в Telegram
            from telegram.bot import notifier
            asyncio.run(notifier.send_order_status_update(
                order_id,
                new_status,
                order.user.username  # Предполагаем, что username содержит Telegram ID
            ))

            return Response({
                'success': True,
                'message': f'Статус заказа #{order_id} изменён с "{old_status}" на "{new_status}"'
            })
        else:
            return Response({
                'success': False,
                'message': 'Неверный статус'
            }, status=400)

    except Order.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Заказ не найден'
        }, status=404)
