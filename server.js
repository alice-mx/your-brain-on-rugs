var thinkgear = require('node-thinkgear-sockets');

var client = thinkgear.createClient({ enableRawOutput: true });

const http = require('http');

var express = require('express');
var app = express();

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
client.on('data',function(data){

  prev = Date.now();
  data.timestamp = Date.now();
  var json = JSON.stringify(data);
  brainData = data;
  history.push(brainData);
});


client.on('blink_data', function(data) {
  data.timestamp = Date.now();
  blink = data;
})
client.connect();
