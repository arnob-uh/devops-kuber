const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const IMAGE_PATH = path.join('/usr/src/app/files', 'image.jpg');
const IMAGE_URL = 'https://picsum.photos/1200';

async function fetchAndSaveImage() {
    console.log('Fetching a new image...');
    try {
        const response = await axios.get(IMAGE_URL, { responseType: 'stream' });
        const writer = fs.createWriteStream(IMAGE_PATH);

        response.data.pipe(writer);

        // Wait for the file stream to finish
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log('Image saved successfully.');
    } catch (error) {
        console.error(`Error fetching image: ${error.message}`);
    }
}

if (!fs.existsSync(path.dirname(IMAGE_PATH))) {
    fs.mkdirSync(path.dirname(IMAGE_PATH), { recursive: true });
}

if (!fs.existsSync(IMAGE_PATH)) {
    fetchAndSaveImage();
}

setInterval(fetchAndSaveImage, 60 * 60 * 1000);

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to ToDo App</h1>
            <img src="/image" alt="Random Image" style="max-width: 100%; height: auto;" />
            <h2>Todos</h2>
            <ul>
                <li>ToDo1</li>
                <li>ToDo2</li>
                <li>ToDo3</li>
            </ul>
            <h3>Add a new todo</h3>
            <form id="todo-form">
                <input type="text" id="todo-input" maxlength="140" placeholder="Enter a todo (max 140 chars)" />
                <button type="button" id="send-btn">Send</button>
            </form>
        `);
    } else if (req.method === 'GET' && req.url === '/image') {
        if (fs.existsSync(IMAGE_PATH)) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            fs.createReadStream(IMAGE_PATH).pipe(res);
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});