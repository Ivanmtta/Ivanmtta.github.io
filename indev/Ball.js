class Ball{
  
  constructor(x, y, id){
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.radius = 50;
    this.mass = this.radius * 10;
    this.id = id;
  }

  update(){
    this.position.add(this.velocity);
    this.velocity.multiply(new Vector(0.96, 0.96));
    this.clampVelocity();
    this.checkBounds();
  }

  render(){
    graphics.strokeStyle = "white";
    graphics.lineWidth = 5;
    graphics.beginPath();
    graphics.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    graphics.stroke();
    graphics.closePath();
  }

  clampVelocity(){
    if(Math.abs(this.velocity.x + this.velocity.y) < 0.01){
      this.velocity.set(0, 0);
    }
  }

  checkBounds(){
    if(this.position.x + this.radius > frame.width){
      this.velocity.x *= -1;
      this.position.x = frame.width - this.radius;
    }
    if(this.position.x - this.radius < 0){
      this.velocity.x *= -1;
      this.position.x = this.radius;
    }
    if(this.position.y + this.radius > frame.height){
      this.velocity.y *= -1;
      this.position.y = frame.height - this.radius;
    }
    if(this.position.y - this.radius < 0){
      this.velocity.y *= -1;
      this.position.y = this.radius;
    }
  }

  overlaps(ball){
    return Math.sqrt(Math.pow(ball.position.x - this.position.x, 2) + 
      Math.pow(ball.position.y - this.position.y, 2)) <= this.radius + ball.radius; 
  }

  contains(x, y){
    return Math.pow((x - this.position.x), 2) + Math.pow((y - this.position.y), 2) <= Math.pow(this.radius, 2);
  }
}