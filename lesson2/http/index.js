const http = require('http');

const server = http.createServer(
  (req, res) => {
    res.writeHead(200);
    res.end('Hello, World!');
  });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
