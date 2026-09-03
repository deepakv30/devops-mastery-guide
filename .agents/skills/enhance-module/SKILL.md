---
name: enhance-module
description: >
  Deepen or rewrite one existing DevOps Mastery Guide module without
  breaking the beginner to Production contract. Use when the user asks
  to enhance, deepen, rewrite, or improve a module (Linux, Ansible,
  Docker, Kubernetes, Terraform, Prometheus, Grafana, GitHub Actions,
  GitLab), fix a first-success path, or runs /enhance-module.
license: MIT
metadata:
  version: "1.1"
---

# Enhance one existing module

Do this procedure. Do not invent a new template. The contract is [AGENTS.md](../../../AGENTS.md). The page shape is [docs/MODULE_TEMPLATE.md](../../../docs/MODULE_TEMPLATE.md) — open it only if a required section is missing.

## Allowed targets

`01-linux` · `02-ansible` · `03-docker` · `04-kubernetes` · `05-terraform` · `06-prometheus` · `07-grafana` · `08-github-actions` · `09-gitlab`

If the user names a tool that has **no** folder, stop and ask. Do not create a new module.

## Progress

- [ ] Target folder confirmed
- [ ] Gotchas read
- [ ] Current job + first-success path stated
- [ ] Edits stay in band order
- [ ] `scripts/check-module.sh` run
- [ ] Checklist walked

## Steps

1. Resolve the folder from the list above. If ambiguous, ask once.

2. Read [AGENTS.md](../../../AGENTS.md), then [references/gotchas.md](references/gotchas.md).

3. Read `<module>/README.md`. If `beginner.md` / `intermediate.md` / `advanced.md` or `examples/` exist, read those too. Before any edit, write two sentences:
   - The module’s one-line job (from the H1 or header table).
   - The current first-success path (or “missing”).

4. Open [docs/MODULE_TEMPLATE.md](../../../docs/MODULE_TEMPLATE.md) only when a required section is absent (header table, mental model, first success, pitfalls table, practice, official docs).

5. Edit the **smallest** set of files that fixes the request. Preserve heading words **Beginner**, **Intermediate**, **Production**. Keep the simplest laptop install in Beginner. Move kubeadm, `kube-prometheus-stack`, AWS, Vault, OIDC, and Thanos to Production.

6. If you mention a file under `examples/`, it must exist and the mention must be a relative markdown link.

7. From the repo root run:

   ```bash
   .agents/skills/enhance-module/scripts/check-module.sh <module-dir>
   ```

   Fix until it exits 0, or write why a finding is a false positive.

8. Read [references/checklist.md](references/checklist.md) and walk every item. Set `Last verified` only if you actually ran the first-success commands; otherwise leave the date and say unverified.

Do not commit or push unless the user asked. Do not edit the root module table to advertise folders you did not create.
