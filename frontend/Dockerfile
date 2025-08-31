# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Копирование package.json и установка зависимостей
COPY package*.json ./
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Открытие порта
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
