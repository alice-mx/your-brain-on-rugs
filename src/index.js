import './style.css'

function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "Hi";

  return element;
}

document.body.appendChild(component());

var prevHeight = 200;
var height = 200;

setInterval(function() {
  fetch('http://localhost:3000').then(response => {
    response.json().then(json => {
      let data = json;
      console.log(data);
      prevHeight = height;
      if(typeof(data.eegPower) != 'undefined') {
        var newHeight = data.eegPower.highGamma/20;
        var update = setInterval(function() {
          var difference = height - newHeight;
          if(difference > 10) {
            height -=1;
          } else if (difference < -10) {
            height +=1;
          } else {
            clearInterval(update);
          }
        },1);
      }
    });
  });
}, 1000);


function getYCoordsForCurve(x, width, speed, height, offset) {
  return Math.sin( x /  width + i / (25000-speed)) * height + 400;
}


var button = document.querySelector('.round-button');

button.onclick = function() {
var settings = document.querySelector('.settings');
settings.classList.toggle('closed');

}

var canvas = document.createElement('canvas');
canvas.setAttribute('width',1000);
canvas.setAttribute('height',800);

var body = document.querySelector('.background');
body.appendChild(canvas);

var context = canvas.getContext("2d");
var widthInput = document.getElementById('width');
var speedInput = document.getElementById('speed');
var sizeInput = document.getElementById('circle');
var forumla = document.getElementById('formula');
var clearCanvas = document.getElementById('clear');
var i = 0;




setInterval(function() {
  formula.innerHTML = `y = sin ( x / ${widthInput.value} + t / ${(10000-speedInput.value)} ) * ${height} + 400`;
  if(clear.checked) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  for(var x = 100 ; x < 900; x++) {
    var y = getYCoordsForCurve(x, widthInput.value, speedInput.value, height);
    context.strokeStyle = `hsla(${x/3+i/1000%360}, 100%, ${50+x/20}%, 0.8)`;
    context.beginPath();
    context.lineWidth=1;
    context.arc(x,y, sizeInput.value, 100, 2 * Math.PI, true);
    context.stroke();
    i++;
  }

},20);
