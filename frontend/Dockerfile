FROM node:18-alpine

WORKDIR /app

# Установка зависимостей для сборки
RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
