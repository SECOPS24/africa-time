# Africa Time

A small web app that shows the current local time in several African cities.
It uses only Node.js built-ins, so there are no dependencies to install.

## Run locally

```bash
node server.js
```

Then open http://localhost:8080. To use a different port:

```bash
PORT=5050 node server.js
```

## Endpoints

- `/` - the web page
- `/api/times` - JSON with the current time for each city
- `/healthz` - health check
