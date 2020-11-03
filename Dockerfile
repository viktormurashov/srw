FROM node:lts-alpine as client_builder
WORKDIR /app
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ ./
ENV NODE_ENV="production"
RUN npm run build

FROM nginx
COPY --from=client_builder /app/build/ /usr/share/nginx/html/