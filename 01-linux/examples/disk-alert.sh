#!/usr/bin/env bash
# Print ALERT when any real filesystem is over THRESHOLD percent full.
# Usage: ./disk-alert.sh
#        THRESHOLD=0 ./disk-alert.sh   # force an ALERT so you can see the format
set -euo pipefail

THRESHOLD="${THRESHOLD:-80}"

# -P: one line per filesystem so awk can read Use% as column 5.
df -P | awk -v t="$THRESHOLD" 'NR > 1 && $1 ~ /^\// {
  use = $5
  sub(/%/, "", use)
  if (use + 0 > t) {
    printf "ALERT: %s is %s%% full (threshold %s%%)\n", $6, use, t
  }
}'
