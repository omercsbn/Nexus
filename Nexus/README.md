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

Nexus is an example e‑commerce platform composed of multiple services. The project demonstrates how separate backend and frontend components can be orchestrated together using Docker.

## Project Goals

* Provide a modular backend written in Python (Django) and Node.js for authentication.
* Offer multiple frontend options (web, mobile and desktop).
* Showcase infrastructure scripts for Docker and Kubernetes along with monitoring via Prometheus and Grafana.

## Services

| Service | Description |
|---------|-------------|
| **Auth Service** | Node.js Express API providing user authentication and related endpoints. Located in `backend/auth`. |
| **Main Service** | Django application for core e‑commerce functionality. Located in `backend/main_service`. |
| **Database** | MySQL container used via `knex` in the `backend/db` folder. A MongoDB container is also configured. |
| **Frontend** | React application under `frontend/react_frontend` with placeholder setups for mobile and desktop clients. |
| **Monitoring** | Prometheus and Grafana configuration under `backend/monitoring`. |

## Running the Project

1. **Start Backend Services**

   ```bash
   cd backend
   docker-compose up --build
   ```

   This starts the authentication service, main service, databases and monitoring stack.

2. **Run the Web Frontend**

   ```bash
   cd ../frontend/react_frontend
   npm install
   npm start
   ```

   The web UI will be available at `http://localhost:3000`.

## Repository Layout

```
Nexus/
  backend/     # Node.js auth service, Django main service and database config
  frontend/    # React web app and placeholders for mobile/desktop clients
  infra/       # Docker and Kubernetes configuration examples
```

This repository is a starting point and can be extended with additional services or deployment scripts as needed.
