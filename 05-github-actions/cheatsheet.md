# GitHub Actions cheat sheet

Copy examples into **your** repo under `.github/workflows/`. Files in this module’s `examples/` do not run by themselves.

## File location

```text
.github/workflows/*.yml
```

## Skeleton

```yaml
name: First success
on: [push, pull_request]
permissions:
  contents: read
jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "ok"
```

## Triggers

```yaml
on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:          # button in the Actions tab
  schedule:
    - cron: "0 7 * * 1"       # 07:00 UTC Mondays
```

`branches:` / `paths:` filters are why a workflow you just pushed does not start.

## Jobs and steps

| Key | Meaning |
|---|---|
| `jobs.<id>.runs-on` | Runner image (`ubuntu-latest`) |
| `jobs.<id>.needs` | Wait for another job |
| `jobs.<id>.environment` | Named environment (secrets + protection) |
| `steps[].uses` | Packaged action, pin a version |
| `steps[].run` | Shell on the runner |
| `strategy.matrix` | Same job, different inputs |

Two jobs do not share a disk. Pass files with artifacts.

## Permissions, secrets, variables

```yaml
permissions:
  contents: read
  packages: write          # only if you push to GHCR

env:
  NODE_VERSION: ${{ vars.NODE_VERSION }}
  TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

Never `echo` a secret. Fork PRs do not receive the base repo’s secrets.

## Cache, artifacts, matrix

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: npm              # needs package-lock.json

- uses: actions/upload-artifact@v4
  with:
    name: report
    path: dist/

strategy:
  matrix:
    node-version: ["20", "22"]
```

## Docker → GHCR

See [examples/docker-publish.yml](./examples/docker-publish.yml).

- `permissions.packages: write`
- Login with `GITHUB_TOKEN`, registry `ghcr.io`
- Tag `ghcr.io/<owner>/<repo>:<sha>` — lowercase, not `latest`

## This module’s files

| File | Role |
|---|---|
| [examples/ci.yml](./examples/ci.yml) | First success — checkout + `echo ok` |
| [examples/node-ci.yml](./examples/node-ci.yml) | Cache + matrix + artifact |
| [examples/docker-publish.yml](./examples/docker-publish.yml) | Build and push to GHCR |
