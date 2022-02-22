"use strict";

// Marche !!!

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
  app.get('/Products/:type/:brand/:minprice/:maxprice/:minpopularity', (req,res) => {
    var filterObject = {};
    if(req.params.type!='*'){
      filterObject.type = req.params.type;
    }
    if(req.params.brand!='*'){
      filterObject.brand = req.params.brand;
    }
    if(req.params.minprice!='*' || req.params.maxprice!='*'){
      filterObject.price = {};
      if(req.params.minprice!='*'){filterObject.price.$gte=parseInt(req.params.minprice);}
      if(req.params.maxprice!='*'){filterObject.price.$lte=parseInt(req.params.maxprice);}
    }
    if(req.params.minpopularity!='*'){
      filterObject.popularity = {$gte:parseInt(req.params.minpopularity)};
    }
    productResearch(
      db,
      {"message":"Recherche avancee","filterObject":filterObject},
      (etape,results) => {
        console.log(etape + " : " + results.length + " produits trouves : ");
        res.setHeader("Content-Type","application/json;charset=UTF-8");
        var jsonResult = JSON.stringify(results);
        console.log(jsonResult);
        res.end(jsonResult);
      }
    );
  });
} );
