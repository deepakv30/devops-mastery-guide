# Intermediate — Kubernetes

[README](./README.md) · [Beginner](./beginner.md) · Next: [Production](./advanced.md)

You should already have applied the nginx Deployment and Service on kind and curled through port-forward. Work from `04-kubernetes/`.

## Intermediate: go deeper

### ConfigMap as environment variables

A [ConfigMap](../docs/GLOSSARY.md) holds non-secret config (a color, a greeting, a feature flag). Inject it as env vars or as files. Do not put passwords here; that is a [Secret](../docs/GLOSSARY.md) (and Secrets are only base64 — see Production).

[examples/configmap.yaml](./examples/configmap.yaml) is a ConfigMap plus a one-replica Deployment that loads every key as an environment variable:

```bash
kubectl apply -f examples/configmap.yaml
kubectl exec deploy/config-demo -- env | grep -E 'APP_COLOR|GREETING'
```

**Expected output:** lines `APP_COLOR=blue` and `GREETING=hello`.

Change `APP_COLOR` in the file, `kubectl apply` again, then **restart** the Pods (`kubectl rollout restart deploy/config-demo`). Existing processes do not reread env vars.

### Ingress (the object is not the controller)

An [Ingress](../docs/GLOSSARY.md) is an HTTP routing rule: host + path → Service. It does **nothing** until an Ingress *controller* is running (ingress-nginx, Traefik, a cloud load-balancer controller). kind does not install one.

This YAML is valid and will store an object. It will not make `nginx.local` work on your laptop:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx
spec:
  rules:
    - host: nginx.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nginx
                port:
                  number: 80
```

`kubectl apply -f` that file, then `kubectl get ingress`. You will see the object. You will not get an address until a controller writes one. For this module, keep using `kubectl port-forward svc/nginx 8080:80`.

### Horizontal Pod Autoscaler (concept)

An [HPA](../docs/GLOSSARY.md) changes `replicas` on a Deployment from CPU (or custom) metrics. It needs a metrics API, usually [metrics-server](https://github.com/kubernetes-sigs/metrics-server). kind does not ship metrics-server.

You do not need to install it here. The shape looks like this:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  minReplicas: 1
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

Without metrics-server, the HPA object exists and sits on `unknown` metrics. Do not treat that as a broken cluster. For first scaling practice, keep using `kubectl scale`.

### Requests and limits

`requests` are what the scheduler reserves. `limits` are the cap (CPU is throttled; memory above the limit is OOMKilled). Add them under the container:

```yaml
resources:
  requests:
    cpu: 50m
    memory: 64Mi
  limits:
    cpu: 200m
    memory: 128Mi
```

`50m` is 0.05 of one CPU. These numbers fit `nginx:1.27-alpine` on a laptop. In Production, treat requests as required, not optional.

### Namespaces

A [namespace](../docs/GLOSSARY.md) is a name scope (`default`, `kube-system`, or one you create). `kubectl get pods` lists `default` unless you pass `-n` or `--all-namespaces`.

```bash
kubectl create namespace learn
kubectl apply -n learn -f examples/nginx-deployment.yaml
kubectl get pods -n learn
```

Namespaces are not a security boundary by themselves. Isolation needs [RBAC](../docs/GLOSSARY.md) and NetworkPolicies (Production).

### Pod vs Deployment vs Service vs Ingress

| Object | Job | Lives until… |
|---|---|---|
| Pod | Run one or more containers that share a network | The Pod dies or you delete it |
| Deployment | Keep N Pods that match a template | You delete the Deployment |
| Service | Stable DNS name + virtual IP in front of Pods | You delete the Service |
| Ingress | HTTP(S) routes from outside to Services | You delete it — and a controller must exist |

Reach for a Deployment when you have an app. Reach for a Service when something must call that app by name. Reach for Ingress when that caller is HTTP from outside the cluster *and* you have installed a controller. Reach for a naked Pod only for a throwaway debug container.

### Important kubectl (after first success)

```bash
# What is running, and where
kubectl get pods -o wide
kubectl get deploy,rs,po,svc
kubectl get events --sort-by='.lastTimestamp'

# Why a Pod is not Ready
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl logs <pod-name> -c <container>   # multi-container Pod
kubectl logs deploy/nginx --previous     # last crashed instance

# Exec and generate YAML
kubectl exec -it deploy/nginx -- /bin/sh
kubectl create deployment nginx --image=nginx:1.27-alpine --dry-run=client -o yaml

# Scale and roll out
kubectl scale deploy/nginx --replicas=5
kubectl set image deploy/nginx nginx=nginx:1.27-alpine
kubectl rollout status deploy/nginx
kubectl rollout history deploy/nginx
kubectl rollout undo deploy/nginx
```

`describe` and `logs` are the two commands that replace guessing. Use them before you change YAML at random.

ConfigMap and Secret from literals (handy; prefer files in git for anything you will keep):

```bash
kubectl create configmap app-config --from-literal=APP_COLOR=blue --dry-run=client -o yaml
kubectl create secret generic db --from-literal=password=not-for-git --dry-run=client -o yaml
```
