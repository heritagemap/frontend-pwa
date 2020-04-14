FROM node:12-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# production environment
FROM node:12-alpine
WORKDIR /app
RUN npm install express http-proxy-middleware
COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./
EXPOSE 9000
CMD ["node", "server.js"]
