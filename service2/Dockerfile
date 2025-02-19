# Use Node.js as base image (adjust the version if needed)
FROM node:18

# Set the working directory inside the container
WORKDIR /tests

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the test files into the container
COPY . .

# Command to run tests
CMD ["npm", "test"]
