# Beginner — Kubernetes

[README](./README.md) · Next: [Intermediate](./intermediate.md)

A [Pod](../docs/GLOSSARY.md) is one lunch tray. A [Deployment](../docs/GLOSSARY.md) keeps N trays out. A [Service](../docs/GLOSSARY.md) is the name that stays put. First cluster is [kind](../docs/GLOSSARY.md) (Kubernetes in Docker), not kubeadm.

## Beginner: core concepts

### Desired state and the API server

- **What it is:** You declare what should exist. `kubectl` sends that declaration to the API server. [etcd](../docs/GLOSSARY.md) is the cluster’s memory of those objects.
- **Why it exists:** You cannot SSH to every machine and start containers by hand. Controllers watch the API and move reality toward the declaration ([reconciliation](../docs/GLOSSARY.md)).
- **How it looks:** `kubectl apply -f examples/nginx-deployment.yaml` creates or updates a Deployment object. `kubectl get deploy nginx` reads it back.
- **Common confusion:** `kubectl` is not the cluster. It is a client. The cluster is the API server, etcd, controllers, and kubelets.

### Pod

- **What it is:** The smallest deployable unit: one or more [containers](../docs/GLOSSARY.md) that share a network namespace (they see each other as `localhost`) and can share volumes.
- **Why it exists:** Some processes need a helper next to them (a proxy, a log shipper). Those helpers are extra containers in the same Pod.
- **How it looks:** `kubectl get pods` lists them. Each Pod gets its own IP, which changes if the Pod is recreated.
- **Common confusion:** A Pod is not a virtual machine, and it is [ephemeral](../docs/GLOSSARY.md). Do not create naked Pods for apps you care about. Use a Deployment.

### Deployment / ReplicaSet

- **What it is:** A Deployment is the replica count plus a Pod template. Kubernetes creates a [ReplicaSet](../docs/GLOSSARY.md); the ReplicaSet creates the Pods.
- **Why it exists:** You want N copies, a rolling replace when the image changes, and a new Pod when one dies.
- **How it looks:** `spec.replicas: 3` and `spec.template` in [examples/nginx-deployment.yaml](./examples/nginx-deployment.yaml).
- **Common confusion:** You almost never create a ReplicaSet yourself. Edit the Deployment; it owns the ReplicaSet.

### Labels and selectors

- **What it is:** A [label](../docs/GLOSSARY.md) is a key-value tag on an object. A [selector](../docs/GLOSSARY.md) is a query over those tags.
- **Why it exists:** Names of Pods are generated (`nginx-7d4c8b9f5-xk2m1`). Services and ReplicaSets find Pods by label, not by name.
- **How it looks:** The Pod template has `labels: {app: nginx}`. The Deployment selector and the Service selector both say `app: nginx`.
- **Common confusion:** Matching the Deployment’s *own* `metadata.labels` is not enough. The Service must match the **Pod template** labels.

### Service (ClusterIP first)

- **What it is:** A stable virtual IP and DNS name in front of Pods. [ClusterIP](../docs/GLOSSARY.md) is reachable only inside the cluster. That is the default type.
- **Why it exists:** Pod IPs die with the Pod. Callers need a name that outlives any one tray.
- **How it looks:** [examples/nginx-service.yaml](./examples/nginx-service.yaml) — `type: ClusterIP`, `selector.app: nginx`, `port: 80`.
- **Common confusion:** ClusterIP is not on your laptop. `curl` from your shell will not hit it until you `kubectl port-forward` (or install an Ingress controller later).

### kubectl as the client

- **What it is:** A CLI that talks HTTP to the API server using a kubeconfig file (context, cluster, user).
- **Why it exists:** One tool to apply YAML, list objects, and debug.
- **How it looks:** `kubectl apply`, `kubectl get`, `kubectl describe`, `kubectl logs`.
- **Common confusion:** Installing kubectl does not create a cluster. kind (this module) or a cloud control plane is the cluster. `kubectl config current-context` tells you which one you are talking to.

## Beginner: install

You need Docker running ([module 03](../03-docker/README.md)). Then install the two binaries from their official pages — do not invent package names from a blog:

1. [Install kubectl](https://kubernetes.io/docs/tasks/tools/) (match it to the kind node version you will run, 1.31+).
2. [Install kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation).

Create the learning cluster:

```bash
kind create cluster --name learn
kubectl cluster-info
kubectl config current-context
```

**Expected output:** `kubectl cluster-info` prints a control-plane URL (often `https://127.0.0.1:…`). `current-context` is `kind-learn`.

**If it failed:** `kind: command not found` → install is not on `PATH`. `Cannot connect to the Docker daemon` → start Docker; kind runs nodes as containers. `kind create cluster` says the name already exists → skip create, or `kind delete cluster --name learn` and recreate.

Do **not** run `kubeadm init` on your laptop. That path is in [Production](./advanced.md).

## Beginner: first success

**Goal:** Apply a 3-replica nginx Deployment and a ClusterIP Service on kind, then curl it through port-forward.  
**Time:** ~20 minutes after kind is installed.

Work from this directory (`04-kubernetes/`) so the `examples/` paths resolve.

```bash
kind create cluster --name learn   # skip if it already exists
kubectl apply -f examples/nginx-deployment.yaml
kubectl apply -f examples/nginx-service.yaml
kubectl get deploy,po,svc
kubectl wait --for=condition=available deploy/nginx --timeout=90s
kubectl port-forward svc/nginx 8080:80
```

In another terminal:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8080
```

Leave port-forward running while you curl. Stop it with Ctrl+C when you are done.

**Expected output:**

- `kubectl get deploy,po,svc` shows Deployment `nginx` `3/3`, three Pods `Running` `1/1`, Service `nginx` type `ClusterIP` port `80`. Cluster IP and Pod names will differ.
- `kubectl wait` exits 0.
- `curl` prints `200`.

**If it failed:**

- `ImagePullBackOff` → the node cannot pull `nginx:1.27-alpine`. Check network / Docker pull, then `kubectl describe pod` on one nginx Pod.
- `wait` times out → `kubectl get pods` and `kubectl describe pod <name>`. Common causes: still pulling, or Docker is out of disk.
- `port-forward` bind error on 8080 → use `8081:80` and curl `http://127.0.0.1:8081`.
- `curl` connection refused → port-forward is not running, or you curled before the Deployment was Available.

### The Deployment reconciles

With the same cluster still up:

```bash
kubectl scale deploy/nginx --replicas=1
kubectl get pods
kubectl scale deploy/nginx --replicas=3
kubectl get pods
```

After the first scale you should see one Ready Pod (others `Terminating`, then gone). After the second scale, three Pods again. You did not create or delete Pods by name. The Deployment compared desired (`replicas`) to actual and fixed the difference.

Leave the cluster running for Intermediate. Delete it later with `kind delete cluster --name learn`.
