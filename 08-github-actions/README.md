# GitHub Actions CI/CD Mastery

**Last Major Update:** 2026-06-19 | Focused on modern CI/CD pipelines

## Introduction & Why It Matters

GitHub Actions is GitHub's native CI/CD platform. It allows you to automate build, test, and deployment workflows directly from your repository. In enterprise environments, it is widely used due to its tight integration with GitHub, marketplace of actions, and support for self-hosted runners.

## Core Concepts

- Workflows and Jobs
- Steps and Actions
- Triggers (push, pull_request, schedule, etc.)
- Runners (GitHub-hosted vs Self-hosted)
- Secrets and Variables
- Artifacts and Caches
- Environments and Deployment Protection Rules

## Installation & Setup

GitHub Actions is enabled by default on GitHub repositories. No installation is needed.

Basic workflow file location:
`.github/workflows/ci.yml`

## Key Features & Best Practices

### Enterprise Best Practices
- Use **reusable workflows** to avoid duplication
- Store secrets in GitHub Secrets (never hardcode)
- Use **environments** with protection rules for production deployments
- Implement **matrix** strategies for testing across multiple versions
- Cache dependencies aggressively to speed up builds
- Use **OIDC** for secure access to cloud providers (instead of long-lived credentials)
- Follow the principle of least privilege for permissions

## Hands-on Examples

### Example: Basic CI Pipeline

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - run: npm test
```

### Example: Build and Push Docker Image

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    push: true
    tags: ghcr.io/${{ github.repository }}:latest
```

## Common Pitfalls & Troubleshooting

- Workflow not triggering → Check trigger conditions and branch filters
- Secrets not available → Ensure correct environment or repository secrets
- Permission errors → Add `permissions` key at workflow or job level

## Integration with Other Tools

- **Docker**: Build and push container images
- **Kubernetes**: Deploy applications using kubectl or Helm
- **Terraform**: Run IaC in pipelines
- **Prometheus**: Can push custom metrics or trigger deployments based on health

## Exercises

### Basic
1. Create a workflow that runs tests on every push.
2. Add caching for dependencies.

### Intermediate
3. Build and push a Docker image to GitHub Container Registry.
4. Deploy to a Kubernetes cluster using GitHub Actions.

### Advanced
5. Implement a full CI/CD pipeline with staging and production environments.
6. Use OIDC to deploy to AWS/Azure without storing long-lived credentials.

## Official Documentation & Further Reading

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Reusable Workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [Security Best Practices](https://docs.github.com/en/actions/security-guides)
