FROM node:18-alpine as build
WORKDIR /app
COPY package* ./
RUN npm ci
RUN npm run build