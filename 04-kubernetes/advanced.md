# Production — Kubernetes

[README](./README.md) · [Intermediate](./intermediate.md)

**You should already be able to:** apply a Deployment and Service on kind; `kubectl port-forward` and curl it; read `kubectl describe` / `kubectl logs` when a Pod is not Ready; inject a ConfigMap as env.

This section is not a second install. Do not start here with kubeadm.

## Resource requests and limits are required

On a laptop, Pods schedule without requests. On a shared cluster they will pack onto a node until the node falls over, or sit `Pending` while you stare at `kubectl get pods`.

Set `requests` (what the scheduler counts) and `limits` (the cap) on every container you ship. The snippet is in [Intermediate](./intermediate.md#requests-and-limits). Tune from real usage later; do not ship `requests` of zero.

## NetworkPolicies

The default is allow-all: any Pod can talk to any Pod. A NetworkPolicy selects Pods and lists what Ingress/Egress is allowed. **Once a policy selects a Pod, traffic that is not listed is denied** (for the directions in `policyTypes`).

Example — only Pods in the same namespace may hit `app: nginx` on port 80:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: nginx-from-same-ns
spec:
  podSelector:
    matchLabels:
      app: nginx
  policyTypes: [Ingress]
  ingress:
    - from:
        - podSelector: {}
      ports:
        - protocol: TCP
          port: 80
```

Policies do nothing if the cluster CNI does not enforce them. kind’s default CNI does not give you a production policy story. Treat the YAML as the API you will use on a cluster that does (Calico, Cilium, a cloud CNI with policy support).

## RBAC

[RBAC](../docs/GLOSSARY.md) answers “who can do what to which API objects.” A **Role** is a list of verbs on resources in one namespace. A **RoleBinding** attaches that Role to a user, group, or ServiceAccount. `ClusterRole` / `ClusterRoleBinding` are the same idea, cluster-wide.

[examples/rbac-example.yaml](./examples/rbac-example.yaml) creates ServiceAccount `log-reader`, a Role that can `get`/`list` Pods and Pod logs, and a RoleBinding.

```bash
kubectl apply -f examples/rbac-example.yaml
kubectl auth can-i get pods --as=system:serviceaccount:default:log-reader
kubectl auth can-i delete pods --as=system:serviceaccount:default:log-reader
```

**Expected output:** `yes` then `no`.

Apps in the cluster should run as a ServiceAccount with only the verbs they need, not as the default account with a wide RoleBinding you copied from a blog.

## Pod Security Standards (restricted)

Kubernetes ships three [Pod Security](https://kubernetes.io/docs/concepts/security/pod-security-standards/) levels: `privileged`, `baseline`, `restricted`. They are labels on a namespace (`pod-security.kubernetes.io/enforce=restricted`). Restricted blocks running as root, host networking, and extra capabilities.

You do not turn this on for the kind `default` namespace while you are learning nginx. You do turn it on for namespaces that run other people’s workloads. Policy engines such as OPA/Gatekeeper add more admission rules on top of RBAC and Pod Security; you do not need them to start.

## Helm and Kustomize

**Helm** is a package manager for Kubernetes YAML. A *chart* is templates plus a `values.yaml`. `helm install` renders manifests and applies them. Use it when you are installing someone else’s app (or your own, once the YAML is repetitive). Start: [Helm quickstart](https://helm.sh/docs/intro/quickstart/).

**Kustomize** is overlays on raw YAML (change the image tag, add a label, patch a replica count) without a templating language. It is built into kubectl: `kubectl apply -k <dir>`. Start: [Kustomize introduction](https://kubectl.docs.kubernetes.io/guides/introduction/kustomize/).

Neither replaces understanding Deployment + Service. Do not make `helm install kube-prometheus-stack` your first cluster experience.

## Secrets are base64, not encryption

A Kubernetes Secret is an API object. The value you put in `data:` is base64-encoded so it can hold binary. Anyone who can `kubectl get secret` can decode it. etcd is not encrypted at rest unless you turned that on.

```bash
echo -n 'do-not-commit-this' | base64
```

Do not commit real Secret YAML. Use sealed-secrets, an external store ([Vault](../docs/GLOSSARY.md) appears in capstone 2), or a cloud secret manager, and keep the *name* of the key in git.

## Where production clusters actually come from

kind is a Docker container pretending to be a node. Production is not that.

- **Managed:** EKS, GKE, AKS (and similar). The vendor runs the API server and etcd. You run node groups, networking, and add-ons. This is what most teams use.
- **kubeadm:** The installer that turns VMs into a cluster. Official guide: [Creating a cluster with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/). You need multiple machines, a CNI plugin, and a plan for certificates, upgrades, and etcd backups. Old `kubeadm init` + random Flannel URLs from blog posts are how people get a half-broken control plane.

Use kubeadm when you are building the cluster yourself and you will own those operational pieces. Do not use it as the first learning install.
