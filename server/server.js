var Firebase = require('firebase');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

require('./middleware.js')(app, express);

app.use(bodyParser.json())
  .use(express.static(__dirname + './../client'));

app.listen(port);
console.log('BizGram magic being delivered on', port);
