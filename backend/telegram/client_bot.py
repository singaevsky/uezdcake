# telegram/client_bot.py
import os
import django
import json
from telegram import Update, ReplyKeyboardMarkup, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ContextTypes

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from orders.models import Order
from users.models import User
from products.models import Product

# Клавиатуры
MAIN_KEYBOARD = [
    ['📦 Мой заказ', '🍰 Каталог'],
    ['🎨 Конструктор', 'ℹ️ Помощь'],
    ['👤 Профиль', '📞 Контакты']
]

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Создаем или получаем пользователя
    telegram_id = str(update.effective_user.id)
    username = update.effective_user.username or f"user_{telegram_id}"

    user, created = User.objects.get_or_create(
        username=username,
        defaults={
            'first_name': update.effective_user.first_name or '',
            'last_name': update.effective_user.last_name or '',
            'role': 'customer'
        }
    )

    keyboard = ReplyKeyboardMarkup(MAIN_KEYBOARD, resize_keyboard=True)
    await update.message.reply_text(
        f"Добро пожаловать в кондитерскую 'Уездный кондитер'! 🎂\n"
        f"Здесь вы можете заказать торт или создать свой уникальный дизайн.\n\n"
        f"Ваш Telegram ID: {telegram_id}",
        reply_markup=keyboard
    )

async def my_order(update: Update, context: ContextTypes.DEFAULT_TYPE):
    telegram_id = str(update.effective_user.id)
    try:
        user = User.objects.get(username__endswith=telegram_id)
        orders = Order.objects.filter(user=user).order_by('-created_at')[:5]

        if not orders:
            await update.message.reply_text("У вас пока нет заказов.")
            return

        message = "Ваши последние заказы:\n\n"
        for order in orders:
            message += f"Заказ #{order.id}\n"
            message += f"Статус: {dict(Order.STATUS_CHOICES)[order.status]}\n"
            message += f"Сумма: {order.total_price} ₽\n"
            message += f"Дата: {order.created_at.strftime('%d.%m.%Y %H:%M')}\n"
            message += "─" * 20 + "\n"

        await update.message.reply_text(message)
    except User.DoesNotExist:
        await update.message.reply_text("Пожалуйста, сначала зарегистрируйтесь через сайт.")

async def catalog(update: Update, context: ContextTypes.DEFAULT_TYPE):
    products = Product.objects.filter(is_available=True)[:6]

    if not products:
        await update.message.reply_text("Каталог временно пуст.")
        return

    keyboard = []
    for product in products:
        keyboard.append([InlineKeyboardButton(
            f"{product.name} - {product.base_price} ₽",
            callback_data=f"product_{product.id}"
        )])

    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Выберите торт из каталога:", reply_markup=reply_markup)

async def product_detail(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    product_id = query.data.split('_')[1]
    try:
        product = Product.objects.get(id=product_id)

        message = f"🍰 {product.name}\n\n"
        message += f"Цена: {product.base_price} ₽\n"
        message += f"Описание: {product.description}\n\n"
        message += "Хотите заказать этот торт?"

        keyboard = [
            [InlineKeyboardButton("Заказать", callback_data=f"order_{product.id}")],
            [InlineKeyboardButton("Назад к каталогу", callback_data="catalog")]
        ]

        reply_markup = InlineKeyboardMarkup(keyboard)
        await query.edit_message_text(message, reply_markup=reply_markup)
    except Product.DoesNotExist:
        await query.edit_message_text("Торт не найден.")

async def builder(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "🎨 Конструктор тортов:\n\n"
        "1. Опишите желаемый торт в свободной форме\n"
        "2. Прикрепите эскиз (если есть)\n"
        "3. Укажите дату доставки\n\n"
        "Наш кондитер свяжется с вами для уточнения деталей!"
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = """
ℹ️ Помощь:

/start - Главное меню
📦 Мой заказ - Посмотреть ваши заказы
🍰 Каталог - Выбрать торт из каталога
🎨 Конструктор - Создать уникальный торт
👤 Профиль - Ваш профиль
📞 Контакты - Наши контакты

Для заказа через бота:
1. Выберите торт из каталога
2. Нажмите "Заказать"
3. Укажите количество и адрес доставки
"""
    await update.message.reply_text(help_text)

async def profile(update: Update, context: ContextTypes.DEFAULT_TYPE):
    telegram_id = str(update.effective_user.id)
    try:
        user = User.objects.get(username__endswith=telegram_id)
        profile_text = f"""
👤 Ваш профиль:

Имя: {user.first_name} {user.last_name}
Username: @{user.username}
Бонусные баллы: {user.bonus_points}

Для изменения данных зарегистрируйтесь на сайте.
"""
        await update.message.reply_text(profile_text)
    except User.DoesNotExist:
        await update.message.reply_text("Пожалуйста, сначала зарегистрируйтесь через сайт.")

async def contacts(update: Update, context: ContextTypes.DEFAULT_TYPE):
    contacts_text = """
📞 Контакты:

📍 Адрес: ул. Кондитерская, д. 1
⏰ Режим работы: 9:00 - 21:00
📱 Телефон: +7 (XXX) XXX-XX-XX
📧 Email: info@uezdny-konditer.ru

Доставка по городу ежедневно!
"""
    await update.message.reply_text(contacts_text)

def main():
    app = Application.builder().token(os.getenv('TELEGRAM_BOT_TOKEN')).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(MessageHandler(filters.Regex('📦 Мой заказ'), my_order))
    app.add_handler(MessageHandler(filters.Regex('🍰 Каталог'), catalog))
    app.add_handler(MessageHandler(filters.Regex('🎨 Конструктор'), builder))
    app.add_handler(MessageHandler(filters.Regex('ℹ️ Помощь'), help_command))
    app.add_handler(MessageHandler(filters.Regex('👤 Профиль'), profile))
    app.add_handler(MessageHandler(filters.Regex('📞 Контакты'), contacts))
    app.add_handler(CallbackQueryHandler(product_detail, pattern='^product_'))

    app.run_polling()

if __name__ == '__main__':
    main()
