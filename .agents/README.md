# Agent Skills (project)

This folder is the [Agent Skills](https://agentskills.io/home) install for this repository. A skill is a subdirectory of `skills/` that contains a `SKILL.md`. Agents load **name + description** at startup, the full `SKILL.md` only when the task matches, and `references/` / `scripts/` only when that file tells them to.

Always-on rules (the teaching contract) live in [`AGENTS.md`](../AGENTS.md), not here. Tools that never scan skills still see that file.

## Skills in this repo

| Skill | When to use |
|---|---|
| [enhance-module](./skills/enhance-module/SKILL.md) | Deepen or rewrite **one existing** module without breaking Beginner → Production |

## Who discovers this folder

| Client | Auto-loads `.agents/skills/` | Also reads `AGENTS.md` |
|---|---|---|
| Grok | Yes | Yes |
| VS Code / GitHub Copilot | Yes (default project path) | If present |
| Other Agent Skills clients | Usually yes — [`.agents/skills/` is the cross-client path](https://agentskills.io/client-implementation/adding-skills-support) | Varies |

There is no `.cursor/` or `.claude/` copy. Do not add one unless a client you use cannot see `.agents/skills/`.

Grok can also run [`.grok/workflows/enhance-module.rhai`](../.grok/workflows/enhance-module.rhai) (`/workflow enhance-module` with `target` set to a folder such as `03-docker`). That workflow follows this skill, then a reviewer. Project workflows need folder trust (`/hooks-trust`). Other clients ignore `.grok/workflows/` and should just follow the skill.

## Validate a skill

If you have [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref):

```bash
skills-ref validate .agents/skills/enhance-module
```
