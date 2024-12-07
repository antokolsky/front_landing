FROM node:18-alpine as build
WORKDIR /app
COPY ./ ./
RUN npm ci
RUN npm run build
CMD ["npx", "-y", "http-server", "-p", "8000", "/app/dist"] 