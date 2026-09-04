# Production — a secret still in history after you “deleted” it

**Band:** Production  
**Setup:** Throwaway repo `/tmp/git-ex4`. Do not do this in a repo you have pushed, and do not use a real password.

**Task:** Commit a file `.env` containing `PASSWORD=demo`. Add a `.gitignore` that lists `.env`, untrack `.env` with `git rm --cached`, commit that cleanup. Then prove `PASSWORD=demo` is still in git.

**Hint:** [examples/gitignore-devops](../examples/gitignore-devops) already lists `.env`. `git rm --cached .env` untracks it without needing the ignore file first. History is `git log -p` or `git show HEAD~1:.env` after the cleanup commit.

**Success:** The latest commit does *not* contain `.env` in the tree (`git ls-files` has no `.env`). `git show HEAD~1:.env` still prints `PASSWORD=demo`. You can say in one sentence why the fix for a *pushed* secret is to rotate it, not to `git rm`.

<details>
<summary>Solution notes</summary>

```bash
mkdir -p /tmp/git-ex4 && cd /tmp/git-ex4
git init
git config user.email "learner@example.invalid"
git config user.name "Learner"
echo "PASSWORD=demo" > .env
git add .env
git commit -m "Add env"
echo ".env" > .gitignore
git rm --cached .env
git add .gitignore
git commit -m "Stop tracking .env"
git ls-files
git show HEAD~1:.env
```

`.gitignore` only hides untracked files. Blobs already in a commit stay until history is rewritten, and a rewrite does not unsay a push someone else already fetched. Rotate the password.

</details>
