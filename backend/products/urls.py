from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, FillingViewSet
from . import views

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'fillings', FillingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('list/', views.product_list, name='product_list'),
    path('detail/<int:pk>/', views.product_detail, name='product_detail'),
    path('categories/', views.category_list, name='category_list'),
]
