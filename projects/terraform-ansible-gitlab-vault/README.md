# Capstone Project 2: Infrastructure as Code + Configuration Management with GitLab CI and HashiCorp Vault

This capstone project demonstrates how to combine **Terraform**, **Ansible**, **GitLab CI**, and **HashiCorp Vault** to build a secure, automated infrastructure provisioning and configuration pipeline.

## Project Goal

Provision infrastructure using Terraform, securely manage secrets with Vault, configure servers with Ansible, and automate the entire process using GitLab CI/CD.

## Architecture Overview

```
GitLab Repository
      ↓
GitLab CI Pipeline
      ↓
Terraform Plan & Apply → Provision VPC + EC2 (with Workspaces)
      ↓
Vault Authentication (AppRole / ID Token)
      ↓
Ansible Playbooks → Configure Servers + Deploy Application
      ↓
Monitoring & Validation
```

## Key Improvements in This Version

- Terraform with **VPC + Security Groups** and **Workspaces** for multiple environments (dev/staging/prod)
- **Vault lookup plugin** integration in Ansible
- Enhanced GitLab CI with caching, artifacts, environment protection, and Vault auth
- Sample application deployment
- Complete Vault setup documentation (AppRole + ID Token)

## Project Structure

```
terraform-ansible-gitlab-vault/
├── terraform/              # Infrastructure code with workspaces
├── ansible/                # Playbooks with Vault integration
├── vault/                  # Policies and setup guides
├── docs/                   # Documentation
├── .gitlab-ci.yml          # Enhanced GitLab CI pipeline
└── README.md
```

## How to Use Workspaces

```bash
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

terraform workspace select dev
terraform apply
```

## Learning Outcomes

By completing this project, you will gain hands-on experience with:

- Multi-environment infrastructure with Terraform workspaces
- Secure secrets management using HashiCorp Vault (AppRole + OIDC)
- Dynamic secret retrieval in Ansible
- Building secure, auditable GitLab CI/CD pipelines
- End-to-end DevOps automation combining IaC and configuration management

## Next Steps / Stretch Goals

- Add ArgoCD for GitOps after server configuration
- Implement policy-as-code (OPA / Sentinel)
- Add comprehensive monitoring with Prometheus
- Create canary deployment strategy
