# Basic 1 — first commit in a throwaway repo

**Band:** Beginner  
**Setup:** A Linux shell. `git --version` works (`sudo apt install -y git` if it does not). Do **not** run this inside the learning-guide clone.

**Task:** Create `/tmp/git-ex1`, `git init`, set local `user.name` and `user.email`, write `notes.txt` with one line, commit it with message `Add notes`.

**Hint:** Same sequence as [first success](../README.md#beginner-first-success). Local config only: `git config user.name`, not `--global`.

**Success:** `git log --oneline` in `/tmp/git-ex1` prints one line whose message is `Add notes`. `git status` says the working tree is clean.

<details>
<summary>Solution notes</summary>

```bash
mkdir -p /tmp/git-ex1 && cd /tmp/git-ex1
git init
git config user.email "learner@example.invalid"
git config user.name "Learner"
echo "lab" > notes.txt
git add notes.txt
git commit -m "Add notes"
git log --oneline
```

</details>
