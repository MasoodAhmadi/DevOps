#!/bin/bash

# This is a simple test script that makes a GET request to the API gateway.
# You can use curl or any other tool. The script should exit with non-zero status if a test fails.

echo "Testing API Gateway /fetch endpoint..."

# Example: Send a request to http://localhost:8198/fetch (adjust as needed)
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8198/fetch)

if [ "$response" -eq 200 ]; then
  echo "PASS: /fetch endpoint returned 200 OK."
else
  echo "FAIL: /fetch endpoint returned $response."
  exit 1
fi

# Optionally, add tests for other endpoints such as /stop or any additional API routes.

echo "All tests passed!"
exit 0
