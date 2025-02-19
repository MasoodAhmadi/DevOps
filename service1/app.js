const express = require('express');
const axios = require('axios');
const app = express();

// Serve the UI with two buttons (REQUEST and STOP) and a text area
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
        // When the REQUEST button is clicked, call the /fetch endpoint.
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
        
        // When the STOP button is clicked, call the /stop endpoint.
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

// Endpoint to fetch API data from Service2 and then block for 2 seconds.
app.get('/fetch', async (req, res) => {
  try {
    // Fetch data from Service2's API
    const response = await axios.get('http://service2:3000/api/system-info');
    res.json(response.data);

    // Simulate a blocking 2-second delay after responding
    const start = Date.now();
    while (Date.now() - start < 2000) {
      // Busy wait (not recommended for production)
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Endpoint to simulate system shutdown (e.g., stopping containers)
app.get('/stop', (req, res) => {
  res.send('Stopping Service1');
  // After a short delay, exit the process to simulate a shutdown.
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

// Start Service1 on port 5000
app.listen(5000, () => {
  console.log('Service1 listening on port 5000');
});
