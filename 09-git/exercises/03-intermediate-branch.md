# Intermediate — branch, commit, merge

**Band:** Intermediate  
**Setup:** A repo with at least one commit on `main` (or `master`). `/tmp/git-ex1` from the basic exercises is enough.

**Task:** Create a branch `topic`, add `topic.txt` and commit it *on that branch*, switch back to `main`/`master`, confirm `topic.txt` is gone from the working tree, merge `topic`.

**Hint:** `git switch -c topic` then commit, then `git switch main` (or `master` — `git branch` shows the name). Merge while you are on the branch you want to *receive* the work.

**Success:** After the merge, `git log --oneline --decorate` shows `topic.txt`’s commit reachable from `main`/`master`, and `cat topic.txt` works on that branch. `git switch topic` still works; you did not delete the branch.

<details>
<summary>Solution notes</summary>

```bash
cd /tmp/git-ex1
git switch -c topic
echo "from topic" > topic.txt
git add topic.txt
git commit -m "Add topic.txt"
git switch main    # or: git switch master
ls topic.txt       # should fail
git merge topic
cat topic.txt
```

If `git switch main` fails, `git branch` will show `master` instead.

</details>
