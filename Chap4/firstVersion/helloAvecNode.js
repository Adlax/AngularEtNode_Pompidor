var http = require('http');

var server = http.createServer( (request,response) => {
  response.end('Hello World de node.js')
} );

server.listen(8888);
