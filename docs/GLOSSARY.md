# Glossary

One-sentence definitions for terms this guide uses more than once. Linked from modules on first use.

## A–D

- **Agentless** — The control machine reaches targets over SSH (or an API). Nothing extra is installed and left running on the target. Ansible’s default model.
- **Alert** — A rule that becomes true (or stays true) and is sent to a human or a pager. In Prometheus this is evaluated on the server and handed to Alertmanager.
- <a id="branch"></a>**Branch** (Git) — A movable name pointing at a commit. `main` / `master` is a default name, not a special object.
- <a id="commit"></a>**Commit** (Git) — A snapshot of the index plus parent, author, date, and message. Git can show a diff between commits; it does not store “a patch” as the object.
- **Artifact** — A file a CI job produced and stored for a later job or for download (a binary, a test report, a built image tarball).
- **Cardinality** — How many unique time series a metric explodes into. A label like `user_id` can make Prometheus fall over.
- **ClusterIP** — A Kubernetes Service that is reachable only inside the cluster. The default Service type.
- **Collection** (Ansible) — A distributable bundle of modules, plugins, and roles (for example `community.docker`).
- **ConfigMap** — A Kubernetes object that holds non-secret configuration and can be mounted as files or env vars.
- <a id="container"></a>**Container** — A running instance of an image: isolated process(es) sharing the host kernel.
- **Control node** — The machine where you run `ansible-playbook`. Targets are **managed nodes**.
- **CRD** — Custom Resource Definition. Extends the Kubernetes API with a new object type (ServiceMonitor is one).
- **Dashboard** — A Grafana page of panels that query one or more data sources.
- **Data source** (Grafana) — A backend Grafana can query (Prometheus, Loki, …).
- **Declarative** — You describe the end state; the tool computes the steps. Opposite of imperative “run these commands in order.”
- **Deployment** (Kubernetes) — Desired replica count and pod template. Kubernetes creates ReplicaSets and Pods to match.
- **Desired state** — What you declared should exist. Terraform files, Kubernetes manifests, and Ansible playbooks are all desired-state documents (Ansible is closer to a recipe than a continuous reconciler).
- **Drift** — Reality no longer matches the last desired state (someone clicked the console, a disk filled up, a Pod died and was not recreated as you expected).

## E–K

- **etcd** — The key-value store that is Kubernetes’ memory of cluster state.
- **Exporter** — A small process that translates someone else’s stats into Prometheus’s pull format (`/metrics`).
- **First success** — The shortest path in a module that produces a known output. Do this before Intermediate material.
- **Handler** (Ansible) — A task that runs only when notified, usually “restart this service after a config change.”
- <a id="head"></a>**HEAD** (Git) — The commit you are on, usually the tip of a branch.
- **Helm** — A package manager for Kubernetes manifests (charts + values).
- <a id="index-git"></a>**Index** (Git) — The tree the next commit will store. Also called the staging area. `git add` copies a file into the index; `git commit` writes a commit from it.
- **HPA** — Horizontal Pod Autoscaler. Adds or removes Pods from a Deployment based on metrics.
- **Idempotent** — Running the same change twice leaves the system in the same state. A playbook that always `apt install`s nginx is idempotent; `echo x >> file` is not.
- <a id="image"></a>**Image** — An immutable filesystem snapshot plus a default command. Built from a Dockerfile; run as a container.
- **Ingress** — Kubernetes object that routes HTTP(S) from outside the cluster to Services. Needs an Ingress *controller*.
- **Inventory** (Ansible) — The list of hosts (and groups) a playbook can target.
- **Job** (GitHub Actions) — A set of steps that run on one runner. A workflow has one or more jobs.
- **kind** — Kubernetes in Docker. The local cluster this guide uses for first success.

## L–P

