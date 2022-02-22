"use strict";

// En marche ! Vers le progres a marche forcee bordel !

var express = require('express');
var cors = require('cors');
var mongodb = require('mongodb');
var assert = require('assert');

var app = express();
app.use(cors());
app.listen(8888);

let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb://localhost:27017/";

var researchProduct = function(db,parameters,callback) {
  db.collection('Products').find(parameters['filterObject'])
    .toArray( (err,docs) => {
      if(docs!=undefined){
        callback(parameters['message'],docs);
      }
      else {
        callback(parameters['message'],[]);
      }
    } );
}

MongoClient.connect(url, {useNewUrlParser:true}, (err,client) => {

  let db = client.db('OnlineSales');
  assert.equal(null,err);

  // gestion recherche cinq parameters : Ca marche !
  app.get('/Products/criteria/:type/:brand/:minprice/:maxprice/:minpopularity', (req,res) => {
    let filterObject = {};
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
      filterObject.popularity.$gte = parseInt(req.params.minpopularity);
    }
    researchProduct(
      db,
      {'message':'Recherche avancee multi criteres','filterObject':filterObject},
      (etape, results) => {
        console.log(etape + "avec " + results.length + ' produits trouves : ');
        res.setHeader('Content-type','application/json;charset=UTF-8');
        let jsonResult = JSON.stringify(results);
        res.end(jsonResult);
      }
    );
  } );

  // gestion recherche _id


} );
