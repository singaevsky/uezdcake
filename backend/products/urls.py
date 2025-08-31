from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, FillingViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'fillings', FillingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
