var express = require('express');
var querystring = require('querystring');

var app = express();

app.get('/products', (req,res) => {
  var query = querystring.parse(req.url.split('?')[1]);
  console.log(query);
} );

app.listen(8888);
