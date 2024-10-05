# service1/Dockerfile

# Use an official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 8199

# Start the Express server to serve both the React frontend and the API
CMD ["npm", "start"]"]