- **Label** (Prometheus / Kubernetes) — A key-value tag. In Prometheus it is part of a series identity; in Kubernetes it is how objects find each other.
- <a id="layer-docker"></a>**Layer** (Docker) — One filesystem diff in an image, usually one Dockerfile instruction. Layers are cached and shared.
- <a id="least-privilege"></a>**Least privilege** — Grant only the permission the task needs, nothing more.
- **Managed node** — A host Ansible configures. Needs Python and SSH (or WinRM), not an Ansible agent.
- **Manifest** — A YAML (or JSON) file that declares a Kubernetes object.
- **Mental model** — The few objects and arrows you must hold in your head to use a tool. Drawn as mermaid in each module.
- **Module** (Ansible) — A discrete action (`apt`, `copy`, `service`). Prefer modules over `shell`.
- **Namespace** — A Kubernetes scope for names. Isolation is weak unless you add RBAC and NetworkPolicies.
- **OIDC** — A login protocol. In CI, the runner proves who it is to a cloud or Vault so you do not store long-lived keys.
- **Overlay network** — A virtual network spanning hosts so containers on different machines can share an address space.
- **Plan** (Terraform) — The computed diff between desired state and the state file, shown before apply.
- **Playbook** — An Ansible YAML file: which hosts, which tasks, in what order.
- **Pod** — The smallest Kubernetes deployable: one or more containers that share network and volumes. Ephemeral.
- **PromQL** — Prometheus Query Language. How you ask the TSDB questions.
- **Provider** (Terraform) — The plugin that talks to an API (AWS, Docker, Kubernetes, `local`, …).
- **Pull model** — Prometheus scrapes targets. The target does not push (except short jobs via Pushgateway).

## R–Z

- **RBAC** — Role-based access control. Who can do what to which API objects.
- <a id="remote"></a>**Remote** (Git) — Another copy of the repository you fetch from and push to. The URL can be a path on disk or a host (`https://`, `git@`). `origin` is a common *name*, not GitHub.
- **Reconciliation** — A loop that reads desired state and current state and moves reality toward desired.
- **Recording rule** — A PromQL expression Prometheus precomputes and stores as a new series.
- **ReplicaSet** — Ensures N Pods matching a selector exist. You usually let a Deployment own this.
- **Resource** (Terraform) — One object the provider can create (`aws_instance`, `local_file`, …).
- **Role** (Ansible) — A reusable directory layout of tasks, templates, vars, and handlers.
- **Runner** — The machine that executes a GitHub Actions job (GitHub-hosted or self-hosted).
- **Scrape** — One HTTP GET of a `/metrics` endpoint by Prometheus.
- **Secret** — Data you do not want in git. Kubernetes Secrets are base64-encoded, not encrypted at rest by default.
- **Selector** — A label query. A Service finds Pods by selector; a ServiceMonitor finds Services the same way.
- **Service** (Kubernetes) — A stable virtual IP (and DNS name) in front of Pods that may come and go.
- **ServiceMonitor** — Prometheus Operator CRD that tells Prometheus which Services to scrape.
- **SLI / SLO** — Service level indicator (a number you measure) and objective (the target for that number).
- **State file** (Terraform) — Terraform’s memory of what it created and the IDs those objects have. Not the same as the `.tf` files.
- **TSDB** — Time-series database. Prometheus’s on-disk store.
- **Vault** — HashiCorp’s secrets manager. Used in capstone 2; not required for module first-success paths.
- <a id="volume"></a>**Volume** — Persistent or shared files for a container. A **bind mount** is a host path; a named volume is managed by Docker.
- **Workflow** — A GitHub Actions YAML file under `.github/workflows/` that defines triggers, jobs, and steps.
- <a id="working-tree"></a>**Working tree** — The files in the directory next to `.git` as they sit on disk. Saving in an editor changes the working tree; `git add` copies into the index.
- **Workspace** (Terraform) — A named copy of state, often used (and often overused) to separate environments.
- **Idempotency** — See **Idempotent**.

## See also

- [Concept map](./CONCEPT_MAP.md) — how the tools connect
- [How to learn](./HOW_TO_LEARN.md) — how the three levels work
