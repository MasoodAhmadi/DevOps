# Dockerfile for service2
FROM node:14

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the necessary port for service2
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
