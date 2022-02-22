"use strict";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/";

var productResearch = function(db, objetFiltre, callback) {
  var cursor = db.collection('Products').find(objetFiltre);
  cursor.each( (err,doc) => {
    assert.equal(err,null);
    if(doc!=null){
      for(let prop in doc) console.log(prop + " : " + doc[prop]);
    } else {
      callback();
    }
    console.log("\n");
  } );
};

MongoClient.connect(url, {useNewUrlParser:true}, (err,client) => {
  var db = client.db('OnlineSales');
  assert.equal(null,err);
  productResearch(db,
                  {"type":"phone","brand":"Peach"},
                  () => {console.log('Fin de l interrogation');} );
  client.close();
} );
