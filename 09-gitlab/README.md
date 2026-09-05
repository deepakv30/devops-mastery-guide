# GitLab CI/CD — Run build, test, and deploy steps from a YAML pipeline in the repo

| | |
|---|---|
| Levels | Beginner → Intermediate → Production |
| Time | Beginner ~25 min · full module ~3h |
| Prerequisites | Git + a GitLab project you can push to (GitLab.com free tier works); [GitHub Actions](../08-github-actions/README.md) is useful for comparison |
| You will be able to | (1) explain pipeline vs stage vs job vs runner (2) add a `.gitlab-ci.yml` that runs on push and see a green pipeline (3) say why CI/CD variables do not belong in the YAML |

**Last verified:** 2026-08-22 · **Tested with:** GitLab CI (shared runners on GitLab.com, YAML syntax current as of docs.gitlab.com/ci)

There is nothing to install on your laptop for the first success. The pipeline runs on a GitLab runner after you push. A file that only lives in this learning repo does not run.

## 60-second overview

GitLab CI/CD is the pipeline engine that lives in the repository. You commit a YAML file named `.gitlab-ci.yml` at the project root. On a git event (push, merge request, schedule) GitLab starts a pipeline, schedules jobs onto runners, and records the result on the commit and MR.

Use it to test, build an image, and deploy. Do not use it as a general-purpose always-on computer.

Jargon: [glossary](../docs/GLOSSARY.md). How to study: [How to learn](../docs/HOW_TO_LEARN.md). Capstone that already uses GitLab CI: [Terraform + Ansible + Vault](../projects/terraform-ansible-gitlab-vault/README.md).

## Mental model

A **pipeline** is a recipe GitLab cooks on one or more **runners** whenever something happens to the repo. Jobs are grouped into **stages** that run in order; jobs inside one stage can run in parallel.

```mermaid
flowchart LR
  Event --> Pipeline --> Stage --> Job
  Job --> Runner
```

The event starts the pipeline. Stages run sequentially. Jobs in the same stage share no disk by default unless you pass **artifacts**. Compare this shape with [GitHub Actions](../08-github-actions/README.md) (workflow → job → step).

## Skip to

