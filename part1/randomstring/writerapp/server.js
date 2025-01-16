const fs = require('fs');
const path = require('path');

const filePath = path.join('/usr/src/app/files/', 'timestamp.txt');

console.log(`Writer started. Writing timestamps to ${filePath}`);

setInterval(() => {
    const timestamp = new Date().toISOString();
    fs.writeFileSync(filePath, timestamp, 'utf-8');
    console.log(`Timestamp written: ${timestamp}`);
}, 5000);
