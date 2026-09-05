#!/usr/bin/env bash
# Report which first-success paths can run on this machine.
# Does not install anything. Does not invent command output for labs.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
exec python3 "$root/scripts/preflight.py"
