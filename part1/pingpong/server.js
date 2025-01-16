const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
let counter = 1;

const filePath = path.join('/usr/src/app/files/', 'ping.txt');

app.get('/ping', (req, res) => {
    fs.writeFileSync(filePath, counter.toString(), 'utf-8');
    res.send(`pong ${counter}`);
    counter++;
});

const callPingEndpoint = () => {
    const PING_URL = `http://localhost:${PORT}/ping`;
    setInterval(async () => {
        try {
            const response = await axios.get(PING_URL);
        } catch (error) {
            console.error(`Error calling /ping: ${error.message}`);
        }
    }, 5000);
};

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Pong server started on port ${PORT}`);
    callPingEndpoint();
});