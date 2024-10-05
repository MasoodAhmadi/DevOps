// service2/index.js
const path = require('path');
const express = require('express');
const { execSync } = require('child_process');
const os = require('os');

const app = express();
const PORT = 8080;

app.get('/system-info', (req, res) => {
    try {
        // Get system info
        const ip_address = os.networkInterfaces();
        const processes = execSync('ps -ax').toString();
        const disk_space = execSync('df -h /').toString();
        const uptime = execSync('uptime -p').toString();

        res.json({
            ip_address: ip_address,
            processes: processes,
            disk_space: disk_space,
            uptime: uptime
        });
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch system information' });
    }
});
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
  

app.listen(PORT, () => {
    console.log(`Service2 (Express) is running on port ${PORT}`);
});
