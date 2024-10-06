# Dockerfile for service2
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the application will run on
EXPOSE 8199

# Start the Express server using nodemon
CMD ["npm", "start"]
