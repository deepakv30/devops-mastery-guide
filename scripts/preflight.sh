#!/usr/bin/env bash
# Report which first-success paths can run on this machine.
# Does not install anything. Does not invent command output for labs.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

ok() { printf '  %-12s  ok        %s\n' "$1" "$2"; }
missing() { printf '  %-12s  missing   %s\n' "$1" "$2"; }
warn() { printf '  %-12s  check     %s\n' "$1" "$2"; }

have() { command -v "$1" >/dev/null 2>&1; }

echo "DevOps Mastery Guide — preflight"
echo "Repo: $root"
echo
echo "  Tool          Status     Used by"
echo "  ------------  ---------  --------------------------------"

# Shell: this script is already running.
ok "shell" "01 Linux first success"

if have sudo; then
  if sudo -n true 2>/dev/null; then
    ok "sudo" "01 Linux exercises that create users"
  else
    warn "sudo" "present; may ask a password. 01 Linux first success does not need it"
  fi
else
  missing "sudo" "needed for some Linux exercises, not for first success"
fi

if have docker; then
  if docker info >/dev/null 2>&1; then
    ok "docker" "03 Docker, 04 Kubernetes (kind), 06 Prometheus, 07 Grafana"
  else
    warn "docker" "binary found, daemon not reachable. Start Docker; add your user to group docker"
  fi
else
  missing "docker" "https://docs.docker.com/engine/install/  — 03, 04, 06, 07"
fi

if have kubectl; then
  ok "kubectl" "04 Kubernetes"
else
  missing "kubectl" "https://kubernetes.io/docs/tasks/tools/"
fi

if have kind; then
  ok "kind" "04 Kubernetes first cluster"
else
  missing "kind" "https://kind.sigs.k8s.io/docs/user/quick-start/#installation"
fi

if have terraform; then
  ok "terraform" "05 Terraform"
elif have tofu; then
  ok "tofu" "05 Terraform (OpenTofu is a fine substitute)"
else
  missing "terraform" "https://developer.hashicorp.com/terraform/install or install tofu"
fi

if have ansible-playbook; then
  ok "ansible" "02 Ansible"
else
  missing "ansible" "Debian/Ubuntu: sudo apt install -y ansible"
fi

if have git; then
  ok "git" "09 Git first success; 08 GitHub Actions still needs a GitHub repo you can push to"
else
  missing "git" "Debian/Ubuntu: sudo apt install -y git  — 09 Git first success"
fi

if have python3; then
  ok "python3" "optional; some examples and this preflight's host"
else
  warn "python3" "not required for module first-success paths"
fi

echo
echo "You can start now (tools present for that module's first success):"

can_docker=0
can_k8s=0
can_tf=0
can_ansible=0
can_gha=0

if have docker && docker info >/dev/null 2>&1; then
  can_docker=1
fi
if [[ "$can_docker" -eq 1 ]] && have kubectl && have kind; then
  can_k8s=1
fi
if have terraform || have tofu; then
  can_tf=1
fi
if have ansible-playbook; then
  can_ansible=1
fi
if have git; then
  can_gha=1
fi

echo "  - 01 Linux     ./01-linux/README.md"
if [[ "$can_ansible" -eq 1 ]]; then
  echo "  - 02 Ansible   ./02-ansible/README.md"
fi
if [[ "$can_docker" -eq 1 ]]; then
  echo "  - 03 Docker    ./03-docker/README.md"
  echo "  - 06 Prometheus ./06-prometheus/README.md  (from examples/docker)"
  echo "  - 07 Grafana   ./07-grafana/README.md"
fi
if [[ "$can_k8s" -eq 1 ]]; then
  echo "  - 04 Kubernetes ./04-kubernetes/README.md"
fi
if [[ "$can_tf" -eq 1 ]]; then
  echo "  - 05 Terraform ./05-terraform/README.md"
fi
if [[ "$can_gha" -eq 1 ]]; then
  echo "  - 09 Git      ./09-git/README.md"
  echo "  - 08 GitHub Actions ./08-github-actions/README.md  (needs a GitHub remote)"
fi

echo
echo "Recommended first command after clone:"
echo "  # Linux first success lives in 01-linux/README.md — Beginner: first success"
echo "  # Apps path after that: 09-git → 03-docker → 04-kubernetes → 08-github-actions"
echo
echo "Paths: learning-paths/from-zero.json, apps.json, machines.json, observe.json"
echo "How to study: docs/HOW_TO_LEARN.md"
