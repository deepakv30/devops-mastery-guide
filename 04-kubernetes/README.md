# Kubernetes — Run and heal many containers as one system

| | |
|---|---|
| Levels | Beginner → Intermediate → Production |
| Time | Beginner ~40 min · full module ~6h |
| Prerequisites | [Docker](../03-docker/README.md) first success; `kubectl` + [kind](https://kind.sigs.k8s.io/docs/user/quick-start/) |
| You will be able to | (1) explain [Pod](../docs/GLOSSARY.md) vs [Deployment](../docs/GLOSSARY.md) vs [Service](../docs/GLOSSARY.md) (2) apply YAML on kind and curl the Service (3) use `describe` / `logs` when a Pod is not Ready |

**Last verified:** 2026-08-16 · **Tested with:** Kubernetes 1.31+ via kind, kubectl matching the cluster

The first cluster in this module is **kind**, not kubeadm. kubeadm belongs in [Production](./advanced.md).

## 60-second overview

Kubernetes keeps a declared number of containers running and reachable. You write YAML ([manifests](../docs/GLOSSARY.md)) that say “three copies of this image, behind this name.” The control plane stores that [desired state](../docs/GLOSSARY.md), watches what is actually running, and starts or kills Pods until the two match. That loop is [reconciliation](../docs/GLOSSARY.md).

A laptop cluster is enough to learn the objects. A production cluster is a different problem (certificates, etcd backups, upgrades, networking) and is covered later.

Jargon used more than once is in the [glossary](../docs/GLOSSARY.md). How to study: [How to learn](../docs/HOW_TO_LEARN.md).

## Mental model

A **Pod** is one lunch tray (one or more containers sharing a network). A **Deployment** is the cafeteria manager who keeps N trays out. A **Service** is the menu-board name that stays put while trays come and go.

```mermaid
flowchart LR
  Deployment --> ReplicaSet --> Pod
  Service --> Pod
```

You edit the Deployment. Kubernetes creates a [ReplicaSet](../docs/GLOSSARY.md), which creates Pods. The Service selects those Pods by [label](../docs/GLOSSARY.md), not by Pod name.

## Skip to

| Band | What you get | Go |
|---|---|---|
| Beginner | Six concepts + kind install + first success (apply, curl, scale) | [beginner.md](./beginner.md) |
| Intermediate | ConfigMap, Ingress, HPA, requests/limits, namespaces, kubectl | [intermediate.md](./intermediate.md) |
| Production | Requests required, NetworkPolicy, RBAC, Helm/Kustomize, real clusters | [advanced.md](./advanced.md) |

## Files in this module

| File | Used in |
|---|---|
| [examples/nginx-deployment.yaml](./examples/nginx-deployment.yaml) | Beginner first success — 3 replicas of `nginx:1.27-alpine` |
| [examples/nginx-service.yaml](./examples/nginx-service.yaml) | Beginner first success — ClusterIP on port 80 |
| [examples/configmap.yaml](./examples/configmap.yaml) | Intermediate — ConfigMap injected as env |
| [examples/rbac-example.yaml](./examples/rbac-example.yaml) | Production — Role + RoleBinding + ServiceAccount |
| [cheatsheet.md](./cheatsheet.md) | Command and object reference |

## Pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| `ImagePullBackOff` | Image name or tag wrong, or the node cannot reach the registry | `kubectl describe pod <name>` → Events. Fix the tag. On kind, confirm Docker can pull the same image. |
| `CrashLoopBackOff` | Process inside the container exits | `kubectl logs <name>` and `kubectl describe pod <name>`. Fix the command, config, or missing file. |
| Pod stays `Pending` | No node has enough CPU/memory, or a taint the Pod does not tolerate | `kubectl describe pod <name>` → Events (`FailedScheduling`). Lower requests, or free the node. |
| Service has no endpoints | Selector does not match Pod labels | `kubectl get pods --show-labels` and `kubectl get endpoints nginx`. Align `spec.selector` with the Pod template labels. |
| DNS name does not resolve inside the cluster | CoreDNS not Ready, or you used the wrong name | `kubectl get pods -n kube-system`. From another Pod the name is `nginx.default.svc.cluster.local` (Service `nginx` in namespace `default`). |
| `kubectl edit pod` rejects the change | Most Pod spec fields are immutable | Edit the Deployment (`kubectl edit deploy/nginx` or change the YAML and `kubectl apply`). |

## How this connects

- **Previous:** [Docker](../03-docker/README.md) — the image is what the Pod runs. If you cannot `docker run` the image, Kubernetes will not run it either.
- **Next:** [GitHub Actions](../05-github-actions/README.md) is how you build and deploy the image; [Prometheus](../06-prometheus/README.md) is how you watch what you shipped.
- **When not to use this:** One container on a laptop is Docker Compose, not a cluster. Do not stand up Kubernetes to run a single process you can `docker run`.

## Practice

Do these from `04-kubernetes/` so the `examples/` paths work. Full write-ups live under [exercises/](./exercises/).

| # | Band | Exercise |
|---|---|---|
| 1 | Basic | [Apply and scale nginx](./exercises/01-basic-scale.md) |
| 2 | Basic | [ConfigMap as env](./exercises/02-basic-configmap.md) |
| 3 | Intermediate | [Ingress object without a controller](./exercises/03-intermediate-ingress.md) |
| 4 | Production | [ServiceAccount can-i](./exercises/04-production-rbac.md) |

## Cheat sheet

[cheatsheet.md](./cheatsheet.md) — kind, apply/get/describe/logs, scale, rollout, port-forward, `auth can-i`.

## Official documentation

- [Start here: kind Quick Start](https://kind.sigs.k8s.io/docs/user/quick-start/) — laptop cluster used in this module
- [Start here: kubectl install](https://kubernetes.io/docs/tasks/tools/) — the client, not the cluster
- [Deep reference: Kubernetes concepts](https://kubernetes.io/docs/concepts/) — objects after you have applied one Deployment
- [Deep reference: kubectl cheat sheet](https://kubernetes.io/docs/reference/kubectl/quick-reference/) — flags this page does not list
