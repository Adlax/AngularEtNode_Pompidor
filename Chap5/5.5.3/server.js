"use strict";

// Ce code marche

var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/";

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

  async.series([
    //premier bloc
    function(callback){
      productResearch(
        db,
        {'message':'Etape 1','filterObject':{'type':'phone'}},
        (message,results) => {
          console.log(message + " : " + results.length + " produits selectionnes");
          if(results.length>0){
            for(let doc of results){
              average += doc.price;
              console.log(doc.price);
            }
            average = (average)/(results.length);
            console.log('Moyenne du prix : ' + average);
            console.log('\n');
            callback();
          } else {
            callback(true);
          }
        }
      );
    },
    //deuxieme bloc
    function(callback){
      productResearch(
        db,
        {'message':'Etape 2', 'filterObject':{'price':{$gte:average}}},
        (message,results) => {
          console.log(message + " : " + results.length + " produits selectionnes");
          for(let doc of results){
            console.log(doc.name + " : " + doc.price);
          }
          console.log('\n');
          callback();
        }
      );
    },
    //troisieme bloc
    function(){
      client.close();
      console.log('Mama Mia!');
    }
  ]);
} );
