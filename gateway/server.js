const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
const PORT = 8197;
let systemState = "INIT"; // Default state
const logFile = "run-log.txt";

app.use(bodyParser.text()); // Accept text/plain body

// Log state changes
const logStateChange = (prevState, newState) => {
    const logEntry = `${new Date().toISOString()}: ${prevState} -> ${newState}\n`;
    fs.appendFileSync(logFile, logEntry);
};

// PUT /state - Change system state
app.put("/state", (req, res) => {
    const newState = req.body.trim().toUpperCase();

    if (!["INIT", "PAUSED", "RUNNING", "SHUTDOWN"].includes(newState)) {
        return res.status(400).send("Invalid state");
    }

    if (newState === systemState) {
        return res.status(200).send("No change, state remains " + systemState);
    }

    const prevState = systemState;
    systemState = newState;
    logStateChange(prevState, systemState);

    if (newState === "SHUTDOWN") {
        res.send("Shutting down all services...");
        exec("docker-compose -f /docker-compose.yml down", (error) => {
            if (error) console.error("Error stopping containers:", error);
        });
    } else {
        res.send("State changed to " + systemState);
    }
});

// GET /request - Simulate request handling
app.get("/request", (req, res) => {
    if (systemState === "PAUSED") {
        return res.status(503).send("System is paused, request cannot be processed.");
    }
    res.send("Request processed successfully!");
});

// GET /run-log - Get state change log
app.get("/run-log", (req, res) => {
    if (fs.existsSync(logFile)) {
        res.type("text/plain").send(fs.readFileSync(logFile, "utf8"));
    } else {
        res.status(404).send("No log available.");
    }
});

// Start API Gateway
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
