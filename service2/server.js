const express = require('express');
const app = express();

app.get('/api/system-info', (req, res) => {
    res.json({
        service: "Service2",
        timestamp: new Date(),
        status: "Running"
    });
});

app.listen(3000, () => {
    console.log('Service2 running on port 3000');
});
