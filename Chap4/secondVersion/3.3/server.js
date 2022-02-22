var http = require('http');
var salut = require('salutations');

var server = http.createServer((request,response)=>{
  response.end(salut.salutations());
});

server.listen(8888);