| Band | What you get | Go |
|---|---|---|
| Beginner | Concepts + first success (copy, push, green pipeline) | [below](#beginner-core-concepts) |
| Intermediate | Stages, artifacts, rules, needs, Docker image | [below](#intermediate-go-deeper) |
| Production | Variables, protected environments, runners, includes, security | [below](#production) |

## Beginner: core concepts

### Pipeline file location

- **What it is:** A YAML file named `.gitlab-ci.yml` (case-sensitive) at the root of the GitLab project. GitLab reads it on every relevant event.
- **Why it exists:** The recipe lives next to the code. Reviewers see it in the same merge request.
- **How it looks:** Root `.gitlab-ci.yml`. The copy in this repo is [examples/first-success.yml](./examples/first-success.yml).
- **Common confusion:** Files under `examples/` here do not run. Copy the content into *your* GitLab.com (or self-managed) project as `.gitlab-ci.yml`.

### Stages and jobs

- **What it is:** A **stage** is an ordered group. A **job** is a named unit that runs a `script:` (or `run:` with steps in newer syntax). Jobs in one stage run in parallel when runners are available; the next stage waits for the previous to succeed.
- **Why it exists:** Build before test before deploy is the usual order. Parallel jobs inside a stage cut wall-clock time.
- **How it looks:** `stages: [build, test]` then `job-name: stage: build`.
- **Common confusion:** If you omit `stages:`, GitLab uses defaults (`.pre`, `build`, `test`, `deploy`, `.post`). A job without an explicit `stage:` goes into `test`.

### Runners

- **What it is:** The machine (or container) that executes the job. **Shared runners** on GitLab.com are provided for free-tier projects. **Self-managed / project / group runners** are machines you register.
- **Why it exists:** Something has to execute `echo` or `npm test`. Beginner uses shared runners.
- **How it looks:** No `tags:` needed for the default shared runner. You can pin `image: alpine` or `image: node:20`.
- **Common confusion:** The runner is not your laptop. `localhost` inside a job is the runner. Secrets you only have locally are not present unless you set CI/CD variables.

### Script vs image

- **What it is:** `script:` is the list of shell commands (bash by default). `image:` chooses the container the job runs inside (Docker executor).
- **Why it exists:** Most jobs need a specific runtime (Node, Python, Terraform). Shared runners support `image:`.
- **How it looks:** `image: alpine:3.20` then `script: - echo ok`.
- **Common confusion:** Without an `image:`, the runner’s default image is used (often a recent Ubuntu). Prefer an explicit small image for reproducibility.

### Predefined variables

- **What it is:** GitLab injects variables such as `$CI_COMMIT_SHA`, `$CI_COMMIT_BRANCH`, `$CI_PIPELINE_SOURCE`, `$CI_JOB_NAME`.
- **Why it exists:** Jobs need to know which commit, branch, or MR they are running for without hard-coding.
- **How it looks:** `echo "Branch is $CI_COMMIT_BRANCH"`.
- **Common confusion:** These are not secrets. Do not put passwords in them; use protected CI/CD variables or the secrets keyword for sensitive data.

## Beginner: first success

**Goal:** Push a `.gitlab-ci.yml` to *your* GitLab project and see a green pipeline whose job log contains `ok`.  
**Time:** ~15 minutes if you already have a project (or create one on GitLab.com).

1. Create or open a project on GitLab.com (public or private; CI/CD must be enabled — it is by default for most projects).
2. Copy the content of [examples/first-success.yml](./examples/first-success.yml) into a new file at the project root named exactly `.gitlab-ci.yml`.
3. Commit and push to the default branch (or open a merge request — both trigger pipelines by default).
4. Open the project → **Build → Pipelines** (or the pipeline badge on the commit / MR) and open the run.

```yaml
stages:
  - hello

hello-job:
  stage: hello
  image: alpine:3.20
  script:
    - echo "ok"
    - uname -a
    - echo "Branch is $CI_COMMIT_BRANCH"
```

**Expected output:** a green pipeline. The `hello-job` log contains a line `ok`, a `uname` line (Linux kernel string from the runner), and the branch name. Exact kernel text will differ.

**If it failed:**

- No pipeline appears → CI/CD may be disabled under **Settings → CI/CD**, or the file is not named `.gitlab-ci.yml` at the root, or you only saved it locally.
- YAML error → indentation. Spaces, not tabs. Copy the file; do not retype from memory.
- Stuck pending → no shared runners available (rare on GitLab.com) or the project has no runners and no shared runners enabled. Check **Settings → CI/CD → Runners**.
- Job fails on `image:` → the runner cannot pull the image (network or auth). Try without `image:` or use a public image that is already cached.

## Intermediate: go deeper

Worked files: [examples/stages-artifacts.yml](./examples/stages-artifacts.yml), [examples/rules-needs.yml](./examples/rules-needs.yml).

### Stages and artifacts

Jobs in later stages do not automatically see files from earlier jobs. Pass files with **artifacts** (paths that GitLab stores and can download into a later job).

[examples/stages-artifacts.yml](./examples/stages-artifacts.yml) builds a tiny file in `build`, then a `test` job that depends on it and prints the content.

### Rules (when a job runs)

`rules:` replace the older `only:` / `except:`. A job can run only on the default branch, only on merge requests, only when certain files change, or never under some conditions.

```yaml
rules:
  - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

See [examples/rules-needs.yml](./examples/rules-needs.yml).

### Needs (DAG instead of pure stages)

`needs:` lets a job start as soon as its dependencies finish, even if other jobs in the same stage are still running. This shortens pipelines that have long and short jobs mixed together.

### Image and services

`image:` sets the job container. `services:` starts sidecar containers (for example a database) that the job can reach by hostname. Keep first examples simple; add services when a real test needs Postgres or Redis.

### Comparison with GitHub Actions

| Concept | GitLab CI | GitHub Actions |
|---|---|---|
| Top-level file | `.gitlab-ci.yml` at repo root | `.github/workflows/*.yml` |
| Grouping | `stages:` then jobs | `jobs:` then steps |
| Parallelism inside group | jobs in same stage | steps in one job (or matrix) |
| Pass files | `artifacts:` + `dependencies:` / `needs:` | `actions/upload-artifact` + `download-artifact` |
| Secrets / config | CI/CD variables (UI or YAML) | Secrets + Variables |
| Runner choice | `tags:`, shared or self-managed | `runs-on:` |

Both are “YAML in the repo + disposable runners”. The dialect and the UI differ; the ideas transfer.

## Production

**You should already be able to:** see one green pipeline; name pipeline, stage, job, and runner; know that `examples/` in this repo does not execute.

### CI/CD variables and protected variables

Variables are set in the GitLab UI (**Settings → CI/CD → Variables**) or in the YAML (`variables:`). Mark sensitive ones as **Masked** and **Protected** so they only appear on protected branches/tags. Never commit a password as a literal in `.gitlab-ci.yml`.

```yaml
variables:
  NODE_VERSION: "20"

script:
  - echo "Token is $DEPLOY_TOKEN"   # $DEPLOY_TOKEN comes from a masked variable
```

### Environments and deployments

An **environment** (`staging`, `production`) tracks deployments and can hold environment-scoped variables and protection rules (required approvals, allowed agents). Set `environment: name: production` on a deploy job. Use `when: manual` for production applies that need a human click.

### Runners: shared vs self-managed

Shared runners are fine for open-source and many private projects. For private code that must not leave your network, or for special hardware, register a self-managed runner with a tag and use `tags: [my-runner]` on the job. Lock down the runner’s privileges (least privilege, no privileged Docker unless required).

### `include:` and CI/CD components

Large monorepos split config with `include: local:`, `include: project:`, or the newer CI/CD Catalog components. Prefer small, reviewable includes over a 2000-line single file. Pin versions of included templates when possible.

### Security hygiene

- Prefer `rules:` over `only`/`except`.
- Pin container images to digests or immutable tags when the job is security-sensitive.
- Use least-privilege tokens; prefer short-lived OIDC / JWT where the target supports it (Vault, cloud providers).
- Review the job log for leaked variables; masking is best-effort.
- For merge-request pipelines from forks, remember that secrets are usually not available to the fork’s pipeline (similar to GitHub Actions fork PR behaviour).

The capstone [Terraform + Ansible + Vault](../projects/terraform-ansible-gitlab-vault/README.md) shows a multi-stage pipeline with manual apply and a configure job; treat that `.gitlab-ci.yml` as a reading exercise until you have real Terraform state and Vault.

## Pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| Pipeline never starts | File not named `.gitlab-ci.yml` at root, or CI/CD disabled | Check path and **Settings → CI/CD**. |
| Job stuck in pending | No runners available / shared runners disabled for the project | Enable shared runners or register a project runner. |
| Later stage cannot see files | Missing `artifacts:` or wrong `dependencies:` / `needs:` | Declare `artifacts: paths:` on the producer; declare `needs:` or `dependencies:` on the consumer. |
| Variable is empty | Variable is protected and the branch is not, or it is environment-scoped to a different environment | Make the variable unprotected for testing, or protect the branch / match the environment name. |
| YAML parse error | Tabs, wrong indentation, or mixing `only` with `rules` on the same job | Use spaces; prefer pure `rules:`. |
| Pipeline runs twice on MR | Both branch pipeline and MR pipeline fire | Add `workflow:rules` to control when a pipeline is created (see official docs). |

## How this connects

- **Previous:** [GitHub Actions](../08-github-actions/README.md) — same CI ideas, different YAML and UI. Read both; the comparison table above is the map.
- **Next:** [Prometheus](../06-prometheus/README.md) / observability once you ship, or the [Terraform + Ansible + Vault capstone](../projects/terraform-ansible-gitlab-vault/README.md) which already contains a real `.gitlab-ci.yml`.
- **When not to use this:** A 10-second local test does not need a pipeline yet. Do not use GitLab runners as permanent production compute (long-running servers belong on VMs or Kubernetes).

## Practice

### Basic

1. **Setup:** A GitLab project you can push to (GitLab.com is fine).  
   **Task:** Copy [examples/first-success.yml](./examples/first-success.yml) to `.gitlab-ci.yml` at the root, push, open **Build → Pipelines**.  
   **Hint:** If nothing appears, confirm the filename and that CI/CD is enabled.  
   **Success:** A green pipeline whose job log contains `ok`.

2. **Setup:** The first-success pipeline is green.  
   **Task:** Change the `echo` string, push again, confirm a new pipeline.  
   **Hint:** Every push that matches the rules starts a new pipeline. Old runs stay in history.  
   **Success:** The new log shows your new string.

### Intermediate

3. **Setup:** The first-success pipeline is green.  
   **Task:** Replace the content with [examples/stages-artifacts.yml](./examples/stages-artifacts.yml). Confirm the `test` job prints the file created by `build`.  
   **Hint:** Artifacts are downloaded into the job workspace; the path is relative.  
   **Success:** `test` job log shows the content of the artifact file.

### Production

4. **Setup:** You have a green pipeline.  
   **Task:** Add a masked CI/CD variable in the project UI (any name). Reference it in a job with `echo "length ${#MY_VAR}"` (do not print the value). Confirm the job still passes and the value is masked if it appears. Write one sentence on why production deploy jobs often use `when: manual` plus an environment.  
   **Hint:** Masking hides the value in logs; protection limits which branches see it. Manual + environment gives a human gate.  
   **Success:** Job green; your sentence names “human approval / protected environment before production change.”

<details>
<summary>Solution sketches</summary>

1. Path must be exactly `.gitlab-ci.yml` at the repository root that GitLab hosts.
2. Edit the `script:` list, commit, push; open the newest pipeline, not the first one.
3. `build` writes a file under a path listed in `artifacts: paths:`; `test` lists or cats that path after GitLab restores the artifact.
4. Create the variable under **Settings → CI/CD → Variables**, mark Masked. Manual jobs and environments stop an automatic push from reaching production without review.

</details>

## Cheat sheet

[cheatsheet.md](./cheatsheet.md) — file location, stages/jobs, artifacts, rules, variables, needs, comparison with GitHub Actions.

## Official documentation

- [Start here: Get started with GitLab CI/CD](https://docs.gitlab.com/ci/) — pipeline, stages, jobs, runners
- [Start here: Create and run your first pipeline](https://docs.gitlab.com/ci/quick_start/) — the shortest path to a green run
- [Deep reference: CI/CD YAML syntax](https://docs.gitlab.com/ci/yaml/) — every keyword
- [Deep reference: CI/CD variables](https://docs.gitlab.com/ci/variables/) — predefined and custom variables
- [Pipeline architecture](https://docs.gitlab.com/ci/pipelines/pipeline_architectures/) — basic vs needs / DAG
- [Use CI/CD to build a Docker image](https://docs.gitlab.com/ci/docker/using_docker_build/) — when you are ready to push images
