# Design-only: production Kubernetes + GitOps

This is an exercise, not a project tree. There is no `k8s/` folder here to apply.

## Why it is design-only

GitOps (Argo CD / Flux), NetworkPolicies, and a full observability stack are listed as [planned](../README.md#planned-not-written-yet). Writing YAML you cannot run would repeat the old “see `examples/`” problem.

## Task

On one page (a markdown file in your notes, not in this repo), answer:

1. **Desired state:** Which git repo is the source of truth for cluster objects? What is *not* in git (secrets, cluster credentials)?
2. **Reconciler:** Argo CD or Flux — pick one and write one sentence on how it notices a change.
3. **Promotion:** How does an image tag move from a `dev` overlay to `prod` without clicking `kubectl apply`?
4. **Security:** Name two NetworkPolicies (default-deny ingress; allow frontend → backend on one port) and one RBAC rule (a deploy robot can apply only in `app-prod`).
5. **Observability:** Which SLI would you scrape (see [Prometheus](../06-prometheus/README.md)) before you add a fifth dashboard?

## Success

Someone who finished the Kubernetes and Prometheus beginner bands can read your page and know what they would build next — without you providing manifests that do not run.
