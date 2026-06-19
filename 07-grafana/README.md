# Grafana Mastery

**Last Major Update:** 2026-06-19 | Focused on visualization and dashboards with Prometheus

## Introduction & Why It Matters

Grafana is the leading open-source platform for observability. It allows teams to query, visualize, and alert on metrics from Prometheus and many other data sources. In enterprise environments, Grafana is essential for building insightful dashboards, implementing SLO-based alerting, and enabling collaborative monitoring.

## Core Concepts

- Data Sources (Prometheus, Loki, Tempo, etc.)
- Dashboards and Panels
- Variables and Templating
- Alerting (unified alerting)
- Annotations
- Plugins and Data Links
- Folders and Permissions

## Installation & Setup

### Using Helm (with Prometheus Operator)

Grafana is usually installed together with Prometheus:

```bash
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set grafana.enabled=true
```

Access Grafana:
```bash
kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring
```
Default credentials: `admin` / `prom-operator`

## Key Features & Best Practices

### Enterprise Best Practices
- Use **folders** and **teams** for access control
- Prefer **library panels** for reusability
- Use **variables** extensively for dynamic dashboards
- Implement **unified alerting** with proper notification policies
- Version dashboards as code (using Terraform or Git sync)
- Avoid hardcoding values — use variables and templating

### Security
- Enable authentication (OAuth, LDAP, or Grafana Cloud)
- Use role-based access control (RBAC)
- Avoid exposing Grafana publicly without proper security

## Hands-on Examples

### Example: Basic Dashboard JSON (Simplified)

```json
{
  "dashboard": {
    "title": "Kubernetes Overview",
    "panels": [
      {
        "title": "CPU Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)"
          }
        ]
      }
    ]
  }
}
```

## Common Pitfalls & Troubleshooting

- Dashboard not showing data → Check data source connection and PromQL query
- Permission issues → Verify user roles and folder permissions
- Slow dashboards → Optimize queries and use recording rules in Prometheus

## Integration with Other Tools

- **Prometheus**: Primary data source
- **Loki**: For logs visualization
- **Tempo / Jaeger**: Distributed tracing
- **Alertmanager**: Alert visualization
- **Kubernetes**: Dashboard for cluster health

## Exercises

### Basic
1. Connect Grafana to your Prometheus instance.
2. Create a simple dashboard showing CPU and memory usage.

### Intermediate
3. Create a dashboard with variables (e.g., namespace selector).
4. Set up basic alerting in Grafana.

### Advanced
5. Version and manage dashboards as code using Git or Terraform.
6. Build a comprehensive SLO dashboard with error budget tracking.

## Official Documentation & Further Reading

- [Grafana Documentation](https://grafana.com/docs/)
- [Grafana Alerting](https://grafana.com/docs/grafana/latest/alerting/)
- [Dashboard Best Practices](https://grafana.com/docs/grafana/latest/best-practices/)
