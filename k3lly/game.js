var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

graphics.imageSmoothingEnabled = false;
const FPS = 60;

var background = new Image();
background.src = "graphics/background.png";

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

var samFrame = 0;
var samLAnimation = [];
for(var i = 0; i < 4; i++){
	samLAnimation[i] = new Image();
}
samLAnimation[0].src = "graphics/samL1.png";
samLAnimation[1].src = "graphics/samL2.png";
samLAnimation[2].src = "graphics/samL3.png";
samLAnimation[3].src = "graphics/samL4.png";

var samRAnimation = [];
for(var i = 0; i < 4; i++){
	samRAnimation[i] = new Image();
}
samRAnimation[0].src = "graphics/samR1.png";
samRAnimation[1].src = "graphics/samR2.png";
samRAnimation[2].src = "graphics/samR3.png";
samRAnimation[3].src = "graphics/samR4.png";

var kelly = {
	size: 160,
	speed: 6,
	x: 100,
	y: 300,
	left: false,
	right: false,
	direction: "right",
	moving: false,
	image: new Image()
};

var sam = {
	size: 160,
	speed: 2,
	x: 1000,
	y: 300,
	direction: "left",
	moving: false,
	image: new Image()
};

function update(){
	kellyMovement();
	samMovement();
	animations();
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	graphics.drawImage(background, 0, 0, frame.width, frame.height);
	graphics.drawImage(kelly.image, kelly.x, kelly.y, kelly.size, kelly.size);
	graphics.drawImage(sam.image, sam.x, sam.y, sam.size, sam.size);
}

function kellyMovement(){
	if(kelly.left && kelly.x > -40){
		kelly.x -= kelly.speed;
	}
	if(kelly.right && kelly.x < 1080){
		kelly.x += kelly.speed;
	}
}

function samMovement(){
	if(sam.x < kelly.x - 80){
		sam.x += sam.speed;
		sam.moving = true;
		sam.direction = "right";
	}
	else if(sam.x > kelly.x + 80){
		sam.x -= sam.speed;
		sam.moving = true;
		sam.direction = "left";
	}
	else{
		sam.moving = false;
	}
}

function animations(){
	if(animationTic == 10){
		kellyAnimation();
		samAnimation();
		animationTic = 0;
	}
	animationTic ++;
}

function kellyAnimation(){
	if(!kelly.left && !kelly.right){
		if(kelly.direction == "left"){
			kelly.image = kellyLAnimation[0];
		}
		else{
			kelly.image = kellyRAnimation[0];	
		}
	}
	else if(kelly.direction == "left"){
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

function samAnimation(){
	if(!sam.moving){
		if(sam.direction == "left"){
			sam.image = samLAnimation[0];
		}
		else{
			sam.image = samRAnimation[0];
		}
	}
	else{
		if(sam.direction == "left"){
			sam.image = samLAnimation[samFrame];
			samFrame++;
			if(samFrame > samLAnimation.length - 1){
				samFrame = 0;
			}
		}
		else{
			sam.image = samRAnimation[samFrame];
			samFrame++;
			if(samFrame > samRAnimation.length - 1){
				samFrame = 0;
			}
		}
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