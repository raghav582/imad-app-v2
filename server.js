var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

function hash(input,salt) { 
var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512'); 
return hashed.toString('hex');

}

app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/hash/:input', function (req, res) {
var hashedString=hash(req.params.input,'this-is-a-random-string');
res.send(hashedString);
});