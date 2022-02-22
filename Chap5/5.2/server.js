"use strict";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser:true}, (err,client) => {
  let db = client.db('OnlineSales');
  assert.equal(null,err);
  console.log("Connexion reussie");
  db.collection("Products")
    .insertOne({
      "type":"phone",
      "brand":"Peach",
      "name":"topPhone 9 16G",
      "popularity":4,
      "price":1500,
      "picture":"topPhone9.jpeg",
      "stock":5,
    });
  client.close();
} );
