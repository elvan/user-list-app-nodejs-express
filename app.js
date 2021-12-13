const http = require('http');

const hostname = '127.0.0.1';

const port = 3000;

function handleRequest(req, res) {
  if (req.url === '/current-time') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>${new Date().toISOString()}</h1>`);
  } else if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
  }
}

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
