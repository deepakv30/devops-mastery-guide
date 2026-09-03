# Basic 1 — create a login user without sudo

**Band:** Beginner  
**Setup:** A shell where you have sudo.

**Task:** Create user `learner` with a home directory and a login shell. Do **not** add them to `sudo`.

**Hint:** `useradd -m -s /bin/bash`. Contrast with [create-sudo-user.sh](../examples/create-sudo-user.sh), which *does* add sudo.

**Success:** `id learner` prints a uid; `ls -ld /home/learner` exists; `groups learner` does not list `sudo`.

<details>
<summary>Solution notes</summary>

`sudo useradd -m -s /bin/bash learner` then `id learner` and `groups learner`. To undo: `sudo userdel -r learner`.

</details>
