var http = require('http');
var salutations = require('salutations');
var server = http.createServer( (req,res) => {
  res.end(salutations.salutations());
} );
server.listen(8888);
