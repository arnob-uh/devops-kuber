const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const filePath = path.join('/usr/src/app/files/', 'ping.txt');

app.get('/status', (req, res) => {
    try {
        if (fs.existsSync(filePath)) {
            const timestamp = new Date().toISOString()
            const hash = crypto.createHash('sha256').update(filePath).digest('hex');
            const ping = fs.readFileSync(filePath,'utf-8')
            res.json({ timestamp,  hash, ping });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});