FROM node:18

# Install Docker CLI
RUN apt-get update && apt-get install -y docker.io
RUN apt-get update && apt-get install -y docker-compose

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
