// service1/api.js
const express = require('express');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const app = express();

// Serve the React app build files
app.use(express.static(path.join(__dirname, 'build')));

// API route to get system info
app.get('/api/ip', (req, res) => {
  const ip_address = os.networkInterfaces();
  res.json({ ip: ip_address });
});

app.get('/api/processes', (req, res) => {
  const processes = execSync('ps -ax').toString();
  res.json({ processes });
});

app.get('/api/disk', (req, res) => {
  const disk_space = execSync('df -h /').toString();
  res.json({ disk_space });
});

app.get('/api/uptime', (req, res) => {
  const uptime = execSync('uptime -p').toString();
  res.json({ uptime });
});

// All other requests (like '/') should return the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8199, () => {
  console.log('Service1 (React + API) running on port 8199');
});
