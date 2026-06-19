# Terraform Mastery

**Last Major Update:** 2026-06-19 | Tested with Terraform v1.9+

## Introduction & Why It Matters

Terraform enables Infrastructure as Code (IaC). It allows teams to define, provision, and manage infrastructure declaratively, improving consistency, auditability, and collaboration in enterprise environments.

## Core Concepts

- Providers, Resources, Data Sources
- State Management
- Modules
- Workspaces
- Terraform Cloud / Enterprise

## Installation & Setup

```bash
# Using package manager or direct download
brew install terraform   # macOS
# or download from https://developer.hashicorp.com/terraform/downloads
```

## Key Features & Best Practices

- Use remote state (S3, Terraform Cloud, etc.)
- Modularize code using modules
- Use `terraform fmt` and `terraform validate`
- Never commit `.tfstate` files
- Use workspaces for multiple environments

## Hands-on Examples

Basic VPC and EC2 examples are available in the `examples/` folder.

## Common Pitfalls & Troubleshooting

- State file corruption
- Provider version conflicts
- Drift detection issues

## Integration with Other Tools

- Ansible: Terraform provisions infrastructure; Ansible configures it
- Kubernetes: Can provision EKS, GKE, AKS clusters
- CI/CD: Run `terraform plan` and `apply` in pipelines

## Exercises

### Basic
1. Provision a simple VPC and EC2 instance.

### Intermediate
2. Create reusable modules for networking and compute.

### Advanced
3. Implement remote state with locking and use workspaces.

## Official Documentation & Further Reading

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform Best Practices](https://developer.hashicorp.com/terraform/tutorials)
