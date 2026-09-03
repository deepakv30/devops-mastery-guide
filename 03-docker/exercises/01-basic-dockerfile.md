# Basic 1 — write a static Dockerfile

**Band:** Beginner  
**Setup:** Empty directory, Docker running.

**Task:** Write a Dockerfile that serves a static `index.html` with `nginx:1.27-alpine` (or a 10-line Python `http.server` image if you prefer).

**Hint:** `COPY` the file into `/usr/share/nginx/html/`. You may copy [examples/hello-static/Dockerfile](../examples/hello-static/Dockerfile).

**Success:** The Dockerfile has a pinned `FROM` and a `COPY`. It sits next to your `index.html`.

<details>
<summary>Solution notes</summary>

Same shape as [examples/hello-static/](../examples/hello-static/Dockerfile).

</details>
