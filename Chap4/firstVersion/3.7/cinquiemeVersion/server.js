var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.post('/products', (req,res) => {
  for(var e in req.body){
    console.log(e + ' : ' + req.body[e]);
  }
} );

app.listen(8888);
