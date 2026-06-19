# 🚀 DevOps Mastery Guide

**From Zero to Production-Ready DevOps / SRE / Platform Engineer**

A complete, practical, hands-on learning repository covering **all essential DevOps domains**. Theory, real-world examples, best practices, exercises, and projects.

> Built for self-learners, career switchers, and professionals who want a structured path with actionable content that meets **enterprise standards**.

[![GitHub stars](https://img.shields.io/github/stars/deepakv30/devops-mastery-guide?style=social)](https://github.com/deepakv30/devops-mastery-guide/stargazers)

## 🌟 Why This Repository?

- **All-in-one**: Covers fundamentals through advanced topics in a logical progression.
- **Practical first**: Every concept has working examples you can run immediately.
- **Best practices & pitfalls**: Learn not just *how* but *why* and common mistakes to avoid.
- **Progressive**: Start simple, build up to complex real-world architectures.
- **Enterprise-focused & maintained**: Content is kept current with official standards, security-first approaches, scalability, and production readiness in mind.
- **Community-driven**: Contributions, improvements, and new modules welcome.

## 📅 Maintenance Agenda & Keeping Content Enterprise-Ready

This repository is a **living resource** committed to remaining a trusted, up-to-date reference for anyone learning or working with DevOps tools.

### Our Update Philosophy

- **Continuous Updates**: We regularly review official release notes, changelogs, and best practice guides from tool vendors to keep every module current.
- **Enterprise Standards**: All guides emphasize production-grade patterns used in real organizations — security by default, least privilege, observability integration, scalability, cost efficiency, compliance considerations, and GitOps where applicable.
- **Official References First**: Every major tool section includes direct links to the authoritative documentation so readers can always verify details and explore advanced topics.
- **Deprecation & Migration Guidance**: When tools evolve, we provide clear notes on what has changed and recommended paths forward.
- **Quality Over Quantity**: Focus on widely adopted enterprise tools (Ansible, Docker, Kubernetes, Terraform, GitHub Actions, Prometheus, etc.) with practical, battle-tested examples.

### How Updates Happen

- Proactive reviews aligned with major version releases.
- Community contributions that improve accuracy or add enterprise patterns are prioritized.
- Issues and PRs for outdated information or new relevant tools are welcomed.
- Each module aims to note its last major update for transparency.

**Goal**: Anyone should be able to reference this guide confidently for learning, interviews, or implementing solutions in production environments.

## 🤖 AI Agent Instructions (`AGENTS.md`)

This project uses a dedicated **`AGENTS.md`** file to ensure **consistency and quality** across all updates made by AI tools (Claude, Grok, Cursor, etc.).

**All AI contributors must read and follow `AGENTS.md`** before making changes. It defines:

- Core principles (always up-to-date + enterprise standard)
- Mandatory module structure
- Rules for updates and adding new modules
- Tone, style, and quality guidelines

This guarantees the repository stays coherent and trustworthy even as it grows.

## 📍 Table of Contents

- [Maintenance Agenda & Enterprise Standards](#-maintenance-agenda--keeping-content-enterprise-ready)
- [AI Agent Instructions (AGENTS.md)](#-ai-agent-instructions-agentsmd)
- [Learning Roadmap](#-learning-roadmap)
- [How to Use This Repo](#-how-to-use-this-repo)
- [Current Status](#-current-status)
- [Module Details](#-module-details)
- [Hands-on Capstone Projects](#-hands-on-capstone-projects)
- [Contributing](#-contributing)
- [Official Tool References](#-official-tool-references)
- [License](#-license)

## 🛣️ Learning Roadmap

A recommended learning path. Follow in order for best results, but modules are somewhat independent.

### Phase 0: Mindset & Prerequisites
- DevOps culture, SRE principles, collaboration
- Basic Linux terminal comfort

### Phase 1: Foundations (Build strong base)
- Linux administration deep dive
- Git & GitHub workflows (branching, PRs, actions basics)
- Bash & Python scripting for automation
- Networking essentials (protocols, DNS, load balancing, firewalls)

### Phase 2: Automation & Configuration Management
- **Ansible** (start detailed practical learning here)

### Phase 3: Modern Application Delivery
- Docker & container fundamentals + advanced
- Kubernetes (core to production patterns)

### Phase 4: Infrastructure as Code
- Terraform (or OpenTofu) for declarative infrastructure

### Phase 5: Delivery & Operations
- CI/CD with GitHub Actions (and others)
- GitOps with ArgoCD / Flux
- Observability stack (Prometheus, Grafana, logging, tracing)

### Phase 6: Security, Reliability & Scale
- DevSecOps practices
- Secrets management
- Kubernetes & cloud security
- Monitoring, alerting, on-call, chaos engineering intro

### Phase 7: Cloud, Platform & Specialization
- AWS / Azure / GCP DevOps services
- Platform Engineering
- Advanced topics (service mesh, serverless, etc.)

## 📋 How to Use This Repo

1. **Clone** the repository:
   ```bash
   git clone https://github.com/deepakv30/devops-mastery-guide.git
   cd devops-mastery-guide
   ```
2. Start with the roadmap above.
3. For each module:
   - Read the theory in the module's `README.md`
   - Run the provided examples and playbooks
   - Complete the exercises
4. Use a lab environment: local machine, VirtualBox/VMware, or cloud (AWS free tier, GCP, Azure, or local Kubernetes with kind/minikube/k3s)
5. Experiment, break things, and learn by fixing.

**Recommended tools to have**:
- A Linux environment (WSL2 on Windows is fine)
- Docker Desktop or Docker Engine
- kubectl + kind or minikube (for K8s modules)
- Terraform
- Python 3 + pip
- Git

## 📊 Current Status

- ✅ Main README with full roadmap + Maintenance Agenda
- ✅ **`AGENTS.md`** — Instructions for consistent AI/human maintenance
- ✅ `CONTRIBUTING.md` and `LICENSE`
- ✅ Detailed **Ansible Fundamentals** module
- ✅ Core Foundations overview
- ✅ Project structure & .gitignore
- 🔄 More modules being added progressively following the `AGENTS.md` standard

This is a living repository. Check back often or star it to follow updates.

## 📖 Module Details

### 01. Core Foundations

**Location**: `01-fundamentals/`

**Topics covered**:
- Linux mastery: users/groups/permissions, processes, systemd, package management, networking tools (`ip`, `ss`, `netstat`, `iptables`/`nftables`, `firewalld`)
- Git mastery: branching strategies, rebasing, cherry-pick, reflog, hooks, GitHub flow
- Bash scripting: variables, loops, functions, error handling, best practices
- Python for DevOps: requests, subprocess, argparse, automation scripts
- Networking: OSI model, TCP/UDP, HTTP/HTTPS, DNS resolution, load balancers, CDNs, firewalls
- Exercises and troubleshooting labs

**Goal**: Comfortable working on any Linux server and automating repetitive tasks.

**Official References**:
- [The Linux Documentation Project](https://tldp.org/)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [Linux man pages](https://man7.org/linux/man-pages/)

### 02. Ansible - Configuration Management

**Location**: `02-ansible/`

**Status**: ✅ **Detailed fundamentals available now**

This is one of the most important modules for immediate productivity.

**What you'll learn**:
- Why Ansible (agentless, idempotent, YAML-based, huge ecosystem)
- Architecture, inventory (static + dynamic), modules, playbooks, roles
- Ad-hoc commands and full playbooks
- Variables, facts, Jinja2 templating, conditionals, loops, handlers
- Roles for reusability + Ansible Galaxy
- Ansible Vault for secrets management
- Best practices, testing (`ansible-lint`, `--check --diff`), tags, limiting
- Real examples: web server provisioning, user management, application deployment
- Integration with other tools

**Start here for practical automation wins**:

```bash
cd 02-ansible
# Read the full guide
cat README.md
# Then explore examples/
```

See the complete detailed guide: [02-ansible/README.md](./02-ansible/README.md)

**Official References**:
- [Ansible Documentation](https://docs.ansible.com/ansible/latest/)
- [Ansible Best Practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Ansible Vault Guide](https://docs.ansible.com/ansible/latest/vault_guide/index.html)

### 03. Docker & Containerization

**Location**: `03-docker/`

**Planned content**:
- Docker architecture, images, containers, layers
- Dockerfile best practices (multi-stage, non-root, .dockerignore)
- Docker Compose for multi-container apps
- Docker networking, volumes, security scanning (Trivy)
- Registry (Docker Hub, ECR, Harbor)
- Container observability
- Exercises: Build, ship, run a full-stack app

**Official References**:
- [Docker Documentation](https://docs.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose](https://docs.docker.com/compose/)

### 04. Kubernetes & Orchestration

**Location**: `04-kubernetes/`

**Planned content**:
- Core concepts: Pods, Deployments, Services, Ingress, ConfigMaps, Secrets
- kubectl mastery & declarative management
- Helm charts & Kustomize
- StatefulSets, DaemonSets, Jobs/CronJobs
- RBAC, Network Policies, Pod Security Standards
- Operators & CRDs intro
- Production patterns: HPA, PDB, disruption budgets
- Local dev with kind/minikube + real cluster (EKS/GKE/AKS)
- Exercises & troubleshooting (common errors & fixes)

**Official References**:
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/setup/best-practices/)
- [Helm Documentation](https://helm.sh/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

### 05. Infrastructure as Code - Terraform

**Location**: `05-terraform/`

**Planned content**:
- Terraform vs other IaC tools
- HCL, providers, resources, data sources
- State management (local vs remote, locking, workspaces)
- Modules (reusable, versioning, registry)
- Variables, outputs, functions, expressions
- Provisioners (use sparingly), null_resource
- Best practices: `terraform fmt`, `validate`, `plan`, drift detection
- Multi-cloud & cloud-specific modules
- Integration with Ansible (Terraform provisions, Ansible configures)
- Exercises: Provision VPC + EC2 + security groups, then configure with Ansible

**Official References**:
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform Best Practices](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-best-practices)
- [Terraform Registry](https://registry.terraform.io/)

### 06. CI/CD Pipelines

**Location**: `06-cicd/`

**Planned content**:
- CI/CD principles & GitOps vs traditional
- **GitHub Actions** deep dive (workflows, jobs, steps, secrets, matrix, reusable workflows, self-hosted runners)
- Jenkins (optional deep dive)
- Pipeline as Code
- Testing stages (lint, unit, integration, security)
- Deployment strategies (blue-green, canary, rolling)
- ArgoCD / Flux for continuous delivery
- Exercises: Full pipeline for a sample app (build → test → scan → deploy to K8s)

**Official References**:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Argo CD Documentation](https://argo-cd.readthedocs.io/)
- [Flux Documentation](https://fluxcd.io/flux/)

### 07. Observability & Monitoring

**Location**: `07-observability/`

**Planned content**:
- Three pillars: Metrics, Logs, Traces
- **Prometheus** + **Grafana** + Alertmanager (setup, PromQL, dashboards, recording rules, alerts)
- Logging: Loki + Grafana or ELK/EFK stack
- Distributed tracing: Jaeger or OpenTelemetry
- SLOs, SLIs, error budgets (SRE practices)
- On-call & incident response basics
- Exercises: Instrument a sample app, build dashboards, set up alerting

**Official References**:
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)

### 08. Security & DevSecOps

**Location**: `08-security/`

**Planned content**:
- Shift-left security
- Secrets management: HashiCorp Vault, Sealed Secrets, External Secrets Operator
- Image & code scanning (Trivy, Snyk, SonarQube)
- Kubernetes security hardening
- Network security, mTLS, service mesh intro (Istio/Linkerd)
- Compliance & policy as code (OPA/Gatekeeper)
- Supply chain security
- Exercises: Secure a pipeline and cluster end-to-end

**Official References**:
- [HashiCorp Vault Documentation](https://developer.hashicorp.com/vault/docs)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/)

### 09. Cloud Platforms for DevOps

**Location**: `09-cloud/`

**Planned content**:
- Core services across AWS, Azure, GCP relevant to DevOps
- Managed Kubernetes (EKS, AKS, GKE)
- Serverless (Lambda, Cloud Functions, Cloud Run)
- IaC with cloud-native tools vs Terraform
- Cost optimization & FinOps basics
- Multi-cloud strategies

**Official References**:
- [AWS DevOps Documentation](https://aws.amazon.com/devops/)
- [Azure DevOps Documentation](https://learn.microsoft.com/en-us/azure/devops/)
- [Google Cloud DevOps](https://cloud.google.com/devops)

### 10. GitOps, Platform Engineering & Advanced Topics

**Location**: `10-advanced/`

**Planned content**:
- GitOps principles & tools (ArgoCD, Flux)
- Platform Engineering (Internal Developer Platforms, Backstage)
- Service Mesh deep dive
- Chaos Engineering (LitmusChaos, Chaos Monkey)
- SRE practices in depth
- Career guidance & interview prep for DevOps/SRE roles

**Official References**:
- [Argo CD](https://argo-cd.readthedocs.io/en/stable/)
- [Backstage Documentation](https://backstage.io/docs/)
- [OpenTelemetry](https://opentelemetry.io/docs/)

## 🔬 Hands-on Capstone Projects

Build these to solidify learning:

1. **Full CI/CD Pipeline** for a 3-tier web app (frontend, backend, DB) using GitHub Actions + Docker + Kubernetes + monitoring.
2. **Infrastructure as Code + Config Mgmt** : Terraform provisions cloud resources + Ansible configures them.
3. **Production-like Kubernetes Environment** with GitOps, observability, and security policies.
4. **Custom Internal Developer Platform** (stretch goal).

## 🤝 Contributing

Contributions are highly encouraged!

- Read `CONTRIBUTING.md` and `AGENTS.md` before contributing.
- Add new examples or improve existing ones
- Write new module sections following the mandatory structure in `AGENTS.md`
- Fix typos, improve explanations
- Add exercises or solutions
- Suggest new topics via Issues

Please follow conventional commits and open a PR. Updates that help keep content enterprise-standard and current are especially valued.

## 📑 Official Tool References

Quick access to authoritative sources:

- **Ansible**: [docs.ansible.com](https://docs.ansible.com/ansible/latest/)
- **Docker**: [docs.docker.com](https://docs.docker.com/)
- **Kubernetes**: [kubernetes.io/docs](https://kubernetes.io/docs/)
- **Terraform**: [developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform/docs)
- **GitHub Actions**: [docs.github.com/en/actions](https://docs.github.com/en/actions)
- **Prometheus**: [prometheus.io/docs](https://prometheus.io/docs/)
- **Grafana**: [grafana.com/docs](https://grafana.com/docs/)
- **HashiCorp Vault**: [developer.hashicorp.com/vault/docs](https://developer.hashicorp.com/vault/docs)
- **Argo CD**: [argo-cd.readthedocs.io](https://argo-cd.readthedocs.io/)

(Links for additional tools will be added as modules are expanded.)

## 📄 License

This project is licensed under the MIT License.

---

**Star this repo** if you find it useful ⭐  
**Share it** with others learning DevOps.

Let's build better, more reliable systems together!