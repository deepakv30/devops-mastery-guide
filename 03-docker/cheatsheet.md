# Docker cheat sheet

One page. Details live in [README.md](./README.md).

## Objects

| Object | Meaning |
|---|---|
| Image | Immutable snapshot + default command. Built, pulled, tagged. |
| Container | One running (or stopped) instance of an image. |
| Layer | One filesystem diff, usually one Dockerfile instruction. |
| Registry | Where images live (`docker.io`, GHCR, …). |
| Bind mount | A host path mounted into a container. |
| Named volume | Docker-managed directory; use for database data. |

## Run and inspect

```bash
docker version
docker run --rm -d --name web -p 8080:80 nginx:1.27-alpine
docker ps
docker logs web --tail 20
docker exec web ls /usr/share/nginx/html
docker inspect web --format '{{.State.Status}}'
docker stop web          # --rm then deletes it
docker ps -a             # includes stopped
```

`-p HOST:CONTAINER`. `--rm` = delete on stop.

## Build

```bash
docker build -t hello-static:1 .
docker build -f multi-stage.Dockerfile -t hello-multi:1 .
docker images
```

Pin tags (`1.27-alpine`). Do not use `latest` on purpose.

## Compose

```bash
docker compose up -d
docker compose ps
docker compose logs --tail 20
docker compose down
```

File in this module: [examples/docker-compose.yml](./examples/docker-compose.yml).

## Production flags (short)

```bash
docker run --rm --read-only --tmpfs /tmp --cap-drop ALL --user 10001 …
```

`USER` in the Dockerfile is better than `--user` on the CLI for anything you ship.

## Files in this module

- [examples/hello-static/Dockerfile](./examples/hello-static/Dockerfile) — two-line static site.
- [examples/hello-static/index.html](./examples/hello-static/index.html)
- [examples/hello-static/.dockerignore](./examples/hello-static/.dockerignore)
- [examples/docker-compose.yml](./examples/docker-compose.yml) — nginx + bind mount.
- [examples/multi-stage.Dockerfile](./examples/multi-stage.Dockerfile) — Go builder → alpine + `USER`.
