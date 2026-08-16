# Build from the project root:
#   docker build -f docker/Dockerfile -t devops-demo-app:local .
#
# COPY paths are relative to that context, not to this file.

FROM node:20-alpine AS deps
WORKDIR /app
COPY app/package.json app/package-lock.json* ./
RUN npm install --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app/ ./
USER node
EXPOSE 3000
CMD ["node", "index.js"]
