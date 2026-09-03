# How to learn from this guide

This page is the study contract. Each module assumes you follow it.

## The three levels

Every module is split into three bands. Read them in order the first time. After that, skip by heading.

| Band | Heading prefix | Purpose | You should leave able to… |
|---|---|---|---|
| Beginner | **Beginner** | Mental model + one working path | Explain the tool in one sentence and repeat the first success |
| Intermediate | **Intermediate** | Worked examples and comparisons | Choose between two options and say why |
| Advanced / Production | **Production** | Security, scale, real-world constraints | Apply a practice and name the failure it prevents |

Do not start a Production section until you can do the “you should already be able to…” checklist at the top of that section.

## Use every module the same way

1. **Read** the 60-second overview and the mermaid until you can redraw it. Then read the beginner concept cards (*What / Why / How it looks / Common confusion*).
2. **Run** **First success** from the directory the page names. Type the commands; do not treat the block as decoration.
3. **Check** your output against **Expected output**. Small differences (IPs, versions, timestamps) are normal. If it failed, use that note, then the pitfall table.
4. **Keep evidence:** the command, working directory, exit code, and a line of output that proves it worked.
5. **Continue** only when you can explain what each command did. Do the Basic exercises the same day (`exercises/` on Linux, Docker, and Kubernetes; inline Practice on the other modules until those folders exist). Intermediate and Production wait for a second sitting.

A module’s beginner band is sized for about 15–45 minutes of focused work, not a weekend.

Machine check after clone:

```bash
./scripts/preflight.sh
```

It lists which first-success paths will run *now*. It does not install packages and it does not invent lab output.

Path files the site and this page share: [from-zero](../learning-paths/from-zero.json), [apps](../learning-paths/apps.json), [machines](../learning-paths/machines.json), [observe](../learning-paths/observe.json).

## What to install (by module)

You do not need the whole toolchain on day one.

| You are opening… | Have this ready |
|---|---|
| 01 Linux | A Linux shell (Ubuntu 22.04+ or Debian, native / VM / WSL2). `sudo` access. |
| 02 Ansible | Linux shell + `ansible` on the control machine. SSH to a second host is nice; localhost works for first success. |
| 03 Docker | [Docker Engine](https://docs.docker.com/engine/install/) or Docker Desktop. Your user in the `docker` group. |
| 04 Kubernetes | Docker + [kind](https://kind.sigs.k8s.io/) + `kubectl`. Not kubeadm, not a cloud cluster. |
| 05 Terraform | `terraform` binary (or OpenTofu). First success uses the `local` / Docker provider — no cloud account. |
| 06 Prometheus | Docker. Kubernetes Operator comes later. |
| 07 Grafana | Docker. This module has **its own** compose stack (Grafana + Prometheus). Stop module 06’s stack first — both bind host port 9090. |
| 08 GitHub Actions | A GitHub account and a repo you can push to. No self-hosted runner required. |

Python 3, Git, and a text editor are assumed after Linux.

## Lab options

- **Best default:** Ubuntu in a VM or WSL2, 4+ GB RAM, 20+ GB disk.
- **Kubernetes modules:** kind on that same machine. Minikube is fine if you already use it.
- **Cloud free tier:** useful later for Terraform Intermediate, not required to learn the core idea.
- **Do not** start with a production cluster, kubeadm on bare metal, or a company AWS account.

## When to move to the next module

You are ready when you can, without looking at the page:

- Say what the tool is *for* in one sentence.
- Name the two or three objects in its mental model (image vs container, playbook vs inventory, state file vs plan).
- Repeat the first-success commands and explain what each one did.
- Hit the Basic exercises’ success checks.

You do not need every Intermediate example or any Production section before moving on.

## Recommended order

```text
01 Linux
   ├─ 03 Docker ──► 04 Kubernetes ──► 08 GitHub Actions
   │                      │
   └─ 02 Ansible ──► 05 Terraform
                              │
                    06 Prometheus ──► 07 Grafana
                              │
                         capstone projects
```

- Building and running apps: **01 → 03 → 04 → 08**.
- Building and configuring machines: **01 → 02 → 05**.
- Seeing what you shipped: **06 → 07** after something is actually running.
- Capstones: only after the modules listed on [projects/README.md](../projects/README.md).

## If you get stuck

1. Compare your output to the “expected output” block. Small differences (IPs, versions, timestamps) are normal.
2. Check the module’s pitfall table (Symptom | Cause | Fix).
3. Look up the term in the [glossary](./GLOSSARY.md).
4. Read the official “start here” link at the bottom of the module — not a random blog post from the integration section.

## What this guide will not do

- It will not replace official docs for API details.
- It will not provision your company’s cloud.
- It will not pretend a planned topic (GitOps, AWS, service mesh) exists as a module.
