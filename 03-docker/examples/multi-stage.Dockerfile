# syntax=docker/dockerfile:1
# Production example: compile in one stage, copy only the binary into the runtime image.
# The same idea in Node is `npm run build` then COPY --from=builder /app/dist.
#
# From this directory:
#   docker build -f multi-stage.Dockerfile -t hello-multi:1 .
#   docker run --rm -d --name multi -p 8083:8080 hello-multi:1
#   curl -s http://127.0.0.1:8083
#   docker stop multi

FROM golang:1.23-alpine AS builder
WORKDIR /src
RUN printf '%s\n' \
  'package main' \
  'import ("fmt"; "net/http")' \
  'func main() {' \
  '  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "ok\\n") })' \
  '  http.ListenAndServe(":8080", nil)' \
  '}' > main.go
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /out/app .

FROM alpine:3.20
RUN adduser -D -u 10001 app
COPY --from=builder /out/app /app
USER app
EXPOSE 8080
CMD ["/app"]
