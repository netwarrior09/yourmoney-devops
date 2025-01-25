# Stage 1: Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY ./app /app
RUN npm install

# Stage 2: Runtime stage
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
CMD ["node", "server.js"]
