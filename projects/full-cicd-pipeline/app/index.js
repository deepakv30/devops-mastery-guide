const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let requestsTotal = 0;

app.use((req, _res, next) => {
  requestsTotal += 1;
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from DevOps CI/CD Pipeline!',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Prometheus text format. Enough for a ServiceMonitor to have something to scrape.
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain; version=0.0.4');
  res.send(
    [
      '# HELP http_requests_total Number of HTTP requests handled since process start.',
      '# TYPE http_requests_total counter',
      `http_requests_total ${requestsTotal}`,
      ''
    ].join('\n')
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
