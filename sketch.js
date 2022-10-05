let stop, bubble, bubble2;

function setup() {
  createCanvas(800, 700);
  
  //* Initialize variables
  stop = false;

  bubble = new Ball(
    width /2
    , height / 2
    , random(0, PI)
    , 10
    , 100
  )
  
  bubble2 = new Ball(
    width /4
    , height /4
    , random(0, PI)
    , 10
    , 100
  )

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

  bubble.move();
  bubble.show();

  bubble2.move();
  bubble2.show();
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
    stroke(255);
    strokeWeight(4);
    fill(100, 0, 100);
    circle(this.x, this.y,this.diam);
  }

  move() {
    if (
        (this.x + this.dX + this.diam/2) > width 
        || 
        (this.x + this.dX - this.diam / 2) < 0
      ) {
        this.dX = this.dX * -1;
    } 
    if (
        (this.y + this.dY + this.diam/2) > height 
        || 
        (this.y + this.dY - this.diam/2) < 0
      ) {
      this.dY = this.dY * -1;
    }
  
    //* Update X position if stop is false
    if (stop == false) {
      this.x += this.dX;
      this.y += this.dY;
    }
  }
}
