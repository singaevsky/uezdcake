from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('customer', 'Клиент'),
        ('chef', 'Кондитер'),
        ('admin', 'Администратор'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=20, blank=True)
    bonus_points = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.username} ({self.role})"
