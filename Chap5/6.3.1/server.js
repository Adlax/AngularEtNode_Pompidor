"use strict";

// Ce code marche

var express = require('express');
var app = express();
app.listen(8888);

var cors = require('cors');
app.use(cors());

var async = require('async');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var assert = require('assert');

var productResearch = function(db, params, callback) {
  db.collection("Products").find(params['filterObject'])
    .toArray( (err,docs) => {
      if(err) callback(err,[]);
      if(docs!=undefined){
        callback(params['message'],docs);
      } else {
        callback(params['message'],[]);
      }
    } );
}


MongoClient.connect(url, {useNewUrlParser:true}, (err,client) => {
  let db = client.db('OnlineSales');
  assert.equal(null,err);
  var average = 0;

  app.get('/Products/brands', (req,res) => {
    productResearch(
      db,
      {"message":"/Products/brands","filterObject":{}},
      (etape,results) => {
        console.log(etape + " : " + results.length + " produits trouves en tout. Nombre de marques differentes : ");
        var brands = [];
        for(let doc of results){
          if(!brands.includes(doc.brand)){brands.push(doc.brand);}
        }
        brands.sort();
        var jsonResult = JSON.stringify(brands);
        console.log(jsonResult);
        res.setHeader("Content-Type","application/json;charset=UTF-8");
        res.end(jsonResult);
      }
    );
  });

} );
