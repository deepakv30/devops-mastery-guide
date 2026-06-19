# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY ../app/package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY ../app/ .

EXPOSE 3000
USER node
CMD ["node", "index.js"]
