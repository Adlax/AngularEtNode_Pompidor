var fs = require('fs');

var readable = fs.createReadableStream('Products.json');

readable.on('open', () => {
  readable.pipe(response);
  console.log('Liste des produits renvoyes : ');
});

readable.on('error', () => { response.end('[]'); });
