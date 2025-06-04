# Nexus

This repository contains a small example of a multi service backend.
Two separate services live under `backend/`:

- `auth` – a Node.js authentication service
- `main_service` – a Django application

## Using docker-compose

Inside `backend/` there is a `docker-compose.yml` file that starts both
services together with their dependencies (MongoDB, MySQL, Prometheus and
Grafana). Run the following commands from the `backend` directory:

```bash
docker-compose up --build
```

## Single container image

If you prefer to run both services inside one container for development,
use the Dockerfile located at `backend/Dockerfile`.
Build and run the image from the repository root with:

```bash
docker build -t nexus-backend ./backend
docker run -p 5000:5000 -p 8000:8000 nexus-backend
```
