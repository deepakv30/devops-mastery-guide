# GitLab CI/CD cheat sheet

Copy examples into **your** GitLab project as `.gitlab-ci.yml` at the repository root. Files in this module’s `examples/` do not run by themselves.

## File location

```text
.gitlab-ci.yml          # project root, case-sensitive
```

## Skeleton

```yaml
stages:
  - hello

hello-job:
  stage: hello
  image: alpine:3.20
  script:
    - echo "ok"
```

## Stages and jobs

| Key | Meaning |
|---|---|
| `stages:` | Ordered list; jobs in one stage run in parallel |
| `job.stage` | Which stage the job belongs to (default `test`) |
| `job.script` | Shell commands (list) |
| `job.image` | Container image for the job |
| `job.needs` | Start after listed jobs finish (DAG) |
| `job.rules` | When the job is created / runs |
| `job.when` | `on_success` (default), `manual`, `always`, … |
| `job.environment` | Named environment for deploy tracking |

## Artifacts

```yaml
build:
  script:
    - echo "data" > out.txt
  artifacts:
    paths:
      - out.txt
    expire_in: 1 week

test:
  needs: [build]          # or dependencies: [build]
  script:
    - cat out.txt
```

## Rules (preferred over only/except)

```yaml
rules:
  - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  - if: $CI_PIPELINE_SOURCE == "merge_request_event"
  - when: never
```

## Variables

```yaml
variables:
  NODE_VERSION: "20"

script:
  - echo $CI_COMMIT_SHA
  - echo $MY_SECRET          # set in UI, preferably Masked + Protected
```

Predefined: `$CI_COMMIT_SHA`, `$CI_COMMIT_BRANCH`, `$CI_PIPELINE_SOURCE`, `$CI_JOB_NAME`, `$CI_DEFAULT_BRANCH`, …

## Comparison with GitHub Actions

| GitLab | GitHub Actions |
|---|---|
| `.gitlab-ci.yml` | `.github/workflows/*.yml` |
| stages + jobs | jobs + steps |
| `artifacts:` | upload/download-artifact actions |
| CI/CD variables (UI) | Secrets + Variables |
| `needs:` | `needs:` on jobs |
| shared / tagged runners | `runs-on:` |

## This module’s files

| File | Role |
|---|---|
| [examples/first-success.yml](./examples/first-success.yml) | Minimal green pipeline |
| [examples/stages-artifacts.yml](./examples/stages-artifacts.yml) | Stages + artifact hand-off |
| [examples/rules-needs.yml](./examples/rules-needs.yml) | `needs:`, `rules:`, manual deploy + environment |
