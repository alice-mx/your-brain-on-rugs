

const http = require('http');
var express = require('express');
var app = express();

var mockData = require('./mock_data.json');

var blink = {};
const port = 3000;

var brainData = [];
var history = [];

app.get('/eeg/now', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(brainData));
});

app.get('/eeg/logs', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(history));
});

app.get('/blink_data', function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(blink));
});

app.listen(port);


var past = [];
var prev = Date.now();


var i = 0;
setInterval(function() {
  var data = mockData[i%mockData.length];
  data.timestamp = Date.now();
  brainData = data;
  history.push(brainData);
  i++;
},300);
