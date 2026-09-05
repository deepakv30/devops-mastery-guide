# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed

- Module folders now match the default (apps) study order: Git is `02-git/`, GitHub Actions is `05-github-actions/`, Ansible is `08-ansible/`, Terraform is `09-terraform/`. Linux, Docker, Kubernetes, Prometheus, and Grafana keep their numbers. `from-zero` includes Git. Old site URLs redirect.
- Module registration is `curriculum.json` plus `learning-paths/`. CI, preflight, honesty checks, and the site catalog read that list. `npm run sync` fills the README and How-to-learn tables.

### Added

- **09 Git** module (`09-git/`): local first success (`git init` / add / commit / log), a disk remote, ignore file, and exercises. Catalog number 09; learning-path order is after Linux on apps and machines. Existing 01–08 folders were not renamed.
- Agent Skills layout under `.agents/skills/` ([spec](https://agentskills.io/home)) and the `enhance-module` skill so later agents can deepen a module without dropping the teaching contract.
- Grok workflow `.grok/workflows/enhance-module.rhai` (enhance, then a read-only review). Advisory only — no CI fail.
- Learning-path manifests in `learning-paths/` (from-zero, apps, machines, observe) and `curriculum.json`.
- `scripts/preflight.sh` — reports which first-success paths can run on this machine.
- `ROADMAP.md` — written vs planned; planned topics stay out of the module table.
- `exercises/` and `quiz.json` for Linux, Docker, and Kubernetes (app path). Other modules still use inline Practice.
- Static learning site under `site/` (goal cards, module reader, glossary, local progress). Markdown stays canonical.

## [2026-08-16]

### Changed

- Root README is now a learner front door: choose-a-path, the eight modules that exist, and a mermaid of the real sequence. Maintenance copy and AI rules moved out.
- Roadmap no longer presents unwritten topics (Git, GitOps, cloud, DevSecOps) as if they were in the tree.
- Every module follows a beginner → intermediate → Production contract: mental model, 15-minute first success, then deeper material.
- Kubernetes first cluster is kind, not kubeadm. Prometheus and Grafana first install is Docker Compose, not `kube-prometheus-stack`.
- Terraform first success uses the `local` provider. No AWS account required.
- Capstone 1 is a guided local kind walkthrough. The GitHub Actions deploy step is labeled a stub.
- Capstone 2 has a localhost Ansible + local Terraform path before Vault or GitLab CI. GitLab is explained as a contrast to module 08, not a surprise.
- Capstone 3 is a design-only page. There is no fake project folder.

### Added

- `docs/HOW_TO_LEARN.md`, `docs/CONCEPT_MAP.md`, `docs/GLOSSARY.md`, `docs/MAINTENANCE.md`
- `CONTRIBUTING.md` and `AGENTS.md` (both were linked before and missing)
- Updated `docs/MODULE_TEMPLATE.md` with concept-card, first-success, and pitfall patterns
- Per-module `cheatsheet.md` and runnable `examples/` (playbooks, Compose files, kind YAML, Terraform `local_file`, provisioned Grafana datasource)
- `projects/gitops-k8s-design.md`
- `/metrics` on the capstone app so the ServiceMonitor has something to scrape

### Fixed

- Dead “see `examples/`” / “see the original comprehensive guide” references
- Dockerfile `COPY ../app/` (outside build context) in the CI/CD capstone
- ServiceMonitor selected a Service that had no `app` label and no port named `metrics`

## [2026-06-19]

- Initial project creation and standardization
- Module template in `docs/`
- Docker, Kubernetes, and Terraform module structures
- Capstone projects folder
- GitHub Issue Templates
- README maintenance agenda and official links
