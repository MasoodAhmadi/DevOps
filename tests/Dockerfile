# Dockerfile for running tests
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the test files
COPY . .

# Run tests (you can also specify `npm test` directly in the docker-compose.yml as `command`)
CMD ["npm", "test"]
