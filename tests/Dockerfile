FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY tests/package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 if needed for other processes
EXPOSE 3000

# Run the tests with npm test instead of starting the server
CMD ["npm", "test"]
