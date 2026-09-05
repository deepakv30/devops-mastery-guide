# Gotchas (read before editing)

Load this file in step 2 of the skill. These are mistakes this repo has already made.

- **Dead examples.** Writing “see `examples/`” or “see the original comprehensive guide” when the file is missing is the original failure mode. Link a real path or omit the sentence.
- **Production as first install.** kubeadm, Helm `kube-prometheus-stack`, Terraform Cloud, AWS VPC, Vault, and OIDC are not first success. First success is the simplest laptop path (apt/binary, Docker, kind, Terraform `local` provider, Prometheus/Grafana in Compose).
- **Terraform needs a cloud account.** It does not. Beginner is `local_file` under `09-terraform/examples/local-file/`.
- **Root README lies.** The module table is generated from `curriculum.json`. Do not add a row by hand; run `npm run sync`. Planned topics go under “Planned, not written yet.”
- **Term dump.** A bullet list of names (Layers, State, Cardinality) without What / Why / How it looks / Common confusion is not a concept card.
- **Capstone creep.** Enhancing a module is not permission to grow `projects/` into a fake 3-tier product. Leave capstones alone unless the user named one.
- **Empty splits.** Do not create `beginner.md` / `intermediate.md` / `advanced.md` until a single README’s teaching prose is over ~250 lines.
- **Unverified “expected output.”** If you did not run the command, do not invent stdout. Say unverified or omit the block.
- **Voice.** No “enterprise-focused,” “zero to hero,” or decorative emoji. Level words are Beginner / Intermediate / Production.
