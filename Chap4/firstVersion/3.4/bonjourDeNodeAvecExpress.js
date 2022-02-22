var express = require('express');
var app = express();

app.set('view-engine','ejs');

app.get('/', (req,res) => {
  res.setHeader('Content-Type','text/html');
  res.render('testNodeExpress.ejs',{message:'Bonjour de node/express en passant par ejs'});
} );

app.listen(8888);
