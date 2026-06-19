# Docker Mastery

**Last Major Update:** 2026-06-19 | Tested with Docker v27.0+

## Introduction & Why It Matters

Docker is the de facto standard for containerization. In enterprise environments, it enables consistent deployments, faster development cycles, improved resource utilization, and easier scaling. Mastering Docker is foundational before moving to Kubernetes.

## Core Concepts

- Images vs Containers
- Dockerfile
- Layers & Union File System
- Docker Networking (bridge, host, overlay)
- Volumes & Bind Mounts
- Docker Compose
- Registry (Docker Hub, ECR, Harbor)

## Installation & Setup

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

docker --version
```

## Key Features & Best Practices

### Enterprise Best Practices
- Use multi-stage builds to reduce image size
- Run containers as non-root user
- Use `.dockerignore`
- Pin base image versions (avoid `latest`)
- Scan images with Trivy or Docker Scout
- Use distroless or minimal base images when possible

### Security
- Never run as root in production
- Use read-only filesystems where possible
- Limit capabilities

## Hands-on Examples

### Example 1: Multi-stage Build (Recommended)

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### Example 2: Docker Compose for Local Development

See `examples/docker-compose.yml`

## Common Pitfalls & Troubleshooting

- **Image too large**: Use multi-stage builds and `.dockerignore`
- **Permission issues**: Run as non-root or fix ownership
- **Container exits immediately**: Check logs with `docker logs`
- **Port conflicts**: Use `docker ps` and choose free ports

## Integration with Other Tools

- **Ansible**: Use `community.docker` collection to manage containers
- **Kubernetes**: Docker images are the base unit for pods
- **CI/CD**: Build and push images in GitHub Actions
- **Terraform**: Can manage Docker resources (less common in production)

## Exercises

### Basic
1. Write a Dockerfile for a simple Python or Node.js app.
2. Build and run the container locally.

### Intermediate
3. Convert a single Dockerfile into a multi-stage build.
4. Create a `docker-compose.yml` with two services (app + database).

### Advanced
5. Secure a container using non-root user, read-only filesystem, and dropped capabilities.

## Official Documentation & Further Reading

- [Docker Documentation](https://docs.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
