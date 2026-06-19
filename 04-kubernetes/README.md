# Kubernetes Mastery

**Last Major Update:** 2026-06-19 | Comprehensive CKA-aligned content with enterprise best practices

## Introduction & Why It Matters

Kubernetes is the industry-standard container orchestration platform. It automates deployment, scaling, and management of containerized applications. In enterprise environments, Kubernetes enables high availability, scalability, self-healing, and efficient resource utilization across hybrid and multi-cloud infrastructures.

Mastering Kubernetes is essential for modern DevOps, SRE, and Platform Engineering roles.

## Core Concepts

### Pods
- Smallest deployable unit in Kubernetes.
- Can contain one or more containers that share network and storage.
- Ephemeral by nature (use Deployments/ReplicaSets for management).

### Deployments
- Declarative way to manage Pods and ReplicaSets.
- Supports rolling updates, rollbacks, and scaling.
- Preferred way to deploy applications.

### ReplicaSets
- Ensures a stable set of replica Pods are running.
- Uses label selectors to manage Pods.
- ReplicaSet is the successor to ReplicationController (uses `apps/v1`).

### Services
- **ClusterIP**: Default, internal cluster access only.
- **NodePort**: Exposes service on a static port on each node.
- **LoadBalancer**: Provisions external load balancer (cloud providers).
- **Headless**: For direct pod-to-pod communication (no cluster IP).

### ConfigMaps and Secrets
- **ConfigMap**: Store non-sensitive configuration data.
- **Secret**: Store sensitive data (base64 encoded, not encrypted by default).
- Can be injected as environment variables or mounted as volumes.

### Ingress
- Manages external access to services (HTTP/HTTPS).
- Requires an Ingress Controller (e.g., NGINX, Traefik).
- Supports path-based and host-based routing.
- Handles SSL termination centrally.

### Networking
- Every Pod gets a unique IP.
- CNI (Container Network Interface) plugins handle pod networking (Flannel, Calico, Weave, Cilium).
- Services provide stable endpoints and load balancing.
- CoreDNS provides internal DNS resolution.

## Installation & Setup

### Using kubeadm (Recommended for learning & production)

```bash
# On master
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Install CNI (example: Flannel)
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

# On worker nodes
sudo kubeadm join <master-ip>:6443 --token <token> ...
```

### Local Development
- Minikube or kind for single-node clusters.
- Use `kubectl` with context switching for multiple clusters.

## Key Features & Best Practices

### Enterprise Best Practices
- Use **Deployments** instead of directly managing Pods or ReplicaSets.
- Implement **Horizontal Pod Autoscaler (HPA)** for automatic scaling based on CPU/memory.
- Use **Resource Requests and Limits** on all containers.
- Prefer **ConfigMaps and Secrets** over hardcoding values.
- Use **Ingress** + Ingress Controller instead of multiple NodePort/LoadBalancer Services.
- Implement **Network Policies** for micro-segmentation.
- Use **Namespaces** for environment and team isolation.
- Enable **Pod Security Standards** or OPA/Gatekeeper for security policies.

### Important kubectl Commands

```bash
# Create resources
kubectl create deployment nginx --image=nginx --replicas=3
kubectl expose deployment nginx --port=80 --type=ClusterIP

# Generate YAML without creating
kubectl create deployment nginx --image=nginx --dry-run=client -o yaml > nginx.yaml

# Scaling
kubectl scale deployment nginx --replicas=5

# Rolling updates & history
kubectl set image deployment/nginx nginx=nginx:1.21
kubectl rollout status deployment/nginx
kubectl rollout history deployment/nginx
kubectl rollout undo deployment/nginx

# ConfigMap & Secret
kubectl create configmap app-config --from-literal=APP_COLOR=blue
kubectl create secret generic db-secret --from-literal=DB_PASSWORD=secret

# Debugging
kubectl get pods -o wide
kubectl describe pod <pod-name>
kubectl logs <pod-name> -f
kubectl exec -it <pod-name> -- /bin/sh
```

## Common Pitfalls & Troubleshooting

- **ImagePullBackOff**: Wrong image name or registry credentials.
- **CrashLoopBackOff**: Application crashing inside container (check logs).
- **Pending Pods**: Insufficient resources or taints/tolerations issues.
- **Service not reachable**: Check selectors, endpoints (`kubectl get endpoints`), and Network Policies.
- **DNS issues**: Verify CoreDNS pods are running.
- Editing live Pods is limited — prefer editing Deployments.

## Integration with Other Tools

- **Docker**: Source of container images.
- **Helm**: Package manager for Kubernetes applications.
- **Prometheus + Grafana**: Monitoring and observability.
- **ArgoCD / Flux**: GitOps continuous delivery.
- **Terraform**: Can provision EKS, GKE, AKS clusters.
- **Ansible**: Can deploy applications and configure clusters.

## Exercises

### Basic
1. Create a Deployment with 3 replicas of Nginx and expose it via a ClusterIP Service.
2. Create a ConfigMap and inject it into a Pod as environment variables.

### Intermediate
3. Create an Ingress resource with path-based routing for two applications.
4. Set up Horizontal Pod Autoscaler for a Deployment.

### Advanced
5. Deploy a multi-tier application (frontend + backend + database) with proper Services, ConfigMaps, and Secrets.
6. Configure Network Policies to restrict traffic between namespaces.

## Official Documentation & Further Reading

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [CNCF CKA Curriculum](https://github.com/cncf/curriculum)
