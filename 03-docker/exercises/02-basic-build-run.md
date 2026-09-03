# Basic 2 — build and publish a host port

**Band:** Beginner  
**Setup:** The Dockerfile from exercise 1.

**Task:** Build it and run it so a host port returns your HTML.

**Hint:** `docker build -t … .` then `docker run --rm -d -p 8084:80`.

**Success:** `curl -s http://127.0.0.1:8084` prints your heading.

<details>
<summary>Solution notes</summary>

Same shape as [examples/hello-static/](../examples/hello-static/Dockerfile). Map host 8084 to container 80 if 8080 is taken.

</details>
