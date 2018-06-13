export default class {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.setAttribute('width',2000);
    this.canvas.setAttribute('height',2000);
    this.context = this.canvas.getContext("2d");
  }

  clear() {
    this.context.clearRect(0,0,2000,2000);
  }


  setBackground(color) {
    this.canvas.style["background-color"] = color;
  }

  drawFrame(frame) {

    for(var i = 0; i < frame.circles.length; i++) {
      this.drawCircle(frame.circles[i]);
    }

    for(var i = 0; i < frame.lines.length; i++) {
      this.drawLine(frame.lines[i]);
    }




  }

  drawCircle(point) {
    this.context.fillStyle = `hsla(${point.hsl.h},${point.hsl.s}%, ${point.hsl.l}%, ${point.hsl.a})`;
    this.context.beginPath();
    this.context.arc(point.x, point.y, point.size, 0, Math.PI*2,false);
    this.context.fill();
  }



  drawLine(line) {
    var gradient = this.context.createLinearGradient(line.x1,line.y1,line.x2,line.y2);
    gradient.addColorStop(0,`hsla(${line.startColor.h},${line.startColor.s}%, ${line.startColor.l}%, ${line.startColor.a})`);
    gradient.addColorStop(1,`hsla(${line.stopColor.h},${line.stopColor.s}%, ${line.stopColor.l}%, ${line.stopColor.a})`);
    this.context.strokeStyle=gradient;
    this.context.beginPath();
    this.context.lineWidth = 4;
    this.context.lineCap = 'round';
    this.context.moveTo(line.x1, line.y1);
    this.context.lineTo(line.x2, line.y2);
    this.context.stroke();
  }
}
