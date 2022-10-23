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
    , random(1, 5)
    , random(5, 50)
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

/*
  When space key is pressed all balls 
  freeze or unfreeze
*/
function keyPressed() {
  // Space key is pressed
  if (keyCode === 32) {
    for (let ball of balls) {
      ball.switch();
    }
  }
}

function draw() {
  background(0);

  /*
    Move & display alls balls in array
  */
  for (let ball of balls) {
    let highlight = false;
    
    for (let other of balls) {
      if (ball != other && ball.intersects(other)) {
        highlight = true;
        
      } else {
        if (ball != other && ball.hit(other)) {
          ball.bounce();
        }
      }
      if (highlight) {
        ball.highlight();
      } else {
        ball.normal();
      }
    }
    ball.move();
    ball.show();
  } 

}

class Ball {
  constructor (
      x, y
      , direction
      , speed
      , r
      , c = color(255,0,0)
      , brightness = 100) {
    this.x = x;
    this.y = y;
    this.dX = cos(direction) * speed;
    this.dY = sin(direction) * speed;
    this.radius = r;
    this.stop = false;
    this.color = c;
    this.brightness = brightness;
  }

  /*
    Check if one point is inside this ball
    Parameters:
    - px: point x coordinate
    - py: point y coordinate
  */
  contains(px, py) {
    let d = dist(px, py, this.x, this.y)
    // Distance between point and this ball is smaller than this ball radius 
    return ( d < this.radius )
  }

  /*
    Check if this ball intersects another ball
    Parameter: 
    - other: other Ball
  */
  intersects(other) {
    let d = dist(other.x, other.y, this.x, this.y)
    // Distance is less than the sum of radius
    return (d <= other.radius + this.radius)
  }

  hit(other) {
    let d = dist(other.x + other.dX, other.y + other.dY, this.x + this.dX, this.y + this.dY)
    // Distance is less than the sum of radius
    return (d <= other.radius + this.radius)
  }

  bounce() {
    this.dY = this.dY * -1;
    this.dX = this.dX * -1;
  }

  switch() {
    this.stop = (!this.stop)
  }

  highlight() {
    this.color = color(0,0,180);
    this.brightness = 180;
  }

  normal() {
    this.color = color(255,0,0);
    this.brightness = 100;
  }

  show() {
    /*
      Ball is displayed as a circle
    */
    noStroke(4);
    // Set color object 
    let c = this.color;
    
    // Set alpha w/ this ball brightness
    c.setAlpha(this.brightness);

    // use color object to fill the ball
    fill(c);

    // draw the ball 
    circle(this.x, this.y,this.radius * 2);
  }

  move() {
    /*
      If ball hits vertical wall at 0 or canvas width
      then it bounces back: dX -> -dX
    */
    if (
        (this.x + this.dX + this.radius) > width 
        || 
        (this.x + this.dX - this.radius) < 0
      ) {
        this.dX = this.dX * -1;
    }
    /*
      If ball hits horizontal wall at 0 or canvas height
      then it bounces back: dY -> -dY
    */
    if (
        (this.y + this.dY + this.radius) > height 
        || 
        (this.y + this.dY - this.radius) < 0
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
