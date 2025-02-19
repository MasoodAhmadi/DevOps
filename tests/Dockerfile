# Dockerfile for running tests
FROM node:18

# Set working directory
WORKDIR /tests

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install && npm cache clean --force

# Copy the test files
COPY . .

# Healthcheck to ensure the container is healthy
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD ["npm", "test"]

# Run tests (you can also specify `npm test` directly in the docker-compose.yml as `command`)
CMD ["npm", "test"]