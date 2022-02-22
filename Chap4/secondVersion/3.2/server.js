var http = require('http');

var server = http.createServer((request,response)=>{
  response.end('Wouhala bijour!');
});

server.listen(8888);
