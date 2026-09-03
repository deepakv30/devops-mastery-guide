# Production — four notes and a read-only run

**Band:** Production  
**Setup:** Your image from exercise 2, or [examples/multi-stage.Dockerfile](../examples/multi-stage.Dockerfile).

**Task:** Write four notes (not a full harden-the-world list): (1) which user the process runs as, (2) what breaks if you add `--read-only`, (3) why the tag is not `latest`, (4) what `.dockerignore` is excluding. Then run the image with `--read-only` and record what you had to add (`--tmpfs`, a writable path).

**Hint:** `docker exec` + `id`; `docker logs` after a failed read-only start.

**Success:** Four short notes plus one command line that actually starts (or a log line that explains why nginx needed `/run`).

<details>
<summary>Solution notes</summary>

`hello-multi:1` already has `USER app`. `hello-static:1` plus `--read-only` usually needs `--tmpfs /var/cache/nginx --tmpfs /run`.

</details>
