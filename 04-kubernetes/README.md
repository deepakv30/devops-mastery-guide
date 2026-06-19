# Kubernetes Mastery

**Last Major Update:** 2026-06-19 | Tested with Kubernetes v1.32

## Introduction & Why It Matters

Kubernetes is the leading container orchestration platform. Enterprises use it for automated deployment, scaling, and management of containerized applications with high availability and resilience.

## Core Concepts

- Pods, Deployments, StatefulSets, DaemonSets
- Services, Ingress, Network Policies
- ConfigMaps, Secrets, Volumes
- RBAC and Namespaces
- Helm and Kustomize

## Installation & Setup

Use `kind` or `minikube` for local development.

```bash
kind create cluster --name devops-lab
kubectl get nodes
```

## Key Features & Best Practices

### Enterprise Best Practices
- Use declarative YAML (avoid imperative commands in production)
- Implement proper resource requests and limits
- Use Horizontal Pod Autoscaler (HPA)
- Follow least-privilege with RBAC
- Use Network Policies for micro-segmentation

## Hands-on Examples

Basic Deployment and Service examples are available in the `examples/` folder.

## Common Pitfalls & Troubleshooting

- Pods stuck in Pending: Check resource quotas and node capacity
- ImagePullBackOff: Verify image name and registry credentials
- CrashLoopBackOff: Check container logs

## Integration with Other Tools

- Docker: Source of container images
- Helm: Package manager for Kubernetes
- ArgoCD / Flux: GitOps continuous delivery
- Terraform: Infrastructure provisioning

## Exercises

### Basic
1. Deploy a simple Nginx pod and expose it via a Service.

### Intermediate
2. Create a Deployment with 3 replicas and configure HPA.

### Advanced
3. Secure a cluster using Network Policies and RBAC.

## Official Documentation & Further Reading

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/setup/best-practices/)
- [Helm](https://helm.sh/docs/)
