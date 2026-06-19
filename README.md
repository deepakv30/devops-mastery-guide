# 🚀 DevOps Mastery Guide

**From Zero to Production-Ready DevOps / SRE / Platform Engineer**

A complete, practical, hands-on learning repository covering **all essential DevOps domains**. Theory, real-world examples, best practices, exercises, and projects.

> Built for self-learners, career switchers, and professionals who want a structured path with actionable content that meets **enterprise standards**.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2026--06--19-brightgreen)
![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)

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
- ✅ `CONTRIBUTING.md`, `LICENSE`, and `CHANGELOG.md`
- ✅ `docs/MODULE_TEMPLATE.md` for consistent module creation
- ✅ Complete numbered structure: 01-linux through 08-github-actions
- ✅ Prometheus module expanded with real examples
- ✅ New Grafana and GitHub Actions modules added
- ✅ `projects/` folder with capstone ideas
- ✅ GitHub Issue Templates added
- 🔄 More modules being added progressively following `AGENTS.md` standards

This is a living repository. Check back often or star it to follow updates.

## 📖 Module Details

### 01. Linux Mastery

**Location**: `01-linux/`

**Topics covered**:
- Users, groups, permissions
- Process & service management (systemd)
- Package management
- Networking tools
- Logging and performance
- Security hardening basics
- Exercises and troubleshooting

**Goal**: Strong Linux foundation required for all DevOps work.

See: [01-linux/README.md](./01-linux/README.md)

**Official References**:
- [The Linux Documentation Project](https://tldp.org/)
- [Linux man pages](https://man7.org/linux/man-pages/)

### 02. Ansible - Configuration Management

**Location**: `02-ansible/`

**Status**: ✅ **Detailed fundamentals available**

This is one of the most important modules for immediate productivity.

**What you'll learn**:
- Agentless automation, inventory, modules, playbooks, roles
- Variables, templating, handlers, Vault
- Best practices and enterprise usage
- Integration with Linux, Docker, Kubernetes, and Terraform

See: [02-ansible/README.md](./02-ansible/README.md)

**Official References**:
- [Ansible Documentation](https://docs.ansible.com/ansible/latest/)
- [Ansible Best Practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)

### 03. Docker & Containerization

**Location**: `03-docker/`

**Status**: ✅ **Started with full structure**

**What you'll learn**:
- Docker architecture, images, containers, layers
- Dockerfile best practices (multi-stage builds, non-root users)
- Docker Compose
- Image security and scanning
- Integration with CI/CD and Kubernetes

See: [03-docker/README.md](./03-docker/README.md)

**Official References**:
- [Docker Documentation](https://docs.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### 04. Kubernetes & Orchestration

**Location**: `04-kubernetes/`

**Status**: ✅ **Structure created**

**What you'll learn**:
- Pods, Deployments, Services, Ingress
- Helm, Kustomize, RBAC, Network Policies
- Production patterns and security hardening
- GitOps integration

See: [04-kubernetes/README.md](./04-kubernetes/README.md)

**Official References**:
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)

### 05. Infrastructure as Code - Terraform

**Location**: `05-terraform/`

**Status**: ✅ **Structure created**

**What you'll learn**:
- HCL, providers, modules, state management
- Best practices for remote state and workspaces
- Integration with Ansible and Kubernetes

See: [05-terraform/README.md](./05-terraform/README.md)

**Official References**:
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)

### 06. Prometheus Monitoring

**Location**: `06-prometheus/`

**Status**: ✅ **Expanded with examples**

**What you'll learn**:
- Prometheus architecture and core concepts
- Prometheus Operator + kube-prometheus-stack
- PromQL, recording rules, and alerting
- Enterprise best practices (cardinality, HA, SLIs/SLOs)
- Integration with Kubernetes and Grafana

See: [06-prometheus/README.md](./06-prometheus/README.md) + examples/

**Official References**:
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Prometheus Operator](https://prometheus-operator.dev/)

### 07. Grafana

**Location**: `07-grafana/`

**Status**: ✅ **New module added**

**What you'll learn**:
- Grafana dashboards, variables, and alerting
- Integration with Prometheus
- Best practices for enterprise visualization and access control
- Dashboard as Code

See: [07-grafana/README.md](./07-grafana/README.md)

**Official References**:
- [Grafana Documentation](https://grafana.com/docs/)

### 08. GitHub Actions CI/CD

**Location**: `08-github-actions/`

**Status**: ✅ **New module added**

**What you'll learn**:
- Workflow creation, reusable workflows, and matrix builds
- Secure secrets management and OIDC
- Docker builds and Kubernetes deployments
- Enterprise CI/CD best practices

See: [08-github-actions/README.md](./08-github-actions/README.md)

**Official References**:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🔬 Hands-on Capstone Projects

**Location**: `projects/`

Build these to solidify learning:

1. **Full CI/CD Pipeline** for a 3-tier web app
2. **Infrastructure as Code + Configuration Management** (Terraform + Ansible)
3. **Production-Ready Kubernetes Environment** with GitOps and observability

See: [projects/README.md](./projects/README.md)

## 🤝 Contributing

Contributions are highly encouraged!

- Read `CONTRIBUTING.md` and `AGENTS.md` before contributing.
- Use the [Module Template](./docs/MODULE_TEMPLATE.md) when creating new modules.
- Add new examples or improve existing ones
- Write new module sections following the mandatory structure

Please follow conventional commits and open a PR.

## 📑 Official Tool References

Quick access to authoritative sources:

- **Ansible**: [docs.ansible.com](https://docs.ansible.com/ansible/latest/)
- **Docker**: [docs.docker.com](https://docs.docker.com/)
- **Kubernetes**: [kubernetes.io/docs](https://kubernetes.io/docs/)
- **Terraform**: [developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform/docs)
- **Prometheus**: [prometheus.io/docs](https://prometheus.io/docs/)
- **GitHub Actions**: [docs.github.com/en/actions](https://docs.github.com/en/actions)
- **Grafana**: [grafana.com/docs](https://grafana.com/docs/)

## 📄 License

This project is licensed under the MIT License.

---

**Star this repo** if you find it useful ⭐  
**Share it** with others learning DevOps.

Let's build better, more reliable systems together!