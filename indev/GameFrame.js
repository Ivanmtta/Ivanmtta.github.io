let frame = document.getElementById("frame");
let graphics = frame.getContext("2d");
graphics.imageSmoothingEnabled = false;

let balls = [];
let ballSelected = null;
const mouse = {x: 0, y: 0};

window.onload = ()=>{
  balls.push(new Ball(100, 100, 0));
  balls.push(new Ball(200, 100, 1));
  balls.push(new Ball(200, 200, 2));
  balls.push(new Ball(300, 104, 3));
  balls.push(new Ball(100, 108, 4));
  balls.push(new Ball(200, 300, 5));
  balls.push(new Ball(200, 304, 6));
  balls.push(new Ball(300, 308, 7));
  requestAnimationFrame(gameLoop);
}

function gameLoop(){
  update();
  render();
  requestAnimationFrame(gameLoop);
}

function update(){
  let collidingBalls = [];
  // Update ball physics
  balls.forEach((ball)=>{
    ball.update();
  });
  // Static collisions detection/resolution (overlap)
  balls.forEach((ball)=>{
    balls.forEach((target)=>{
      if(ball.id != target.id){
        // Collision has occured
        if(ball.overlaps(target)){
          collidingBalls.push({
            first: ball,
            second: target
          });
          // Distance between ball centers
          let distance = Math.sqrt(Math.pow(ball.position.x - target.position.x, 2) + Math.pow(ball.position.y - target.position.y, 2));
          // Calculate displacement required
          let overlap = (distance - ball.radius - target.radius) / 2;
          // Displace Current Ball away from collision
          ball.position.x -= overlap * (ball.position.x - target.position.x) / distance;
          ball.position.y -= overlap * (ball.position.y - target.position.y) / distance;
          // Displace Target Ball away from collision
          target.position.x += overlap * (ball.position.x - target.position.x) / distance;
          target.position.y += overlap * (ball.position.y - target.position.y) / distance;
        }
      }
    });
  });

  collidingBalls.forEach((pair)=>{
    let ball1 = pair.first;
    let ball2 = pair.second;

    let distance = Math.sqrt(Math.pow(ball1.position.x - ball2.position.x, 2) + Math.pow(ball1.position.y - ball2.position.y, 2));
    let nx = (ball2.position.x - ball1.position.x) / distance;
    let ny = (ball2.position.y - ball1.position.y) / distance;
    let kx = (ball1.velocity.x - ball2.velocity.x);
    let ky = (ball1.velocity.y - ball2.velocity.y);
    let p = 2 * (nx * kx + ny * ky) / (ball1.mass + ball2.mass);
    ball1.velocity.x = ball1.velocity.x - p * ball2.mass * nx;
    ball1.velocity.y = ball1.velocity.y - p * ball2.mass * ny;
    ball2.velocity.x = ball2.velocity.x + p * ball1.mass * nx;
    ball2.velocity.y = ball2.velocity.y + p * ball1.mass * ny;
  });
}

function render(){
  graphics.clearRect(0, 0, frame.width, frame.height);
  balls.forEach((ball)=>{
    ball.render();
  });
  if(ballSelected != null){
    drawLine();
  }
}

function drawLine(){
  graphics.beginPath();
  graphics.strokeStyle = "#c52ball2d";
  graphics.moveTo(ballSelected.position.x, ballSelected.position.y);
  graphics.lineTo(mouse.x, mouse.y);
  graphics.stroke();
  graphics.closePath();
}

window.addEventListener("mousedown", (event)=>{
  ballSelected = null;
  balls.forEach((ball)=>{
    if(ball.contains(event.x, event.y)){
      mouse.x = event.x;
      mouse.y = event.y;
      ballSelected = ball;
    }
  })
});

window.addEventListener("mousemove", (event)=>{
  if(ballSelected != null){
    mouse.x = event.x;
    mouse.y = event.y;
  }
});

window.addEventListener("mouseup", (event)=>{
  if(ballSelected != null){
    ballSelected.velocity.x = .5 * (ballSelected.position.x - mouse.x);
    ballSelected.velocity.y = .5 * (ballSelected.position.y - mouse.y);
  } 
  ballSelected = null;
});