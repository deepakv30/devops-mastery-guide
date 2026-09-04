# Basic 2 — see the diff, then a second snapshot

**Band:** Beginner  
**Setup:** Exercise 1 done in `/tmp/git-ex1`, or repeat first success there.

**Task:** Change `notes.txt`, run `git status` and `git diff` *before* `git add`. Stage, run `git diff --staged`, commit with message `Edit notes`.

**Hint:** `git diff` is the working tree versus the index. After `git add`, that hunk moves to `git diff --staged`.

**Success:** `git log --oneline` shows two commits. The newest message is `Edit notes`. `git show HEAD:notes.txt` prints the new text, not the first line only.

<details>
<summary>Solution notes</summary>

```bash
cd /tmp/git-ex1
echo "second line" >> notes.txt
git status
git diff
git add notes.txt
git diff --staged
git commit -m "Edit notes"
git log --oneline
```

Two hashes. `git show HEAD:notes.txt` includes `second line`.

</details>
