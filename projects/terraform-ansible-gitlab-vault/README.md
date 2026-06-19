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
Terraform Plan & Apply → Provision VMs / Infrastructure
      ↓
Vault Authentication (AppRole)
      ↓
Ansible Playbooks → Configure Servers + Deploy Applications
      ↓
Monitoring & Validation
```

## Why This Combination?

| Tool          | Purpose                          | Why Important in Enterprise          |
|---------------|----------------------------------|--------------------------------------|
| Terraform     | Infrastructure Provisioning     | Declarative, version-controlled IaC |
| Ansible       | Configuration Management        | Agentless, idempotent automation    |
| GitLab CI     | CI/CD Automation                | Integrated pipelines + self-hosted runners |
| HashiCorp Vault | Secrets Management            | Dynamic secrets, zero-trust security |

## Project Structure

```
terraform-ansible-gitlab-vault/
├── terraform/              # Infrastructure code
├── ansible/                # Playbooks and roles
├── vault/                  # Vault policies and auth examples
├── .gitlab-ci.yml          # GitLab CI pipeline
└── README.md
```

## Key Components

### 1. Terraform
- Provisions virtual machines or cloud resources
- Outputs inventory for Ansible
- Uses remote state (recommended with S3, Terraform Cloud, or GitLab)

### 2. HashiCorp Vault
- Uses **AppRole** authentication for CI/CD
- Provides dynamic database credentials or SSH keys
- Enforces least-privilege access

### 3. Ansible
- Pulls secrets dynamically from Vault during playbook execution
- Configures servers provisioned by Terraform
- Deploys applications

### 4. GitLab CI
- Runs `terraform plan` / `apply`
- Authenticates to Vault
- Executes Ansible playbooks
- Handles approvals for production environments

## How to Approach This Project

1. Start with Terraform to provision infrastructure
2. Set up Vault with AppRole authentication
3. Create Ansible playbooks that fetch secrets from Vault
4. Build the GitLab CI pipeline that orchestrates everything
5. Add environment protection rules and manual approvals

## Learning Outcomes

By completing this project, you will learn:
- Secure IaC practices with Terraform
- Dynamic secrets management with Vault
- Agentless configuration with Ansible
- Building secure, auditable CI/CD pipelines in GitLab
- Integrating multiple DevOps tools in a real-world workflow

## Stretch Goals

- Use Terraform to provision a Kubernetes cluster
- Implement GitOps with ArgoCD after Ansible configuration
- Add policy-as-code checks (Sentinel or OPA)
- Implement canary deployments
- Add comprehensive monitoring and alerting
