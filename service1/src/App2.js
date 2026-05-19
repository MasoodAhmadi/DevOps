// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   // Send the response immediately
//   res.send(`Response from ${process.env.HOSTNAME || 'Service1'} at ${new Date().toISOString()}`);

//   // Synchronously block for 2 seconds (simulate sleep)
//   const start = Date.now();
//   while (Date.now() - start < 2000) {
//     // Busy wait for 2 seconds
//   }
// });

// app.listen(5000, () => {
//   console.log("Service1 listening on port 5000");
// });
