#!/usr/bin/env bash
# Two repos on this disk: a working copy and a bare remote. No network, no GitHub.
# Safe to re-run. Uses /tmp (or $TMPDIR).
set -euo pipefail

root="${TMPDIR:-/tmp}/git-local-remote-lab"
rm -rf "$root"
mkdir -p "$root"
cd "$root"

git init --bare origin.git
git init work
cd work
git config user.email "learner@example.invalid"
git config user.name "Learner"

echo "hello from a local remote" > README.md
git add README.md
git commit -m "Add README"

git remote add origin "$root/origin.git"
git push -u origin HEAD
git fetch origin

echo
echo "SUCCESS: origin is $root/origin.git (a directory, not GitHub)"
git remote -v
git log --oneline --decorate
