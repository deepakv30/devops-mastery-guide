#!/usr/bin/env bash
# Advisory honesty check for module directories listed in curriculum.json.
# Usage:
#   check-module.sh              # every curriculum module
#   check-module.sh <module-dir> # one dir; must be in curriculum.json
# Example: .agents/skills/enhance-module/scripts/check-module.sh 03-docker
set -euo pipefail

root="$(cd "$(dirname "$0")/../../../.." && pwd)"

curriculum_dirs() {
  python3 - "$root" <<'PY'
import json, sys
from pathlib import Path
root = Path(sys.argv[1])
cur = json.loads((root / "curriculum.json").read_text(encoding="utf-8"))
for m in cur.get("modules") or []:
    d = m.get("dir")
    if not d:
        sys.stderr.write("FAIL: curriculum module missing dir\n")
        sys.exit(1)
    print(d)
PY
}

mapfile -t allowed_dirs < <(curriculum_dirs)
if [[ "${#allowed_dirs[@]}" -eq 0 ]]; then
  echo "FAIL: curriculum.json has no modules" >&2
  exit 1
fi

is_allowed() {
  local want="$1"
  local d
  for d in "${allowed_dirs[@]}"; do
    if [[ "$d" == "$want" ]]; then
      return 0
    fi
  done
  return 1
}

check_one() {
  local mod="$1"
  mod="${mod#./}"
  local dir="$root/$mod"
  local fail=0
  local readme has_beginner has_production

  note() { echo "FAIL: $1"; fail=1; }

  if ! is_allowed "$mod"; then
    echo "FAIL: $mod is not a dir in curriculum.json" >&2
    return 1
  fi

  if [[ ! -d "$dir" ]]; then
    echo "FAIL: not a directory: $mod" >&2
    return 1
  fi

  readme="$dir/README.md"
  if [[ ! -f "$readme" ]]; then
    echo "FAIL: missing $mod/README.md" >&2
    return 1
  fi

  has_beginner=0
  has_production=0
  if grep -qE '^## Beginner' "$readme"; then has_beginner=1; fi
  if grep -qE '^## Production' "$readme"; then has_production=1; fi
  if [[ -f "$dir/beginner.md" ]]; then has_beginner=1; fi
  if [[ -f "$dir/advanced.md" ]]; then has_production=1; fi
  if [[ "$has_beginner" -eq 0 ]]; then note "$mod has no Beginner heading or beginner.md"; fi
  if [[ "$has_production" -eq 0 ]]; then note "$mod has no Production heading or advanced.md"; fi

  if grep -qiE 'see [`'\'']?examples/' "$dir"/*.md 2>/dev/null; then
    if [[ ! -d "$dir/examples" ]] || [[ -z "$(ls -A "$dir/examples" 2>/dev/null)" ]]; then
      note "$mod mentions examples/ but examples/ is missing or empty"
    fi
  fi

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
    return 1
  fi
  echo "check-module: $mod ok"
  return 0
}

if [[ $# -eq 0 ]]; then
  overall=0
  for mod in "${allowed_dirs[@]}"; do
    check_one "$mod" || overall=1
  done
  exit "$overall"
fi

if [[ $# -ne 1 ]]; then
  echo "usage: $0 [module-dir]" >&2
  exit 2
fi

check_one "$1"
