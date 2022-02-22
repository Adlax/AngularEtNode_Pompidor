"use strict";

// En marche, dans l'anu !

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

  // gestion recherche _id : ca marche !
  app.get('/Product/id=:id', (req,res) => {
    let id = req.params.id;
    console.log('Dans /product/id=',id);
    if(/[0-9a-z]{24}/.test(id)){
      db.collection('Products').find({"_id":ObjectId(id)})
        .toArray( (err,docs) => {
          let jsonResult = JSON.stringify({});
          if(docs!=undefined && docs[0]!=undefined){
            jsonResult = JSON.stringify(docs[0]);
          }
          res.end(jsonResult);
        } );
    } else {
      res.end(JSON.stringify({}));
    }
  } );

  //pour recuperer les selectors
  function distinctValuesResearch(db, selectors, property, callback) {
    db.collection('Products')
      .distinct(property, (err,docs) => {
        if(err) selectors.push({"name": property, "values": []});
        else {
          if(docs!==undefined){
            let values = [];
            if(property=='price'){
              let min = Math.min.apply(null,docs);
              let max = Math.max.apply(null,docs);
              let minSlice = Math.floor(min/100)*100;
              let maxSlice = Math.floors(max/100)*100;
              values.push(minSlice + '-' + maxSlice);
              while(max > maxSlice){
                minSlice += 100;
                maxSlice += 100;
                values.push(minSlice + '-' + maxSlice);
              }
              selectors.push({"name": property, "values":values});
            } else {
              selectors.push({"name": property, "values": docs.sort()});
            }
          } else {
            selectors.push({"name": property, "values":[]});
          }
        }
        callback(selectors);
      } );
  }

  // pour que express handle la route avec selectors et les trouve
  app.get("/Products/selectors", (req,res) => {
    distinctValuesResearch(db, [], "type", (selectors) => {
      distinctValuesResearch(db, selectors, "brand", (selectors) => {
        distinctValuesResearch(db, selectors, "price", (selectors) => {
          distinctValuesResearch(db, selectors, "popularity", (selectors) => {
            let jsonResult = JSON.stringify(selectors);
            res.setHeader('Content-type','application/json;charset=UTF-8');
            res.end(jsonResult);
          } );
        } );
      } );
    } );
  } );

  // Gestion de get avec keywords en queryString : Marche
  app.get('/Products/keywords', (req,res) => {
    let keywords = [];
    for(let keyword in req.query){
      keywords.push(keyword);
    }
    db.collection('Products')
      .find({},{"_id":0})
      .toArray( (err,docs) => {
        let results = [];
        docs.forEach( doc => {
          let match = true;
          for(let k of keywords){
            let found = false;
            for(let prop in doc){
              let regexp = new RegExp(k,'i');
              if(regexp.test(doc[prop])){
                found = true;
                break;
              }
            }
            if(!found) match = false;
          }
          if(match) results.push(doc);
        } );
        res.setHeader('Content.type','application/json;charset=UTF-8');
        let jsonResult = JSON.stringify(results);
        res.end(jsonResult);
      } );
  } );

  // pour getter les IDs des produits du panier d un type : a priori ca marche
  app.get("/CartProductsIds/products/email=:email", (req,res) => {
    let email = req.params.email;
    db.collection('Carts')
      .find({"email":email})
      .toArray( (err,docs) => {
        if(docs!==undefined && docs[0]!==undefined){
          let order = docs[0].order;
          res.setHeader("Content-type","application/json;charset=UTF-8");
          let json = JSON.stringify(order);
          res.end(json);
        }
      } );
  } );

  // pour recuperer le cart d un email
  app.get("/CartProducts/email=:email", (req,res) => {
    let email = req.params.email;
    let pipeline = [
      { $match: {"email":email} },
      { $unwind: "$order" },
      { $lookup: { from: "Products", localField: "order", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      { $group: { "_id":"$_id", "order":{"$push":"$order"}, "products":{"$push":"$product"} } }
    ];
    db.collection('Carts')
      .agregate(pipeline)
      .toArray( (err,docs) => {
        let json;
        if(docs!==undefined && docs[0]!==undefined){
          let productsInE = docs[0].products;
          let productsInI = {};
          for(let product of productsInE){
            if(product._id in productsInI){
                productsInI[product._id].nb++;
            } else {
              productsInI[product._id]
                = {
                    "_id":product._id,
                    "type":product.type,
                    "brand":product.brand,
                    "name":product.name,
                    "popularity":product.popularity,
                    "price":product.price,
                    "nb":1
                  };
            }
          }
          let productList = [];
          for(let productId in productsInI){
            productList.push(productsInI[productId]);
          }
          json = JSON.stringify(productList);
        } else {
          let json = JSON.stringify([]);
        }
        res.setHeader('Content-type','application/json;charset=UTF-8');
        res.end(json);
      } );
  } );

  // Pour recevoir la demande d ajout de produit dans un cart d un mec
  app.post('/CartProducts', (req,res) => {
    let id = req.body.productId;
    let email = req.body.email;
    db.collection('Carts')
      .find({"email":email})
      .toArray( (err,docs) => {
        let json = {};
        if(docs!==undefined && docs[0]!==undefined){
          let order = docs[0].order;
          order.push({ObjectId(id)});
          db.collection('Carts').update({"email":email},{$set:{"order":order}});
          json = JSON.stringify(order);
        } else {
          json = JSON.stringify([]);
        }
        res.setHeaders('Content-type','application/json;charset=UTF-8');
        res.end(json);
      } );
  } );

  // web service pour supprimer un produit d un panier de client
  app.delete('/CartProducts/productId=:id/email=:email', (req,res) => {
    let id = req.params.id;
    let email = req.params.email;
    db.collection('Carts')
      .find({"email":email})
      .toArray( (err,docs) => {
        let json = {};
        if(docs!=undefined && docs[0]!=undefined){
          let order = docs[0].order;
          let position = order.map( p => p.toString() ).indexOf(id);
          if(position != -1){
            order.splice(position,1);
            db.collection('Carts').update({"email":email},{$set:{"order":order}});
            json = order;
          }
        }
        res.setHeader('Content-type','application/json;charset=UTF-8');
        res.end(JSON.stringify(json));
      } );
  } );

  // web service pour reset tout le cart d un email
  app.get('/Cart/reset/email=:email', (req,res) => {
    let email = req.params.email;
    db.collection('Carts')
      .update({"email":email},{$set:{"order":[]}});
    res.setHeader('Content-type','application/json;charset=UTF-8');
    res.end('Cart reset done!');
  } );

} );
