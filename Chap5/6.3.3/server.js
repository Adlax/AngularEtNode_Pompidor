"use strict";

// Marche !!!!!

var express = require('express');
var app = express();
app.listen(8888);

var cors = require('cors');
app.use(cors());

var async = require('async');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
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
  app.get('/Product/id=:id', (req,res) => {
    let id = req.params.id;
    console.log('Dans /Product/id='+id);
    if(/[0-9a-f]{24}/.test(id)){
      db.collection('Products').find({"_id":ObjectId(id)})
        .toArray( (err,docs) => {
          let jsonResult = JSON.stringify({});
          if(docs!==undefined && docs[0]!==undefined){
            jsonResult = JSON.stringify(docs[0]);
          }
          console.log(jsonResult);
          res.end(jsonResult);
        } );
    } else {
      res.end(JSON.stringify({}));
    }
  });
} );
