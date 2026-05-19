const express = require('express');
const disk = require('diskusage-ng');
const os = require('os');

const app = express();

app.get('/api/system-info', async (req, res) => {
    try {
        const diskInfo = await new Promise((resolve, reject) => {
            disk("/", (err, info) => {
                if (err) reject(err);
                else resolve(info);
            });
        });

        const systemInfo = {
            service: 'Service2',
            ip: getIPAddress(),
            uptime: os.uptime(),
            diskSpace: {
                free: diskInfo.free,
                available: diskInfo.available,
                total: diskInfo.total
            }
        };

        console.log("System Info:", systemInfo);
        res.json(systemInfo);
    } catch (error) {
        console.error("Error fetching system info:", error);
        res.status(500).json({ error: 'Could not retrieve system info' });
    }
});

function getIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Service2 running on port ${port}`);
});

module.exports = app;
