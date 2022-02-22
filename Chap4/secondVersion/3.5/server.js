var express = require('express');

var app = express();

app.set('view engine','ejs');

app.get('/', (request,response) => {
  response.setHeader('Content-Type','text/html');
  response.render('test.ejs',{message: 'Wouhala!'});
});

app.listen(8888);
