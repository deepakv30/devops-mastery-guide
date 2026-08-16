# Kubernetes cheat sheet

Cluster used in this module: [kind](https://kind.sigs.k8s.io/docs/user/quick-start/). Client: `kubectl`. Objects: [README](./README.md).

## kind

```bash
kind create cluster --name learn
kind get clusters
kind delete cluster --name learn
kubectl cluster-info
kubectl config current-context          # expect kind-learn
```

## Apply and inspect

```bash
kubectl apply -f examples/nginx-deployment.yaml
kubectl apply -f examples/nginx-service.yaml
kubectl get deploy,po,svc
kubectl get pods -o wide
kubectl get pods --show-labels
kubectl describe pod <pod>
kubectl get events --sort-by='.lastTimestamp'
```

## Debug a Pod that is not Ready

```bash
kubectl describe pod <pod>              # Events at the bottom
kubectl logs <pod>
kubectl logs <pod> -c <container>
kubectl logs deploy/nginx --previous
kubectl exec -it deploy/nginx -- /bin/sh
```

## Reach a ClusterIP from your laptop

```bash
kubectl port-forward svc/nginx 8080:80
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8080
```

Inside the cluster the DNS name is `nginx.default.svc.cluster.local`.

## Scale and roll out

```bash
kubectl scale deploy/nginx --replicas=3
kubectl set image deploy/nginx nginx=nginx:1.27-alpine
kubectl rollout status deploy/nginx
kubectl rollout history deploy/nginx
kubectl rollout undo deploy/nginx
kubectl rollout restart deploy/nginx
```

## Generate YAML without applying

```bash
kubectl create deployment nginx --image=nginx:1.27-alpine --dry-run=client -o yaml
kubectl create configmap app-config --from-literal=APP_COLOR=blue --dry-run=client -o yaml
```

## Namespaces and RBAC

```bash
kubectl create namespace learn
kubectl apply -n learn -f examples/nginx-deployment.yaml
kubectl get pods -A
kubectl auth can-i get pods --as=system:serviceaccount:default:log-reader
```

## Objects (short)

| Object | You use it to… |
|---|---|
| Pod | Run containers that share a network |
| ReplicaSet | Keep N matching Pods (owned by a Deployment) |
| Deployment | Declare replicas + template + rolling update |
| Service (ClusterIP) | Stable name in front of Pods, in-cluster only |
| Ingress | HTTP routes — needs a controller |
| ConfigMap | Non-secret config as env or files |
| Secret | Base64 data; not encryption |
| Namespace | Name scope |
| Role + RoleBinding | RBAC in one namespace |
