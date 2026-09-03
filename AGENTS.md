# Agent and editor rules

Read this before changing any learning page. Humans and AI tools follow the same rules.

## When enhancing a module

If the task is to deepen, rewrite, or improve an **existing** module, follow [`.agents/skills/enhance-module/SKILL.md`](./.agents/skills/enhance-module/SKILL.md) before you edit. Do not create a new module unless the human named the folder and asked for it.

Page shape: [docs/MODULE_TEMPLATE.md](./docs/MODULE_TEMPLATE.md). How learners use the repo: [docs/HOW_TO_LEARN.md](./docs/HOW_TO_LEARN.md).

## Purpose

This repo teaches DevOps tools from beginner to production. The failure mode to avoid is a **term dump**: names, slogan-like “enterprise best practices,” and `see examples/` links to folders that do not exist.

## Honesty

- Only mention files, folders, modules, and exercises that exist in the tree.
- Planned topics go under “Planned, not written yet” on the root README, never in the module table.
- If you cannot run a command, do not invent expected output. Mark it as unverified or omit it.
- Capstone deploy steps that are stubs must say they are stubs.

## Module shape

Follow [docs/MODULE_TEMPLATE.md](./docs/MODULE_TEMPLATE.md) in this order:

1. Header table (levels, time, prerequisites, outcomes, last verified, tested with)
2. 60-second overview
3. Mental model (one mermaid diagram + one analogy)
4. Skip-to table
5. Beginner concept cards (What / Why / How it looks / Common confusion)
6. First success (commands + expected output + “If it failed”)
7. Intermediate worked examples on disk
8. Production (never the first install)
9. Pitfalls as a table: Symptom | Likely cause | Fix
10. How this connects (previous, next, when *not* to use)
11. Practice: setup, task, hint, success check; optional `<details>` solution
12. Cheat sheet or link to `cheatsheet.md`
13. Official docs, labeled “start here” vs “deep reference”

Split into `beginner.md` / `intermediate.md` / `advanced.md` only when the teaching prose in one file would exceed ~250 lines. Do not create empty split files.

## Writing voice

- Direct and concrete. No “enterprise-focused & maintained,” no “zero to hero,” no emoji decoration.
- Define jargon on first use, or link [docs/GLOSSARY.md](./docs/GLOSSARY.md).
- Concept before command. Practice before slogan.
- Level prefixes are the words **Beginner**, **Intermediate**, **Production** — not badge images.

## Install rule

The first install is the simplest path that works on a laptop: apt/binary, Docker Engine, kind, Terraform `local`/Docker provider, Prometheus in Docker, Grafana in Docker.

These belong in **Production** only: kubeadm, Helm `kube-prometheus-stack` as the first Grafana/Prometheus install, Terraform Cloud, OIDC, Vault, Thanos, CIS hardening, OPA/Gatekeeper.

## Examples and exercises

- `examples/` holds runnable files referenced with a relative link.
- Every module needs at least two worked examples on disk after a rewrite.
- Exercises live under `exercises/` (or inline if short) with setup, task, hint, and success check.
- Three difficulties, matching the three bands. An advanced exercise is not “do CIS benchmarks” with no steps.

## Front door

The root README is a learner index. Maintenance philosophy, AI process, and contributor rules do not go there. See [docs/MAINTENANCE.md](./docs/MAINTENANCE.md) and [CONTRIBUTING.md](./CONTRIBUTING.md).

## Site is a view

`site/` renders existing markdown. Do not add teaching text that exists only in HTML. Path order lives in [learning-paths/](./learning-paths/). Module metadata lives in [curriculum.json](./curriculum.json). If the site and GitHub disagree, GitHub markdown wins.

## Do not

- Reintroduce the old template order (best practices immediately after install).
- Add Git, AWS, Argo CD, or DevSecOps as modules in a drive-by edit.
- Expand capstone apps into real 3-tier products. Teach the path through the files that exist.
- Leave “see the original comprehensive guide” or “see `examples/`” with no files.
