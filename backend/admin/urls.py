# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'healthy'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/products/', include('products.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/builder/', include('builder.urls')),
    path('api/chef/', include('chef.urls')),
    path('api/admin/', include('admin_panel.urls')),
    path('api/health/', health_check, name='health_check'),
]
