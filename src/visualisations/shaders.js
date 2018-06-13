import Circle from '../shapes/circle.js';
import Frame from '../frame.js';
import Point from '../point.js';
import Line from '../shapes/line.js';
import Triangle from '../shapes/triangle.js';




export default class {
  constructor() {
    this.DISTANCE = 400;
    this.stepCount = 0;
    this.neighbors = [];
    this.stars = [];
    for(var i = 0; i < 8; i++) {
      this.stars.push({x:0, y:0,  size: 5, hsl:{h:0,s:0,l:0}, grow: true});
    }

    this.particles = [];
    for(var i = 0; i < 250; i++) {
      this.particles.push({
        x:Math.random()*2000,
        y:Math.random()*2000,
        xStep: Math.random()-0.5,
        yStep: Math.random()-0.5,
        size: 1,
        hsl:{h:Math.random()*360, s:50, l:100, a: 0.1}
      });
    }

    this.lines = [];


  }

  distanceBetween(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x,2) + Math.pow(pointA.y - pointB.y,2));
  }

  findNeighborParticles(star, particles, distance) {
    var neighbors = [];
    for(var i = 0; i < particles.length; i++) {
      var actualDistance = this.distanceBetween(star, particles[i]);
      if(actualDistance < distance) {
        particles[i].hsl.a = (distance-actualDistance)/distance;
        neighbors.push(particles[i]);
      }
    }
    return neighbors;
  }
  step(rawData, eegStyles) {
    this.stepCount++;


    for(var i = 0; i < this.particles.length; i++) {
      this.particles[i].x += Math.sin(this.stepCount*this.particles[i].yStep/100)+this.particles[i].yStep;
      this.particles[i].y += this.particles[i].xStep;
    }

    if(typeof(rawData.eegPower)!='undefined') {
      var keys = Object.keys(eegStyles);
      this.lines = [];
      for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var target = {};
        target.x = (this.stepCount+i*250)%2000;
        target.y = 2000-(rawData.eegPower[key]/eegStyles[key].divisor);

        if(typeof(this.stars[i]) == 'undefined') {
          this.stars[i] = {x:0, y:0};
        }

        this.stars[i].x = target.x
        this.stars[i].y += (target.y-this.stars[i].y)/500;
        this.stars[i].hsl = {h: (i*10+this.stepCount/10)%360, s: 100, l: 50, a: 0.01};
        this.stars[i].size = 5;

        this.neighbors = this.findNeighborParticles(this.stars[i], this.particles, this.DISTANCE);

      }
    }
  }

  makeFrame() {
    var frame = new Frame();
    for(var i = 0; i < this.stars.length;i++) {
        frame.circles.push(new Circle(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].hsl));
        for(var l = 0; l < this.neighbors.length; l++) {
          frame.lines.push(new Line(this.stars[i].x, this.stars[i].y, this.neighbors[l].x, this.neighbors[l].y, this.stars[i].hsl, this.neighbors[l].hsl));
        }
    }

    for(var i = 0; i < this.particles.length;i++) {
        frame.circles.push(new Circle(this.particles[i].x, this.particles[i].y, this.particles[i].size, this.particles[i].hsl));
    }

    return frame;
  }

}
