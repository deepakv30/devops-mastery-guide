# Grafana cheat sheet

First success: [README](./README.md#beginner-first-success). Definitions: [glossary](../docs/GLOSSARY.md).

## Run (Docker)

```bash
# stop 06-prometheus compose first if it owns :9090
cd examples/docker
docker compose up -d
# UI: http://localhost:3000
# first login: admin / admin  (change it)
docker compose logs grafana
docker compose down
# forgotten password:
docker compose down -v
```

## Click path

1. Connections → Data sources → Prometheus → Save & test
2. Explore → metric `up` → Run query
3. Add to dashboard → Save
4. Dashboards → Lessons → **up** (provisioned)

## Objects

| Object | Role |
|---|---|
| Data source | Backend Grafana queries (Prometheus URL) |
| Dashboard | Saved page of panels |
| Panel | One query + one visualization |
| Variable | Dropdown substituted into queries (`$job`) |
| Folder | Permission and grouping boundary |
| Provisioning | Files Grafana loads at start |

## Compose URLs

| From | Prometheus URL |
|---|---|
| Your browser | http://localhost:9090 |
| Grafana container | `http://prometheus:9090` |

`localhost:9090` inside Grafana is wrong.

## Files in this module

| File | What it is |
|---|---|
| [examples/docker/docker-compose.yml](./examples/docker/docker-compose.yml) | Prometheus + Grafana 11 |
| [examples/docker/prometheus.yml](./examples/docker/prometheus.yml) | Self-scrape, same idea as module 06 |
| [examples/docker/provisioning/datasources/prometheus.yml](./examples/docker/provisioning/datasources/prometheus.yml) | Auto data source |
| [examples/docker/provisioning/dashboards/provider.yml](./examples/docker/provisioning/dashboards/provider.yml) | Loads JSON from `json/` |
| [examples/docker/provisioning/dashboards/json/up.json](./examples/docker/provisioning/dashboards/json/up.json) | Minimal `up` dashboard |

## Alerting (pick one)

| Path | When |
|---|---|
| Prometheus → Alertmanager | Rules next to the TSDB / Operator |
| Grafana alerting | Multi-source, Grafana-owned folders |

## Production reminders

- Do not publish `:3000` without SSO (or equivalent) and TLS.
- Do not put webhooks or tokens in dashboard JSON.
- Helm Grafana (often password `prom-operator`) is the cluster chart, not first success.
