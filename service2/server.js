const express = require('express');
const os = require('os');
const checkDiskSpace = require('check-disk-space').default;
const app = express();
app.get('/api/system-info', (req, res) => {
    const ipAddress = getIpAddress();
    const uptimeSeconds = os.uptime();

    checkDiskSpace('/').then((diskSpace) => {
        res.json({
            service: 'Service2',
            ip: ipAddress,
            uptime: uptimeSeconds,
            diskSpace: {
                total: diskSpace.total,
                free: diskSpace.free,
                available: diskSpace.free
            }
        });
    }).catch((err) => {
        res.status(500).json({ error: 'Unable to retrieve disk space' });
    });
});

function getIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const iface in interfaces) {
        for (const ifaceDetails of interfaces[iface]) {
            if (ifaceDetails.family === 'IPv4' && !ifaceDetails.internal) {
                return ifaceDetails.address;
            }
        }
    }
    return '0.0.0.0';
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Service2 running on port ${port}`);
});

module.exports = app; 
