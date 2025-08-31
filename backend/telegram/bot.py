# telegram/bot.py
import os
import asyncio
from telegram import Bot
from django.conf import settings

class TelegramNotifier:
    def __init__(self):
        self.bot = Bot(token=os.getenv('TELEGRAM_BOT_TOKEN'))
        self.admin_chat_id = os.getenv('TELEGRAM_ADMIN_CHAT_ID')

    async def send_new_order_notification(self, order_data):
        """Отправка уведомления о новом заказе администраторам"""
        message = f"""
🔔 Новый заказ!

ID заказа: {order_data['id']}
Клиент: {order_data['user']['username']}
Сумма: {order_data['total_price']} ₽
Источник: {order_data['source']}

Товары:
"""
        for item in order_data['items']:
            message += f"- {item['product']['name']} x{item['quantity']} ({item['price']} ₽)\n"

        message += f"\nКомментарий: {order_data.get('comment', 'Нет')}"

        try:
            await self.bot.send_message(
                chat_id=self.admin_chat_id,
                text=message
            )
        except Exception as e:
            print(f"Ошибка отправки уведомления: {e}")

    async def send_order_status_update(self, order_id, status, user_telegram_id=None):
        """Отправка уведомления об изменении статуса заказа"""
        status_text = {
            'new': 'новый',
            'processing': 'в обработке',
            'baking': 'готовится',
            'ready': 'готов',
            'delivered': 'доставлен',
            'cancelled': 'отменён'
        }

        message = f"📦 Статус вашего заказа #{order_id} изменён на: {status_text.get(status, status)}"

        try:
            if user_telegram_id:
                await self.bot.send_message(
                    chat_id=user_telegram_id,
                    text=message
                )
        except Exception as e:
            print(f"Ошибка отправки уведомления пользователю: {e}")

    def notify_new_order_sync(self, order_data):
        """Синхронный метод для вызова из Django"""
        asyncio.run(self.send_new_order_notification(order_data))

# Глобальный экземпляр
notifier = TelegramNotifier()
