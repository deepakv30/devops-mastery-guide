#!/usr/bin/env bash
# Advisory honesty check for one module directory.
# Usage: check-module.sh <module-dir>
# Example: .agents/skills/enhance-module/scripts/check-module.sh 03-docker
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <module-dir>" >&2
  exit 2
fi

root="$(cd "$(dirname "$0")/../../../.." && pwd)"
mod="$1"
mod="${mod#./}"
dir="$root/$mod"

if [[ ! -d "$dir" ]]; then
  echo "FAIL: not a directory: $mod" >&2
  exit 1
fi

allowed='^(01-linux|02-ansible|03-docker|04-kubernetes|05-terraform|06-prometheus|07-grafana|08-github-actions|09-git)$'
if [[ ! "$mod" =~ $allowed ]]; then
  echo "FAIL: $mod is not an allowed module folder" >&2
  exit 1
fi

fail=0
note() { echo "FAIL: $1"; fail=1; }

readme="$dir/README.md"
if [[ ! -f "$readme" ]]; then
  note "missing $mod/README.md"
  exit 1
fi

# Bands: either headings in README or split files.
has_beginner=0
has_production=0
if grep -qE '^## Beginner' "$readme"; then has_beginner=1; fi
if grep -qE '^## Production' "$readme"; then has_production=1; fi
if [[ -f "$dir/beginner.md" ]]; then has_beginner=1; fi
if [[ -f "$dir/advanced.md" ]]; then has_production=1; fi
if [[ "$has_beginner" -eq 0 ]]; then note "$mod has no Beginner heading or beginner.md"; fi
if [[ "$has_production" -eq 0 ]]; then note "$mod has no Production heading or advanced.md"; fi

# "see examples/" without an examples directory (or empty).
if grep -qiE 'see [`'\'']?examples/' "$dir"/*.md 2>/dev/null; then
  if [[ ! -d "$dir/examples" ]] || [[ -z "$(ls -A "$dir/examples" 2>/dev/null)" ]]; then
    note "$mod mentions examples/ but examples/ is missing or empty"
  fi
fi

# Relative markdown links in this module's markdown files.
while IFS= read -r -d '' md; do
  python3 - "$md" "$dir" <<'PY' || fail=1
import re, sys
from pathlib import Path
md = Path(sys.argv[1])
mod_dir = Path(sys.argv[2])
text = md.read_text(encoding="utf-8", errors="replace")
link_re = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
bad = []
for m in link_re.finditer(text):
    url = m.group(2).split()[0].strip("<>")
    if url.startswith(("http://", "https://", "mailto:", "#")):
        continue
    path_part = url.split("#", 1)[0]
    if not path_part:
        continue
    target = (md.parent / path_part).resolve()
    if not target.exists():
        bad.append(url)
if bad:
    rel = md
    try:
        rel = md.relative_to(mod_dir.parent)
    except ValueError:
        pass
    for u in bad:
        print(f"FAIL: broken link in {rel}: {u}")
    sys.exit(1)
PY
done < <(find "$dir" -name '*.md' -print0)

if [[ "$fail" -ne 0 ]]; then
  echo "check-module: $mod has problems" >&2
  exit 1
fi
echo "check-module: $mod ok"
