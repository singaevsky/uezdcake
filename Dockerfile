# Dockerfile
FROM python:3.11-slim

# Установка зависимостей системы
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Установка переменных окружения
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Установка рабочей директории
WORKDIR /app

# Копирование requirements и установка Python зависимостей
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Копирование всего приложения
COPY . /app/

# Создание директории для статических файлов
RUN mkdir -p /app/staticfiles

# Сборка статических файлов
RUN python manage.py collectstatic --noinput --clear

# Открытие порта
EXPOSE 8000

# Команда запуска приложения
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "backend.wsgi:application"]
