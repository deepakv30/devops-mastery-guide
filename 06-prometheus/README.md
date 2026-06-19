# Prometheus Monitoring Mastery

**Last Major Update:** 2026-06-19 | Focused on production Kubernetes monitoring

## Introduction & Why It Matters

Prometheus is the de facto standard for monitoring in cloud-native and Kubernetes environments. It provides powerful time-series metrics collection, alerting, and querying capabilities. In enterprise settings, effective Prometheus monitoring is critical for reliability, performance optimization, capacity planning, and incident response.

## Core Concepts

### Key Components
- **Prometheus Server**: Scrapes metrics, stores them in TSDB, evaluates rules, and sends alerts.
- **Exporters**: Tools that expose metrics (node-exporter, kube-state-metrics, cAdvisor, etc.).
- **Client Libraries**: Instrument your applications to expose Prometheus metrics.
- **Alertmanager**: Handles alerts, deduplication, grouping, and routing.
- **Pushgateway**: For short-lived jobs that cannot be scraped.
- **PromQL**: Powerful query language for metrics.
- **Grafana**: Popular visualization layer (often used with Prometheus).

### Metric Types
- Counter
- Gauge
- Histogram
- Summary

## Installation & Setup

### Recommended Production Approach: Prometheus Operator + kube-prometheus-stack

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace
```

This installs:
- Prometheus
- Alertmanager
- Grafana
- Node Exporter
- Kube State Metrics
- And more

## Key Features & Best Practices

### Enterprise Best Practices (2026)
- Use **Prometheus Operator** for Kubernetes-native management (CRDs for Prometheus, ServiceMonitor, PodMonitor).
- Be extremely careful with **high cardinality** labels — they can explode resource usage.
- Set proper `scrape_interval` and retention policies.
- Use **recording rules** to pre-compute expensive queries.
- Implement **High Availability** (multiple Prometheus replicas + Thanos/Cortex for long-term storage when needed).
- Focus monitoring on **SLIs/SLOs** rather than just infrastructure metrics.
- Use **ServiceMonitor** and **PodMonitor** resources instead of static scrape configs.

### Important Metrics to Monitor in Kubernetes
1. Container restart counts (CrashLoopBackOff detection)
2. CPU/Memory usage vs requests/limits
3. HTTP error rates
4. Node disk pressure
5. Pending pod count

## Hands-on Examples

### Example: Basic PromQL Queries

```promql
# CPU usage by pod
sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)

# Memory usage
container_memory_usage_bytes{pod=~"my-app.*"}

# Error rate
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
```

### Example: ServiceMonitor (Recommended in K8s)

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: my-app
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: my-app
  endpoints:
  - port: metrics
    interval: 30s
```

## Common Pitfalls & Troubleshooting

- **High cardinality** causing OOM or slow queries → Reduce label usage.
- **Missing metrics** → Check ServiceMonitor/PodMonitor configuration and labels.
- **Alertmanager not receiving alerts** → Verify Alertmanager configuration and network policies.
- **High resource usage** → Use recording rules and optimize PromQL.

## Integration with Other Tools

- **Kubernetes**: Native integration via Prometheus Operator
- **Docker**: Can scrape container metrics via cAdvisor
- **Ansible**: Can deploy and configure Prometheus
- **Terraform**: Can provision monitoring infrastructure
- **Grafana**: Primary visualization tool
- **Alertmanager**: Core alerting component

## Exercises

### Basic
1. Deploy Prometheus + Grafana using Helm in a kind/minikube cluster.
2. Scrape metrics from a simple application.

### Intermediate
3. Create a ServiceMonitor for your application.
4. Write PromQL queries for key SLI metrics (latency, error rate, traffic).

### Advanced
5. Set up alerting rules and route them through Alertmanager (e.g., to Slack or PagerDuty).
6. Implement basic High Availability with Thanos sidecar.

## Official Documentation & Further Reading

- [Prometheus Official Documentation](https://prometheus.io/docs/)
- [Prometheus Operator](https://prometheus-operator.dev/)
- [kube-prometheus-stack Helm Chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)
- [PromQL Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Best Practices](https://prometheus.io/docs/practices/)
