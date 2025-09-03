from django.http import JsonResponse
from rest_framework import viewsets
from .models import Product, Filling  # предположим, что такие модели существуют
from .serializers import ProductSerializer, FillingSerializer  # если у вас есть соответствующие сериализаторы

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class FillingViewSet(viewsets.ModelViewSet):
    queryset = Filling.objects.all()
    serializer_class = FillingSerializer

def product_list(request):
    # Пример реализации: возвращаем список продуктов в формате JSON
    products = Product.objects.all().values()
    return JsonResponse({"products": list(products)})

def product_detail(request, pk):
    # Пример реализации: возвращаем детали продукта
    try:
        product = Product.objects.values().get(pk=pk)
        return JsonResponse({"product": product})
    except Product.DoesNotExist:
        return JsonResponse({"error": "Product not found"}, status=404)

def category_list(request):
    # Пример реализации: возвращаем список категорий
    # Допустим, Product имеет поле category
    categories = Product.objects.values_list('category', flat=True).distinct()
    return JsonResponse({"categories": list(categories)})
