# Contributing

Edits that make a beginner finish **First success** faster, or that make a Production section more precise, are welcome. New tool modules are not the priority.

## Before you write

1. Read [AGENTS.md](./AGENTS.md) and [docs/MODULE_TEMPLATE.md](./docs/MODULE_TEMPLATE.md).
2. Follow [docs/HOW_TO_LEARN.md](./docs/HOW_TO_LEARN.md) so you do not invert the beginner / Production order.
3. Do not add a folder to [curriculum.json](./curriculum.json) until it contains a working first-success path. `npm run sync` fills the README and How-to-learn tables from that file.
4. To deepen an existing module (human or agent), use the [enhance-module](./.agents/skills/enhance-module/SKILL.md) skill. Work on a branch, not directly on `main`. Grok can run `/workflow enhance-module` with `target` set to the folder name.

## Adding a module

New tool modules are not the priority. When the human names a folder:

1. Create `NN-slug/` from [docs/MODULE_TEMPLATE.md](./docs/MODULE_TEMPLATE.md) (README, cheatsheet, at least two `examples/`, four exercises).
2. Insert one object into `curriculum.json` at the study-order position (`id`, `number`, `title`, `job`, `dir`, `install`, `preflight`). Keep `id`, `number`, and `dir` the same (`NN-slug`). If the module belongs in the middle, renumber later folders. Add a `tools` entry only if first success needs a new binary.
3. Insert a step in the relevant `learning-paths/*.json` file(s). Do not append to every path by default.
4. Hand-write teaching glue: concept-map row if the tool is on the map, glossary if you introduce jargon, neighbor **How this connects**, CHANGELOG, drop it from Planned.
5. Run `npm run sync` then `npm run check`. Do not edit CI, `check-module.sh`, preflight, or `site/build.mjs` to list the new folder.

Do not generate concept cards, glossary text, or Previous/Next sentences from JSON.

## How to send a change

1. Fork and branch from `main`.
2. Keep the change to one concern (one module, or the front door, or one capstone).
3. Re-run any command you touch. Update `Last verified` and `Tested with` on that module.
4. If you add a file under `examples/` or `exercises/`, link it from the module README. Do not write “see `examples/`” unless the file exists.
5. Open a pull request. Use a conventional commit subject if you can (`docs:`, `fix:`, `feat:`).

The learning site is generated. Do not hand-edit `site/dist/` or any `data.js` the build writes. Change markdown, `curriculum.json`, or `learning-paths/`, then `npm run sync` and `npm run build`. See [site/README.md](./site/README.md).

## What we will not merge

- A new module that is only a term list and official-doc links.
- Production-only install as the first command (kubeadm, `kube-prometheus-stack`, Terraform Cloud, Vault) in a beginner band.
- Roadmap items presented as if the content already exists.
- Marketing copy in the root README.

## Issues

Use the issue templates for a broken command, a content update, or a new-module request. A new-module request is a discussion, not a promise.
