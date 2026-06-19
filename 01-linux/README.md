# Linux Mastery

**Last Major Update:** 2026-06-19 | Focused on modern Linux administration for DevOps

## Introduction & Why It Matters

Linux is the foundation of almost all modern infrastructure, cloud environments, containers, and DevOps tooling. A strong command of Linux is essential for debugging, automation, security, and operating production systems.

## Core Concepts

### Essential Areas
- Users, Groups & Permissions (chmod, chown, ACLs, sudo)
- Process Management (ps, top, htop, kill, nice, systemd)
- Package Management (apt, dnf, yum)
- Filesystem & Storage
- Networking Tools (`ip`, `ss`, `netstat`, `nftables`, `firewalld`)
- Systemd & Service Management
- Logging & Journalctl
- Performance Basics

## Installation & Setup

Most cloud instances and local labs come with Linux pre-installed (Ubuntu, Rocky Linux, Debian, etc.).

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git vim htop tree
```

## Key Features & Best Practices

### Enterprise Best Practices
- Use `systemd` for service management
- Prefer declarative configuration where possible
- Use `journalctl` for centralized logging
- Implement proper user management and least privilege
- Automate with Ansible instead of manual changes

### Security
- Disable root login via SSH
- Use key-based authentication
- Regularly update packages
- Use `ufw` or `firewalld` properly

## Hands-on Examples

### Example: Create a non-root user with sudo access

```bash
sudo useradd -m -s /bin/bash devops
sudo usermod -aG sudo devops
sudo passwd devops
```

### Example: Check listening ports

```bash
ss -tuln
sudo netstat -tuln
```

## Common Pitfalls & Troubleshooting

- Permission denied errors → Check ownership and permissions
- Service not starting → Check `journalctl -u service-name`
- Disk full → Use `df -h` and `du -sh *`

## Integration with Other Tools

- **Ansible**: Primary way to automate Linux configuration at scale
- **Docker**: Runs on Linux
- **Kubernetes**: Control plane and worker nodes run on Linux
- **Terraform**: Can provision Linux VMs

## Exercises

### Basic
1. Create a new user with limited sudo privileges.
2. Find all running processes owned by a specific user.

### Intermediate
3. Write a simple bash script to monitor disk usage and send an alert.
4. Configure a basic firewall using `ufw` or `firewalld`.

### Advanced
5. Harden a fresh Linux server following CIS benchmarks basics.

## Official Documentation & Further Reading

- [The Linux Documentation Project](https://tldp.org/)
- [Linux man pages](https://man7.org/linux/man-pages/)
- [systemd Documentation](https://www.freedesktop.org/wiki/Software/systemd/)
