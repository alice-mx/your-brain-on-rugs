import Circle from '../shapes/circle.js';
import Frame from '../frame.js';
import Point from '../point.js';


export default class {
  constructor() {
    this.points = [];
    this.stepCount = 0;
    for(var i = 0; i < 8; i++) {
      this.points.push({x:1000, y:1000, hsl:{h:i*40, s: 50, l: 50}});
    }

  }

  rotate(point, radians) {
    var newPoint = {};
    const WIDTH = 2000;
    var x = point.x-WIDTH/2;
    var y = point.y-WIDTH/2;

    newPoint.x = (x * Math.cos(radians) - y*Math.sin(radians)) + WIDTH/2;
    newPoint.y = (y * Math.cos(radians) + x*Math.sin(radians)) + WIDTH/2;

    return newPoint;

  }

  flip(point) {
    var newPoint = {};
    const WIDTH = 2000;
    newPoint.x = point.x;
    newPoint.y = WIDTH/2 - (point.y-WIDTH/2);

    return newPoint;
  }

  step(rawData, eegStyles) {
    this.stepCount++;
    if(typeof(rawData.eegPower)!='undefined') {
      var keys = Object.keys(eegStyles);

      for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var target = {};
        target.x = 1000+(rawData.eegPower[key]/eegStyles[key].divisor)/2;
        target.y = 1000+Math.sin(Date.now()/100)*target.x;
        if(typeof(this.points[i]) == 'undefined') {
          this.points[i] = {x:0, y:0};
        }
        this.points[i].x += (target.x-this.points[i].x)/200;
        this.points[i].y += (target.y-this.points[i].y)/200;
        this.points[i].hsl.s = rawData.eSense.meditation;
        this.points[i].hsl.l = (25+rawData.eSense.attention/2);
        this.points[i].hsl.a = 1;

        this.points[i].size = (rawData.eegPower[key]/eegStyles[key].divisor)/200;
      }
    }
  }

  makeFrame() {
    var frame = new Frame();
    for(var i = 0; i < this.points.length;i++) {
        const SEGMENT_COUNT = 15;

        for(var a = 0; a < SEGMENT_COUNT; a++) {
          var flippedPoint = this.rotate(this.flip(this.points[i]), ((Math.PI*2)/SEGMENT_COUNT * a));

          var point =  this.rotate(this.points[i], ((Math.PI*2)/SEGMENT_COUNT * a));

          if(typeof(this.points[i].hsl) == 'undefined') {
            this.points[i].hsl = {h: 0, s: 0, l: 0};
          }
          frame.circles.push(new Circle(point.x, point.y, this.points[i].size, this.points[i].hsl));
          frame.circles.push(new Circle(flippedPoint.x, flippedPoint.y, this.points[i].size, this.points[i].hsl));

        }
    }
    return frame;
  }

}
