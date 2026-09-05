# Maintenance

This repository is a learning guide, not a vendor doc mirror. Keep it accurate, small, and honest.

## Update philosophy

- **Official docs first.** Link the vendor’s current page. Do not paste large excerpts that will rot.
- **Versions on the page.** Every module header has `Last verified` and `Tested with`. Bump those when you re-run the first-success path.
- **Honesty over completeness.** If a folder does not exist, do not list it in the root module table. Planned topics live under “Planned, not written yet” on the root README.
- **Enterprise patterns stay in Production.** Do not put Operator/HA/OIDC/kubeadm in the beginner band because a blog called it “the real way.”
- **Quality over new tools.** Prefer fixing an existing first-success path over adding another module.

## What to do when a tool changes

1. Re-run the module’s first-success commands on the new version.
2. Update commands, expected output, and `Tested with`.
3. If a flag or resource was removed, add one line to the module’s Production or Pitfalls section (“what changed, what to use instead”).
4. Note the change in `CHANGELOG.md`.

## Review cadence

- After a major upstream release of Docker, Kubernetes, Terraform, Ansible, Prometheus, Grafana, or GitHub Actions.
- When a reader opens an issue that a command or link is wrong.
- When adding a module: follow [MODULE_TEMPLATE.md](./MODULE_TEMPLATE.md) and [AGENTS.md](../AGENTS.md). Register it in `curriculum.json` and the path JSON; run `npm run sync`. Do not maintain a second module list in CI or `site/build.mjs`.
- When an agent deepens a module: it must follow [enhance-module](../.agents/skills/enhance-module/SKILL.md). Grok’s [enhance-module workflow](../.grok/workflows/enhance-module.rhai) runs that skill and then a reviewer. Treat the reviewer’s regression list as required reading; this is not a CI gate.
- When module markdown changes, rebuild the learning site (`npm run build`) so GitHub and the reader stay the same files. The site must not grow teaching text of its own.

## What does *not* belong in the root README

Product language, AI-agent instructions, long maintenance essays, and contributor process. Those live here, in `CONTRIBUTING.md`, and in `AGENTS.md`. The root README is a learner front door.
