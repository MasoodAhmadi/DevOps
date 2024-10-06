# Use an official Node.js image as the base image
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application (optional step if you're using webpack-dev-server for development)
# RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application using webpack-dev-server
CMD ["npm", "start"]
