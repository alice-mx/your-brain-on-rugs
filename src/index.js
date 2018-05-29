import './style.css'

var prevHeight = 200;
var height = 200;
var width = 50;
var prevWidth = 50;
var saturation = 100;
var prevSaturation = 100;
var prevSpeed =  100;
var speed = 100;

function getYCoordsForCurve(x, width, speed, height, offset) {
  return Math.sin( x /  width + i / (25000-speed)) * height + 400;
}


var canvas = document.createElement('canvas');
canvas.setAttribute('width',3000);
canvas.setAttribute('height',2000);


var previousTimestamp = false;
//
// function step(timestamp) {
//   if (!previousTimestamp) {
//     previousTimestamp = timestamp;
//   }
//   var progress = timestamp - previousTimestamp;
//   shiftCanvas(context, canvas.width, canvas.height, -(progress/30),0);
//   previousTimestamp = timestamp;
// }
//
// var scroll = setInterval(()=>{step(Date.now())},18);



var body = document.querySelector('.background');
body.appendChild(canvas);

var context = canvas.getContext("2d");
var context2 = canvas.getContext("2d");

var sizeInput = document.getElementById('circle');
var forumla = document.getElementById('formula');
var clearCanvas = document.getElementById('clear');
var i = 0;

let prev = {eegPower : {}, eSense:{}};



const EEG_STYLES = {
  delta: {
    color: "blue",
    divisor: 20000
  },
  highAlpha: {
    color: "green",
    divisor: 4000
  },
  highBeta: {
    color: "black",
    divisor: 3000,
  },
  highGamma: {
    color: "purple",
    divisor: 1000,
  },
  lowAlpha: {
    color: "pink",
    divisor: 4000,
  },
  lowBeta: {
    color: "grey",
    divisor: 1000
  },
  lowGamma: {
    color: "brown",
    divisor: 2000
  },
  theta: {
    color: "orange",
    divisor: 5200
  },
  attention: {
    color: "grey",
    divisor: 1,
  },
  meditation: {
    color: "grey",
    divisor: 1,
  }
}
function drawLines(context, data, prev,start) {
  var keys = Object.keys(data.eegPower);
  var prevX = (prev.timestamp-start)/500;
  var x = (data.timestamp-start)/500;
  console.log(x);
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i];
    context.beginPath();
    context.moveTo(prevX,prev.eegPower[key]/EEG_STYLES[key].divisor+(i+1)*80);
    context.lineTo(x,data.eegPower[key]/EEG_STYLES[key].divisor+(i+1)*80);
    context.strokeStyle = EEG_STYLES[key].color;
    context.stroke();
  }
}
var start = Date.now();
var svg = document.getElementsByTagName('svg')[0];
function drawHistory(history) {
  var offset = Date.now();
  var prev = {};
  for(var timestamp in history) {
    var point = history[timestamp];

    if(typeof(point.eegPower) != 'undefined' && typeof(prev.eegPower) != 'undefined') {

      var keys = Object.keys(point.eegPower);
      context.globalAlpha = point.signalStength/200;
      for(var i = 0; i < keys.length; i++) {
        var key = keys[i];

        context.beginPath();
        context.strokeStyle = EEG_STYLES[key].color;
        context.moveTo((prev.timestamp-offset)/50+2800, prev.eegPower[key]/EEG_STYLES[key].divisor+(i+1)*200);
        context.lineTo((timestamp-offset)/50+2800,      point.eegPower[key]/EEG_STYLES[key].divisor+(i+1)*200);
        context.stroke();

        context.beginPath();
        context.fillStyle = EEG_STYLES[key].color;
        context.arc((timestamp-offset)/50+2800, point.eegPower[key]/EEG_STYLES[key].divisor+(i+1)*200, 3, 0, Math.PI*2, true);
        context.fill();
      }
    }
    var prev = Object.assign(prev,point);
  }
}
//
// function shiftCanvas(context, width, height, xShift, yShift) {
//   var imageData = context.getImageData(0, 0, width, height);
//   context.clearRect(0, 0, width, height);
//   context.putImageData(imageData, xShift, yShift);
// }
//
// function slowlyDrawLine(){}
//
// function drawMostRecent(canvas, data, prev) {
//   var context = canvas.getContext("2d");
//   if(typeof(data.eegPower) != 'undefined') {
//     var keys = Object.keys(data.eegPower);
//     context.globalAlpha = data.signalStength/200;
//
//
//     // context.beginPath();
//     // context.moveTo(2500-data.timestamp%1000,0);
//     // context.lineTo(2500-data.timestamp%1000,2000);
//     // context.stroke();
//
//     for(var i = 0; i < keys.length; i++) {
//       var key = keys[i];
//
//
//
//
//       context.beginPath();
//       context.fillStyle = EEG_STYLES[key].color;
//       context.arc(2500, data.eegPower[key]/EEG_STYLES[key].divisor+(i+1)*200, 3, 0, Math.PI*2, true);
//       context.fill();
//     }
//   }
//
//
// }
//






var t = 0;
var start = Date.now();
context.lineWidth = 3;
var history = {};
setInterval(function() {
  fetch('http://localhost:3000/eeg/now').then(response => {
    response.json().then(json => {
      var data = json;
      context.clearRect(0,0,4000,4000);

      history[data.timestamp] = data;
      drawHistory(history);
      // drawMostRecent(canvas, data, prev);
      // history.push(data);
      //
      // if(history.length > 2000) {
      //   history.splice(0,1);
      // }
      //
      // console.log(data);
      // drawHistory(history);

       prev = Object.assign(prev,data);
      t += 0.5;
    });
  });
}, 10);


setTimeout(()=>{console.log(history)}, 5000);
