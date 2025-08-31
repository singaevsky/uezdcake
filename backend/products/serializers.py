from rest_framework import serializers
from .models import Product, Filling, ProductVariant

class FillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filling
        fields = '__all__'

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    fillings = FillingSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
