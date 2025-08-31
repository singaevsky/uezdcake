from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Filling
from .serializers import ProductSerializer, FillingSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type', 'fillings']
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'base_price']
    ordering = ['-created_at']

class FillingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Filling.objects.filter(is_available=True)
    serializer_class = FillingSerializer
