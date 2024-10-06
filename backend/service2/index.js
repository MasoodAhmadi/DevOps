const express = require('express');
const { execSync } = require('child_process');
const os = require('os');

const app = express();

app.get('/api/system-info', (req, res) => {
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

app.listen(8080, () => {
    console.log('Service2 running on port 8080');
});
