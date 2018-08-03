var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

graphics.imageSmoothingEnabled = false;
const FPS = 60;

var animationTic = 0; 
var kellyFrame = 0;
var kellyLAnimation = [];
for(var i = 0; i < 4; i++){
	kellyLAnimation[i] = new Image();
}
kellyLAnimation[0].src = "graphics/kellyL1.png";
kellyLAnimation[1].src = "graphics/kellyL2.png";
kellyLAnimation[2].src = "graphics/kellyL3.png";
kellyLAnimation[3].src = "graphics/kellyL4.png";

var kellyRAnimation = [];
for(var i = 0; i < 4; i++){
	kellyRAnimation[i] = new Image();
}
kellyRAnimation[0].src = "graphics/kellyR1.png";
kellyRAnimation[1].src = "graphics/kellyR2.png";
kellyRAnimation[2].src = "graphics/kellyR3.png";
kellyRAnimation[3].src = "graphics/kellyR4.png";

var kelly = {
	size: 160,
	speed: 10,
	x: 100,
	y: 300,
	left: false,
	right: false,
	direction: "right",
	image: new Image()
};

var background = new Image();

background.src = "graphics/background.png";

function update(){
	kellyMovement();
	kellyAnimation();
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	graphics.drawImage(background, 0, 0, frame.width, frame.height);
	graphics.drawImage(kelly.image, kelly.x, kelly.y, kelly.size, kelly.size);
}

function kellyAnimation(){
	if(animationTic == 10){
		if(kelly.direction == "left"){
			kelly.image = kellyLAnimation[kellyFrame];
			kellyFrame ++;
			if(kellyFrame > kellyLAnimation.length - 1){
				kellyFrame = 0;
			}
		}
		else if(kelly.direction == "right"){
			kelly.image = kellyRAnimation[kellyFrame];
			kellyFrame ++;
			if(kellyFrame > kellyRAnimation.length - 1){
				kellyFrame = 0;
			}
		}
		animationTic = 0;
	}
	animationTic ++;
}

function kellyMovement(){
	if(kelly.left && kelly.x > -30){
		kelly.x -= kelly.speed;
	}
	if(kelly.right && kelly.x < 1070){
		kelly.x += kelly.speed;
	}
}

function keyPressed(){
	if(event.keyCode == 65 || event.keyCode == 37){
		kelly.left = true;
		kelly.direction = "left";
	}
	if(event.keyCode == 68 || event.keyCode == 39){
		kelly.right = true;
		kelly.direction = "right";
	}
}

function keyReleased(){
	if(event.keyCode == 65 || event.keyCode == 37){
		kelly.left = false;
	}
	if(event.keyCode == 68 || event.keyCode == 39){
		kelly.right = false;
	}
}

setInterval(update, 1000 / FPS);