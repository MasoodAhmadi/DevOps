FROM node:16-alpine

WORKDIR /app

# Copy package.json (and package-lock.json if available)
COPY package.json ./
# Optionally: COPY package-lock.json ./

RUN npm install

# Copy the rest of your source code, including app.js
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
