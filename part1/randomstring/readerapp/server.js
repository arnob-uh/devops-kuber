const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const filePath = path.join('/usr/src/app/files/', 'timestamp.txt');

app.get('/status', (req, res) => {
    try {
        if (fs.existsSync(filePath)) {
            const timestamp = fs.readFileSync(filePath, 'utf-8');
            const hash = crypto.createHash('sha256').update(timestamp).digest('hex');
            res.json({ timestamp, hash });
        } else {
            res.status(404).json({ error: 'Timestamp file not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Reader started on port ${PORT}`);
});