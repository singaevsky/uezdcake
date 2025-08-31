from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product

User = get_user_model()

class Order(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новый'),
        ('processing', 'В обработке'),
        ('baking', 'Готовится'),
        ('ready', 'Готов'),
        ('delivered', 'Доставлен'),
        ('cancelled', 'Отменён'),
    ]

    SOURCE_CHOICES = [
        ('website', 'Сайт'),
        ('telegram', 'Telegram'),
        ('phone', 'По телефону'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='website')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_address = models.TextField()
    delivery_date = models.DateTimeField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Заказ #{self.id} от {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    filling_details = models.TextField(blank=True)  # Описание выбранных начинок

    def __str__(self):
        return f"{self.product.name} x{self.quantity}"
