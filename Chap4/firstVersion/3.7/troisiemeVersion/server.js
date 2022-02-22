var express = require('express');
var fs = require('fs');
var split = require('split');

var app = express();

app.get('/products/:brand', (req,res) => {
  var searchedBrand = req.params.brand;
  var readable = fs.createReadStream('Products.json');
  var objectStream = readable.pipe(split());
  var productsOfBrand = [];

  readable.on('error', ()=>{res.end('[]');});

  objectStream.on('data', (chunk)=>{
    try{
      chunk = chunk.replace('/,$/','');
      var product = JSON.parse(chunk);
      if(product.brand==searchedBrand){productsOfBrand.push(product);}
    } catch(e){
    }
  });
  objectStream.on('end', () => {
    res.setHeader('Content-Type','application/json;charset=utf-8;');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end(JSON.stringify(productsOfBrand));
  } );
} );

app.listen(8888);
