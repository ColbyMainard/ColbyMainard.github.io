const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = './index.html'; // Default to index.html

    if (req.url === '/404') {
        filePath = './404.html';
    }
    // You can add more logic here to serve different HTML files based on req.url

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            if (filePath.endsWith(".html")){
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            } else if (filePath.endsWith(".js")){
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(data);
            } else if (filePath.endsWith(".css")){
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
            else{
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            }
        }
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});