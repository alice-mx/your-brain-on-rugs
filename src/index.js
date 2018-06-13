import './style.css'

import {EEG_STYLES} from './eegData.js';
import Canvas from './canvas.js';
import Mandela from './visualisations/mandela.js';
import Shaders from './visualisations/shaders.js';


import Frame from './frame.js';

var canvas = new Canvas("canvas");

var button = document.getElementById("mandela");
var shaderButton = document.getElementById("shader-button");
canvas.setBackground("black");


var visual = new Shaders();

button.onclick = function() {
  canvas.clear();
  visual = new Mandela();
}

shaderButton.onclick = function() {
  canvas.setBackground("black");
  canvas.clear();
  visual  = new Shaders();
}


var rawData = [];
setInterval(function() {
  fetch('http://localhost:3000/eeg/now').then(response => {
    response.json().then(data => {
      rawData = data;
    });
  });
}, 50);


setInterval(function() {
  visual.step(rawData, EEG_STYLES);
}, 12);


function step() {
  canvas.drawFrame(visual.makeFrame());
  requestAnimationFrame(step);
}
requestAnimationFrame(step);
