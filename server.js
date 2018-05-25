var thinkgear = require('node-thinkgear-sockets');

var client = thinkgear.createClient({ enableRawOutput: true });

const http = require('http');

const hostname = 'localhost';
const port = 3000;

var brainData = [];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'text/json');
  res.end(JSON.stringify(brainData));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




client.on('data',function(data){

	console.log(data);
  data.timestamp = Date.now();
  var json = JSON.stringify(data);
  brainData = data;
  var fs = require('fs');
  fs.writeFile('dist/brain_data.json', json, 'utf8');

});


client.on('blink_data', function(data) {
  console.log(data);
})
client.connect();
