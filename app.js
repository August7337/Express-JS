const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>webdev</title></head>');
    res.write('<body><h1>hellodev</h1></body>');
    res.end('</html>');
})

server.listen(3000);