# Basic 1 — apply and scale nginx

**Band:** Beginner  
**Setup:** kind cluster `learn` from [first success](../beginner.md#beginner-first-success). Work from `04-kubernetes/` so `examples/` paths resolve.

**Task:** Apply [examples/nginx-deployment.yaml](../examples/nginx-deployment.yaml) and [examples/nginx-service.yaml](../examples/nginx-service.yaml). Scale to 5 replicas, wait until 5 are Ready, scale back to 3.

**Hint:** `kubectl scale deploy/nginx --replicas=5` then `kubectl get pods -w`.

**Success:** `kubectl get deploy nginx` shows `3/3` READY after you scale back.

<details>
<summary>Solution sketches</summary>

`kubectl apply -f examples/nginx-deployment.yaml -f examples/nginx-service.yaml` then the two `kubectl scale` commands from [beginner.md](../beginner.md).

</details>
