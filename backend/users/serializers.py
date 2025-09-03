from rest_framework import serializers
from .models import User  # Проверьте, что модель User существует

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
