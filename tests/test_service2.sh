#!/bin/bash

echo "Starting Service2 for testing..."
nohup node server.js &  # Run Service2 in the background
sleep 2  # Wait for it to start

echo "Testing Service2 /api/system-info endpoint..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/system-info)

if [ "$response" -eq 200 ]; then
  echo "PASS: /api/system-info returned 200 OK."
else
  echo "FAIL: /api/system-info returned $response."
  exit 1
fi

echo "All tests passed!"
exit 0
