# Intermediate — force a disk alert

**Band:** Intermediate  
**Setup:** [examples/disk-alert.sh](../examples/disk-alert.sh) in this module.

**Task:** Run it so you see an `ALERT` line, then run it with the default threshold.

**Hint:** `THRESHOLD=0` makes every real filesystem “over.” Read the `awk` in the script.

**Success:** Forced run prints `ALERT: … is N% full (threshold 0%)`. Default run exits 0 and prints nothing unless a mount is actually over 80%.

<details>
<summary>Solution notes</summary>

From `01-linux/`: `chmod +x examples/disk-alert.sh && THRESHOLD=0 ./examples/disk-alert.sh`.

</details>
