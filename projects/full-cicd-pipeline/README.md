# Capstone Project: Full CI/CD Pipeline for a 3-Tier Web Application

This project demonstrates an end-to-end, production-style CI/CD pipeline using tools covered throughout this repository.

## Project Overview

**Goal**: Build, test, containerize, and deploy a simple web application to Kubernetes using GitHub Actions, with observability enabled.

### Tech Stack
- **Application**: Simple Node.js Express API
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Orchestration**: Kubernetes
- **Monitoring**: Prometheus + Grafana

## Architecture

```
GitHub Repository
      ↓
GitHub Actions (CI/CD)
      ↓
Build Docker Image → Push to GHCR
      ↓
Deploy to Kubernetes (kind / EKS / AKS / GKE)
      ↓
Prometheus scrapes metrics
      ↓
Grafana Dashboards + Alerting
```

## Project Structure

```
full-cicd-pipeline/
├── app/                    # Sample Node.js application
├── docker/                 # Dockerfile
├── k8s/                    # Kubernetes manifests
├── .github/workflows/      # GitHub Actions pipelines
└── README.md
```

## How to Run This Project Locally

### Prerequisites
- Docker
- kind or minikube
- kubectl
- Helm (optional, for Prometheus stack)

### Step 1: Clone and Run the App Locally

```bash
cd app
npm install
npm start
```

### Step 2: Build Docker Image

```bash
cd docker
 docker build -t myapp:latest .
```

### Step 3: Deploy to Kubernetes

```bash
kubectl apply -f k8s/
```

### Step 4: (Optional) Deploy Monitoring Stack

```bash
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
```

## CI/CD Pipeline Flow

The GitHub Actions workflow performs the following steps:

1. **Checkout** code
2. **Install dependencies** and run tests
3. **Build** Docker image
4. **Push** image to GitHub Container Registry (GHCR)
5. **Deploy** to Kubernetes cluster
6. **Verify** deployment

## Learning Outcomes

By completing this project, you will gain hands-on experience with:

- Docker multi-stage builds
- GitHub Actions workflows and secrets
- Kubernetes deployments
- Integrating monitoring (Prometheus + Grafana)
- End-to-end DevOps practices

## Next Improvements (Stretch Goals)

- Add automated testing stage
- Implement canary or blue-green deployment
- Add ArgoCD for GitOps
- Integrate security scanning (Trivy)
- Add SLO-based alerting
