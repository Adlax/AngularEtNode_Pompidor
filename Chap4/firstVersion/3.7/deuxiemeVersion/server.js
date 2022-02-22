var express = require('express');
var fs = require('fs');

var app = express();

app.get('/products/:brand', (req,res) => {
  var searchedBrand = req.params.brand;
  var productsArray = JSON.parse(fs.readFileSync('Products.json'));
  var results = [];
  for(var i=0; i < productsArray.length; i++){
    if(productsArray[i].brand==searchedBrand){
      results.push(productsArray[i]);
    }
  }
  res.setHeader('Content-Type','application/json;charset=utf-8;');
  res.setHeader('Access-Control-Allow-Origin','*');
  var json = JSON.stringify(results);
  res.end(json);
} );

app.listen(8888);
