# Roadmap

What is in this repository versus what is only planned. The [module table](./README.md#modules) lists folders that exist. This page is the status board.

## Written and in the tree

| Item | Status | Notes |
|---|---|---|
| 01 Linux | Complete | Beginner → Production in `01-linux/README.md` |
| 02 Ansible | Complete | Beginner → Production in `02-ansible/README.md` |
| 03 Docker | Complete | Beginner → Production in `03-docker/README.md` |
| 04 Kubernetes | Complete | Split: `beginner.md` / `intermediate.md` / `advanced.md` |
| 05 Terraform | Complete | First success uses the `local` provider |
| 06 Prometheus | Complete | First success is Docker Compose, not Helm |
| 07 Grafana | Complete | Same Docker stack as Prometheus |
| 08 GitHub Actions | Complete | Workflows are examples; they run after you push to *your* repo |
| 09 Git | Complete | First success is local `git init`; no GitHub account |
| Capstone: full CI/CD | Complete (local) | GitHub Actions deploy step is a **stub** |
| Capstone: Terraform + Ansible + Vault | Complete (local) | Vault and GitLab CI are optional later steps |
| Learning paths | Complete | `learning-paths/*.json` — from-zero, apps, machines, observe |
| Learning site | In progress | Built from the same markdown; see `site/README.md` |

Complete means the teaching contract in [docs/MODULE_TEMPLATE.md](./docs/MODULE_TEMPLATE.md) is present, not that every production topic for that tool exists.

## Planned, not written yet

These appear in many DevOps job descriptions. They are **not** modules. Do not link them from the module table.

- Bash/Python scripting and networking as standalone courses
- GitOps (Argo CD / Flux)
- Cloud-provider DevOps (AWS / Azure / GCP)
- DevSecOps, service mesh, platform engineering

When a folder exists, it moves into the table above and into the root README module table.

## Site and tutor (product, not curriculum)

| Item | Status |
|---|---|
| Static learning site (home, module reader, glossary, progress) | This change |
| App-path `exercises/` and `quiz.json` (Linux, Git, Docker, Kubernetes) | This change |
| Remaining-module exercises and quizzes | Not written yet |
| Command palette, placement quiz | Not written yet |
| Learner agent skills (`start-learning`, `learn`, `course-guide`) | Not written yet |
