# chef/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from orders.models import Order

class OrderConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Проверяем, что пользователь является кондитером
        if self.scope["user"].is_authenticated and self.scope["user"].role == 'chef':
            await self.channel_layer.group_add("chefs", self.channel_name)
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("chefs", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get('type')

        if message_type == 'status_update':
            await self.update_order_status(data)

    async def update_order_status(self, data):
        order_id = data.get('order_id')
        status = data.get('status')

        # Обновляем статус заказа в базе данных
        await self.update_order_status_in_db(order_id, status)

        # Отправляем обновление всем кондитерам
        await self.channel_layer.group_send(
            "chefs",
            {
                "type": "order_status_updated",
                "order_id": order_id,
                "status": status,
                "updated_by": self.scope["user"].username
            }
        )

    @database_sync_to_async
    def update_order_status_in_db(self, order_id, status):
        try:
            order = Order.objects.get(id=order_id)
            order.status = status
            order.save()
            return order
        except Order.DoesNotExist:
            return None

    async def order_status_updated(self, event):
        await self.send(text_data=json.dumps({
            'type': 'status_updated',
            'order_id': event['order_id'],
            'status': event['status'],
            'updated_by': event['updated_by']
        }))

    async def new_order_created(self, event):
        await self.send(text_data=json.dumps({
            'type': 'new_order',
            'order_id': event['order_id'],
            'order_data': event['order_data']
        }))
