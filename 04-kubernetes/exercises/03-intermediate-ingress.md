# Intermediate — Ingress object without a controller

**Band:** Intermediate  
**Setup:** First-success Deployment and Service are applied. Work from `04-kubernetes/`.

**Task:** Write an Ingress YAML that sends `/` to Service `nginx` on port 80. Apply it. Explain why `curl` to that Ingress does not work on this kind cluster yet.

**Hint:** An Ingress object is data. A controller is a running Pod that reads it. kind does not install one for you.

**Success:** `kubectl get ingress` shows your object, and you can name “no Ingress controller” as the reason traffic does not flow.

<details>
<summary>Solution sketches</summary>

Copy the Ingress snippet in [intermediate.md](../intermediate.md). `kubectl get pods -A` will not show an ingress-nginx (or similar) controller unless you installed one.

</details>
