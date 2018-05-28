import './style.css'

var prevHeight = 200;
var height = 200;
var width = 50;
var prevWidth = 50;
var saturation = 100;
var prevSaturation = 100;
var prevSpeed =  100;
var speed = 100;
setInterval(function() {
  fetch('http://localhost:3000').then(response => {
    response.json().then(json => {
      let data = json;
      console.log(data);
      prevHeight = height;
      prevWidth = width;

      if(typeof(data.eSense)!='undefined') {
        var saturationStep = ((data.eSense.attention)-prevSaturation)/100;
        var speedStep = ((data.eSense.meditation)-prevSpeed)/100;
        var c = 0;

        var smoothUpdate = setInterval(function() {
          saturation = prevSaturation + (saturationStep*i);
          speed = prevSpeed + (speedStep*i);

          document.getElementById("saturation").innerHTML = saturation;
          document.getElementById("speed").innerHTML = speed;
          c++;
          if(c==50) {
            clearInterval(smoothUpdate);
          }
        },20);
      }

      if(typeof(data.eegPower) != 'undefined') {
        var step = ((data.eegPower.highGamma/20)-prevHeight)/50;

        var widthStep = ((data.eegPower.delta/2000)-prevWidth)/50;

        var i = 0;

        var smoothUpdate = setInterval(function() {
          height = prevHeight + (step*i);
          width = prevWidth + (widthStep*i);
          document.getElementById("height").innerHTML = height;
          document.getElementById("width").innerHTML = width;
          i++;
          if(i==50) {
            clearInterval(smoothUpdate);

          }
        },10);

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
var sizeInput = document.getElementById('circle');
var forumla = document.getElementById('formula');
var clearCanvas = document.getElementById('clear');
var i = 0;




setInterval(function() {
  formula.innerHTML = `y = sin ( x / ${width} + t / ${(10000-speed)} ) * ${height} + 400`;

  for(var x = -100 ; x < 1100; x++) {
    var y = getYCoordsForCurve(x, width, speed, height);
    context.strokeStyle = `hsla(${x/3+i/1000%360}, ${saturation}%, ${100-saturation/2}%, 0.8)`;
    context.beginPath();
    context.lineWidth=1;
    context.arc(x,y, sizeInput.value, 100, 2 * Math.PI, true);
    context.stroke();
    i++;
  }

},20);
