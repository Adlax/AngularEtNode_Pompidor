"use strict";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/";

var productResearch = function(db, objetFiltre) {
  var cursor = db.collection('Products').find(objetFiltre);
  cursor.forEach( (err,doc) => {
    assert.equal(err,null);
    if(doc!=null){
      for(let k in doc) console.log(k + " : " + doc[k]);
    }
    console.log('Fin du traitement');
    console.log('\n');
  } );
};

MongoClient.connect(url, {useNewUrlParser:true}, (err,client) => {
  var db = client.db('OnlineSales');
  assert.equal(null,err);
  productResearch(db, {"type":"phone"});
  client.close();
} );


// "use strict";
//
// var MongoClient = require("mongodb").MongoClient;
// var assert = require("assert");
// var url = 'mongodb://localhost:27017';
//
// var findProduits = function(db) {
//    var cursor = db.collection("Products").find();
//     cursor.each(function(err, doc) {
// 	assert.equal(err, null);
//         if (doc != null)
//            for (let p in doc) console.log(p+' : '+doc[p]);
// 	console.log("\n");
//     });
// };
//
// MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
//    let db = client.db("OnlineSales");
//    assert.equal(null, err);
//
//    findProduits(db);
//    client.close();
// });
