var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.post('/products', (request,response) => {
  for(let e in request.body){
    console.log(e + ' : ' + request.body[e]);
  }
} );

app.listen(8888);
