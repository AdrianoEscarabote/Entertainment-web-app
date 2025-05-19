# Etapa 1: Build da aplicação Angular
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN yarn install || npm install

COPY . .

RUN yarn build --configuration production || npm run build -- --configuration production

# Etapa 2: Servir com nginx
FROM nginx:alpine

COPY --from=builder /app/dist/my-angular-app /usr/share/nginx/html

# Remove configuração padrão do nginx e copia a nossa
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
