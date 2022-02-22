"use strict";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser:true}, (err,client) => {
  let db = client.db('OnlineSales');
  assert.equal(null,err);
  console.log("Connexion reussie");
  client.close();
} );
