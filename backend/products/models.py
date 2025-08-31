from django.db import models

class Filling(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    TYPE_CHOICES = [
        ('cake', 'Торт'),
        ('bento', 'Бенто'),
        ('dessert', 'Десерт'),
        ('cupcake', 'Капкейк'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    weight = models.DecimalField(max_digits=5, decimal_places=2)  # в кг
    price_multiplier = models.DecimalField(max_digits=5, decimal_places=2, default=1.0)

    def __str__(self):
        return f"{self.product.name} ({self.weight}кг)"

class ProductFilling(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    filling = models.ForeignKey(Filling, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('product', 'filling')
