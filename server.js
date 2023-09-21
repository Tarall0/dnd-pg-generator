const http = require('http');
const fs = require('fs').promises; // Use promises for file reading

let html;
let css;
let js;

// Use Promise.all to read all files concurrently
Promise.all([
    fs.readFile('./index.html', 'utf8'),
    fs.readFile('./app.css', 'utf8'),
    fs.readFile('./script/script.js', 'utf8')
])
.then(([htmlData, cssData, jsData]) => {
    html = htmlData;
    css = cssData;
    js = jsData;

    // Start the server after all files are read
    http.createServer((req, res) => {
        res.statusCode = 200;
        if (req.url.indexOf('app.css') != -1) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(css);
            res.end();
            return;
        }
        if (req.url.indexOf('/script/script.js') != -1) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(js);
            res.end();
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }).listen(8080, () => {
        console.log('Server is running on port 8080');
    });
})
.catch((err) => {
    console.error('Error reading files:', err);
});
