var express = require('express');
var fs = require('fs');
var split = require('split');

var app = express();

app.get('/products/:brand', (request,response) => {

  var searchedBrand = request.params.brand;
  console.log('Route invoquee : /products/' + searchedBrand);

  var readable = fs.createReadStream('products.json');
  var objectStream = readable.pipe(split());
  var produitsDeMarque = [];

  readable.on('error', () => {response.end('[]')} );

  objectStream.on('data', (chunk) => {
    try {
      chunk = chunk.replace(/,$/,'');
      var product = JSON.parse(chunk);
      if(product.brand==searchedBrand){
        produitsDeMarque.push(product);
      }
    } catch(e) {

    }
  } );

  objectStream.on('end', () => {
    response.setHeader('Content-Type','application/json;charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin','*');
    response.end(JSON.stringify(produitsDeMarque));
    // response.end(produitsDeMarque);
  } );

} );

app.listen(8888);
