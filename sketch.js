let stop, balls = [];

function setup() {
  createCanvas(800, 700);
  
  //* Initialize variables
  stop = false;
}

function mouseDragged() {

  let ball = new Ball(
    mouseX
    , mouseY
    , random(0, PI)
    , random(1, 20)
    , random(10, 100)
  );
  
  balls.push(ball);
}

//* Switch the stop variable
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

  for (let ball of balls) {
    ball.move();
    ball.show();
  }

}


class Ball {
  constructor (x, y, direction, speed, diam) {
    this.x = x;
    this.y = y;
    this.dX = cos(direction) * speed;
    this.dY = sin(direction) * speed;
    this.diam = diam;
  }

  show() {
    /*
      Ball is displayed as a circle
    */
    stroke(255);
    strokeWeight(4);
    fill(100, 0, 100);
    circle(this.x, this.y,this.diam);
  }

  move() {
    /*
      If ball hits vertical wall at 0 or canvas witdth
      then it bounces back: dX -> -dX
    */
    if (
        (this.x + this.dX + this.diam/2) > width 
        || 
        (this.x + this.dX - this.diam / 2) < 0
      ) {
        this.dX = this.dX * -1;
    }
    /*
      If ball hits horizontal wall at 0 or canvas height
      then it bounces back: dY -> -dY
    */
    if (
        (this.y + this.dY + this.diam/2) > height 
        || 
        (this.y + this.dY - this.diam/2) < 0
      ) {
      this.dY = this.dY * -1;
    }
  
    //* Update ball position if stop is false
    if (stop == false) {
      this.x += this.dX;
      this.y += this.dY;
    }
  }
}
