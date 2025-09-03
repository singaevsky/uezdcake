from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='chef_dashboard'),
    path('orders/', views.orders_list, name='chef_orders'),
    path('order/<int:order_id>/', views.order_detail, name='chef_order_detail'),
    path('update-status/', views.update_order_status, name='update_order_status'),
]
