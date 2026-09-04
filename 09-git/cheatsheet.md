# Git cheat sheet

One page. Details live in [README.md](./README.md). Work in a throwaway directory, not this learning clone.

## Objects

| Word | What it is |
|---|---|
| Working tree | Files as they sit on disk right now |
| Index (staging) | What the *next* commit will contain |
| Commit | A snapshot: tree + parent + author + message |
| Branch | A movable name pointing at a commit |
| Remote | Another copy of the repo you fetch and push |
| HEAD | The commit you are on (usually the tip of a branch) |

GitHub and GitLab are hosts. They are not Git.

## Daily

| Command | What it answers |
|---|---|
| `git status` | Branch, staged vs unstaged vs untracked |
| `git diff` | Unstaged working-tree changes |
| `git diff --staged` | What is already in the index |
| `git add FILE` | Copy FILE into the index |
| `git commit -m "message"` | Write a new snapshot from the index |
| `git log --oneline --decorate --graph` | History you can read |

Identity for a lab repo (local, not `--global`):

```bash
git config user.email "learner@example.invalid"
git config user.name "Learner"
```

## Branches

| Command | Notes |
|---|---|
| `git branch` | Names; `*` is where HEAD is |
| `git switch -c topic` | Create and move HEAD to `topic` |
| `git switch main` | Move HEAD back (or `master` if that is the name) |
| `git merge topic` | Join `topic` into the current branch |
| `git rebase main` | Replay current branch’s commits on top of `main` — local branches only until you know the cost |

`main` / `master` is a default name, not a special object.

## Remotes

| Command | Notes |
|---|---|
| `git remote -v` | Names and URLs. Empty until you add one |
| `git remote add origin URL` | URL may be a path on disk; see [local-remote.sh](./examples/local-remote.sh) |
| `git push -u origin HEAD` | Publish the current branch |
| `git fetch origin` | Download objects; does not change your files |
| `git pull` | `fetch` plus merge (or rebase if you configured that) |

## Ignore

Copy [examples/gitignore-devops](./examples/gitignore-devops) to `.gitignore`. Patterns hide files from `status` / `add`. They do not remove a file that is already in history.
