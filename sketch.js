let balls = [];

function setup() {
  createCanvas(800, 700);
}

function mouseDragged() {
  // Generate new ball
  let ball = new Ball(
    mouseX
    , mouseY
    , random(0, PI)
    , random(1, 20)
    , random(10, 100)
  );
  // Add new ball to the array
  balls.push(ball);
}

function mousePressed() {
  /* 
    On click event, remove the ball when 
    it contains the mouse
    
  */
  for (let i = balls.length-1; i >= 0; i --) {
    // Check if the ball contains the mouse
    if (balls[i].contains(mouseX, mouseY)) {
      // Remove the ball from the array
      balls.splice(i, 1)
    }
  }
}

function draw() {
  background(0);

  /*
    Move & display alls balls in array
  */
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
    this.stop = false;
  }

  /*
    Check if ball is clicked
  */
  contains(px, py) {
    // Dist btw/ Mouse & ball is smaller than radius 
    let d = dist(px, py, this.x, this.y)
    return ( d < this.diam / 2 )
  }

  switch() {
    this.stop = (!this.stop)
  }

  show() {
    /*
      Ball is displayed as a circle
    */
    //stroke(255);
    noStroke(4);
    fill(255, 0, 0, 100);
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
  
    /* 
      Update ball position if stop flag is false
    */
    if (!this.stop) {
      this.x += this.dX;
      this.y += this.dY;
    }
  }
}
