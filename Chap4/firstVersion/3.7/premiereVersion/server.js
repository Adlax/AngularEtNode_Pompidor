var express = require('express');
var fs = require('fs');

var app = express();

app.get('/products', (req,res) => {
  res.setHeader('Content-Type','application/json;charset=utf-8;');
  res.setHeader('Access-Control-Allow-Origin','*');
  var readable = fs.createReadStream('Products.json');
  readable.on('open', ()=>{
    readable.pipe(res);
  });
  readable.on('error', ()=>{res.end('[]');});
} );

app.listen(8888);
