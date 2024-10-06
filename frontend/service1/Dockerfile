# Dockerfile for service1
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build
# Expose the port on which the service will run
EXPOSE 8199

# Start the application
CMD ["npm", "start"]
