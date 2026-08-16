# Definition of done (read after edits)

Walk this list against the module you changed. Use `scripts/check-module.sh` as the mechanical half; this file is the teaching half.

## Page

- [ ] Header table: levels, time, prerequisites, outcomes, last verified, tested with
- [ ] 60-second overview in plain language
- [ ] Mental-model mermaid + one analogy
- [ ] Skip-to table for Beginner / Intermediate / Production
- [ ] Concept cards use What / Why / How it looks / Common confusion (not a term list)
- [ ] First success: goal, time, commands, expected output, “If it failed”
- [ ] Production starts with “You should already be able to”
- [ ] Pitfalls is a table: Symptom | Likely cause | Fix
- [ ] How this connects: previous, next, when *not* to use
- [ ] Practice: 2 basic + 1 intermediate + 1 production, each with setup / task / hint / success
- [ ] Official docs labeled “start here” vs “deep reference”

## Honesty

- [ ] Every relative markdown link resolves
- [ ] No “see `examples/`” unless that folder has the file
- [ ] Root README module table still matches folders that exist
- [ ] `Last verified` bumped only if first success was run

## Bands

- [ ] Beginner install is the laptop path
- [ ] kubeadm / kube-prometheus-stack / AWS / Vault / OIDC / Thanos are not in Beginner
- [ ] No new tool module was created
