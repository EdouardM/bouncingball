let x, y, diam, dX, dY, direction, speed;
let stop;
angleMode(RADIANS);

function setup() {
  createCanvas(800, 800);
  
  //* Initialize variables
  x = width /2;
  y = height / 2;
  direction = random(0, PI);
  speed = 10;
  dX = cos(direction) * speed;
  dY = sin(direction) * speed;
  diam = 100;
  stop = false;
}

//* Switch the stop variale
function mousePressed() {
  if (stop == true) {
      stop = false;
  } 
  else {
      stop = true;
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  
  if ((x + dX + diam/2) > width || (x + dX - diam / 2) < 0) {
    dX = dX * -1;
  } 
  if ((y + dY + diam/2) > height || (y + dY - diam/2) < 0) {
    dY = dY * -1;
  }

  //* Update X position if stop is false
  if (stop == false) {
    x += dX;
    y += dY;
  }

  fill(100, 0, 100);

  circle(x, y,diam);

}

class Ball {
  constructor (x, y, direction, speed) {
    this.x = x;
    this.y = y;
    this.dX = cos(direction) * speed;
    this.dY = sin(direction) * speed;
    this.r = diam / 2;
    this.stop = false;
  }

}