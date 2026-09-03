# Intermediate — two services with Compose

**Band:** Intermediate  
**Setup:** [examples/docker-compose.yml](../examples/docker-compose.yml).

**Task:** Add a second service (a `redis:7-alpine` with no ports published is enough) *or* convert your exercise-1 app into a two-service Compose file. Bring the stack up and down with Compose.

**Hint:** Services on the default Compose network can reach each other by service name. `docker compose ps` should list both.

**Success:** `docker compose up -d` starts two containers; `curl` to the web port still works; `docker compose down` removes them.

<details>
<summary>Solution notes</summary>

Under `services:` add `cache: { image: redis:7-alpine }`. `docker compose up -d && docker compose ps`.

</details>
