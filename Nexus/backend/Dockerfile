# Multi-service Dockerfile for running both the authentication
# and main Django services in a single container.

FROM python:3.9

# Install Node.js for the auth service
RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /usr/src/app

# Copy service code
COPY auth ./auth
COPY main_service ./main_service

# Install dependencies for the auth service
WORKDIR /usr/src/app/auth
RUN npm install

# Install dependencies for the Django service
WORKDIR /usr/src/app/main_service
RUN pip install -r requirements.txt

# Copy start script
WORKDIR /usr/src/app
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose service ports
EXPOSE 5000 8000

# Run both services
CMD ["./start.sh"]
