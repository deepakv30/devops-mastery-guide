# Ansible Mastery

**Last Major Update:** 2026-06-19 | Focused on fundamentals and enterprise usage

## Introduction & Why It Matters

Ansible is the most popular agentless configuration management and automation tool. It is widely used in enterprises because it is simple, powerful, and integrates well with other DevOps tools.

## Core Concepts

- Control Node vs Managed Nodes
- Inventory (static & dynamic)
- Modules
- Playbooks
- Roles
- Collections
- Ansible Vault

## Installation & Setup

```bash
# On control node (Ubuntu)
sudo apt update
sudo apt install ansible -y
ansible --version
```

Managed nodes only need Python and SSH access.

## Key Features & Best Practices

### Enterprise Best Practices
- Use Roles for reusability
- Store variables in `group_vars/` and `host_vars/`
- Use Ansible Vault for secrets
- Always test with `--check --diff`
- Use tags for selective execution
- Prefer modules over `command` or `shell`

## Hands-on Examples

See the detailed examples in the original comprehensive guide and `examples/` folder.

## Common Pitfalls & Troubleshooting

- SSH connection issues
- Module not found errors
- Idempotency problems
- Variable precedence confusion

## Integration with Other Tools

- **Linux**: Automates Linux server configuration
- **Docker**: Can manage containers and images
- **Kubernetes**: Can deploy applications and manage clusters
- **Terraform**: Complements IaC (Terraform provisions, Ansible configures)
- **CI/CD**: Run playbooks in pipelines

## Exercises

### Basic
1. Write a playbook to install and start Nginx.

### Intermediate
2. Create a reusable role for a LAMP stack.

### Advanced
3. Use dynamic inventory with AWS and deploy an application.

## Official Documentation & Further Reading

- [Ansible Documentation](https://docs.ansible.com/ansible/latest/)
- [Ansible Best Practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)
