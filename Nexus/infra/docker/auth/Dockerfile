FROM node:16

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files from the backend service and install dependencies
COPY ../../backend/auth/package*.json ./
RUN npm install

# Copy the rest of the auth service code
COPY ../../backend/auth .

# Expose service port
EXPOSE 5000

# Default command
CMD ["node", "app.js"]
