# Nexus

Minimal instructions for building the backend containers.

```bash
# Build the authentication service
docker build -f infra/docker/auth/Dockerfile -t nexus-auth .

# Build the main service
docker build -f infra/docker/main_service/Dockerfile -t nexus-main .
```

Run the stack with Docker Compose:

```bash
cd infra/docker
docker compose up
```
