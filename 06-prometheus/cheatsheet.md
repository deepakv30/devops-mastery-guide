# Prometheus cheat sheet

First success: [README](./README.md#beginner-first-success). Definitions: [glossary](../docs/GLOSSARY.md).

## Run (Docker)

```bash
cd examples/docker
docker compose up -d
# UI: http://localhost:9090
# Targets: Status → Targets
docker compose logs prometheus
docker compose down
```

Reload config after editing `prometheus.yml` (compose enables lifecycle):

```bash
curl -X POST http://localhost:9090/-/reload
```

## Objects

| Object | Role |
|---|---|
| Target | Something that answers `GET /metrics` |
| Job | A named scrape config (`job_name`) |
| Series | Metric name + labels |
| Scrape | One pull |
| TSDB | On-disk samples |
| PromQL | Questions over the TSDB |
| Alert | Rule that stays true; sent to Alertmanager |
| Exporter | `/metrics` adapter for something you did not write |
| ServiceMonitor | Operator CRD: scrape these Services |

## Metric types

| Type | Goes | Typical query |
|---|---|---|
| Counter | Up (or reset) | `rate(metric[5m])` |
| Gauge | Up and down | `metric` |
| Histogram | Buckets + sum + count | `histogram_quantile(0.99, sum(rate(metric_bucket[5m])) by (le))` |
| Summary | Client quantiles | Do not `avg` across instances |

## PromQL you will type

```promql
up
prometheus_build_info
rate(prometheus_http_requests_total[5m])
up{job="prometheus"}
sum(rate(http_requests_total{status=~"5.."}[5m])) by (job)
  / sum(rate(http_requests_total[5m])) by (job)
```

`rate()` needs a range vector (`[5m]`). Filter with `{label="value"}`. Match regex with `=~`.

## Files in this module

| File | What it is |
|---|---|
| [examples/docker/docker-compose.yml](./examples/docker/docker-compose.yml) | Laptop Prometheus |
| [examples/docker/prometheus.yml](./examples/docker/prometheus.yml) | Scrape config |
| [examples/prometheus-rule.yaml](./examples/prometheus-rule.yaml) | Operator `PrometheusRule` (HighErrorRate) |
| [examples/alertmanager-config.yaml](./examples/alertmanager-config.yaml) | Alertmanager routes to Slack |
| [examples/servicemonitor.yaml](./examples/servicemonitor.yaml) | Operator scrape of `app: my-app` |

## Production flags (not first success)

```text
--storage.tsdb.retention.time=15d
scrape_interval: 15s
# never: user_id, request_id, raw email as labels
```

Helm (cluster, after Docker works): `prometheus-community/kube-prometheus-stack`.
