# Capstone projects

End-to-end practice. These combine modules; they are not a substitute for the beginner bands.

Do not start a project until you can do the “Start when you can” checks. Each project README is a walkthrough of the files that exist — not a blank design brief.

| Project | Modules | Time | Start when you can |
|---|---|---|---|
| [Full CI/CD pipeline](./full-cicd-pipeline/README.md) | [Git](../09-git/README.md), [Docker](../03-docker/README.md), [Kubernetes](../04-kubernetes/README.md), [GitHub Actions](../08-github-actions/README.md), [Prometheus](../06-prometheus/README.md) | ~2–4 h | Build an image, apply a Deployment on kind, read a workflow file |
| [Terraform + Ansible + Vault](./terraform-ansible-gitlab-vault/README.md) | [Terraform](../05-terraform/README.md), [Ansible](../02-ansible/README.md) | ~3–5 h (local path ~45 min) | `terraform apply` a local example; run a localhost playbook |

## How to use a capstone

1. Finish the listed modules’ **Beginner** bands (Intermediate helps; Production is optional).
2. Follow the project README from the top. Run the local path before any cloud or CI path.
3. When a step is marked **stub**, treat it as a reading exercise — do not pretend it deployed.

## Not in this folder

A third idea — “production Kubernetes + GitOps” — is a [design-only exercise](./gitops-k8s-design.md). There is no cluster folder for it yet.
