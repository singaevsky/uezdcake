from django.urls import path
from . import views

urlpatterns = [
    path('webhook/', views.telegram_webhook, name='telegram_webhook'),
    path('send-notification/', views.send_notification, name='send_notification'),
]
