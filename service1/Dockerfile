# service1/Dockerfile
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose port 8199
EXPOSE 8199

# Start the server
CMD ["npm", "start"]
