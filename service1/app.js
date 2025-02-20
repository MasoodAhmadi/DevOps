const express = require('express');
const axios = require('axios');
const { exec } = require('child_process'); // Import child_process to run shell commands
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Service1 UI</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        button { margin: 5px; padding: 10px 20px; }
        textarea { width: 400px; height: 200px; }
      </style>
    </head>
    <body>
      <h1>Service1 UI</h1>
      <button id="requestBtn">REQUEST</button>
      <button id="stopBtn">STOP</button>
      <br><br>
      <textarea id="resultArea" placeholder="Result will be displayed here"></textarea>

      <script>
        document.getElementById('requestBtn').addEventListener('click', function() {
          fetch('/fetch')
            .then(response => response.json())
            .then(data => {
              document.getElementById('resultArea').value = JSON.stringify(data, null, 2);
            })
            .catch(err => {
              document.getElementById('resultArea').value = 'Error: ' + err;
            });
        });

        document.getElementById('stopBtn').addEventListener('click', function() {
          fetch('/stop')
            .then(response => response.text())
            .then(message => {
              alert(message);
            })
            .catch(err => {
              alert('Error: ' + err);
            });
        });
      </script>
    </body>
    </html>
  `);
});

app.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('http://service2:3000/api/system-info');
    res.json(response.data);

    const start = Date.now();
    while (Date.now() - start < 2000) { }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/stop', (req, res) => {
  res.send('Stopping all services...');

  exec('docker stop $(docker ps -q)', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error stopping services: ${error.message}`);
      return;
    }
    console.log(`Services stopped: ${stdout}`);
  });
});

app.listen(5000, () => {
  console.log('Service1 listening on port 5000');
});
