# Contributing

Edits that make a beginner finish **First success** faster, or that make a Production section more precise, are welcome. New tool modules are not the priority.

## Before you write

1. Read [AGENTS.md](./AGENTS.md) and [docs/MODULE_TEMPLATE.md](./docs/MODULE_TEMPLATE.md).
2. Follow [docs/HOW_TO_LEARN.md](./docs/HOW_TO_LEARN.md) so you do not invert the beginner / Production order.
3. Do not add a folder to the root module table until it contains a working first-success path.

## How to send a change

1. Fork and branch from `main`.
2. Keep the change to one concern (one module, or the front door, or one capstone).
3. Re-run any command you touch. Update `Last verified` and `Tested with` on that module.
4. If you add a file under `examples/` or `exercises/`, link it from the module README. Do not write “see `examples/`” unless the file exists.
5. Open a pull request. Use a conventional commit subject if you can (`docs:`, `fix:`, `feat:`).

## What we will not merge

- A new module that is only a term list and official-doc links.
- Production-only install as the first command (kubeadm, `kube-prometheus-stack`, Terraform Cloud, Vault) in a beginner band.
- Roadmap items presented as if the content already exists.
- Marketing copy in the root README.

## Issues

Use the issue templates for a broken command, a content update, or a new-module request. A new-module request is a discussion, not a promise.
