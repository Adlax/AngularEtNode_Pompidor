var express = require('express');
var fs = require('fs');
var https = require('https');

var app = express();

var options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  ca: fs.readFileSync('./ca.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

https.createServer(options,app).listen(8443);

app.get('/login=:login/password=:password', (request,response) => {
  let login = request.params.login;
  let passwd = request.params.password;
  console.log('Ok avec login : ' + login + ' et le password : ' + passwd);
} );
