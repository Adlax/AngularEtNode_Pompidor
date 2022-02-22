"use strict";

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

  // gestion recherche cinq parameters

  // gestion recherche _id


} );
