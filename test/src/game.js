var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("mousedown", mousePressed);
document.addEventListener("mouseup", mouseReleased);
document.addEventListener("mousemove", mouseMoved);
document.addEventListener("drag", mouseMoved);
graphics.imageSmoothingEnabled = false;

window.onload = onCreate;

const FPS = 60;
const FRICTION = 1;

var background;
var player;
var mouse = {
	x: 0,
	y: 0
};

var enemyImage = new Image();
enemyImage.src = "img/enemy.png";
var enemy = [];

function onCreate(){
	background = new Background();
	player = new Player();
	enemy.push(new Enemy());
}

function update(){
	background.update();
	player.update();
	for(var i = 0; i < enemy.length; i++){
		enemy[i].update();
	}
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	background.draw();
	player.draw();
	for(var i = 0; i < enemy.length; i++){
		enemy[i].draw();
	}
}

function mousePressed(){
	player.thrusting = true;
	player.shooting = true;
}

function mouseReleased(){
	player.thrusting = false;
	player.shooting = false;
}

function mouseMoved(event){
	mouse.x = event.x;
	mouse.y = event.y;
	player.calculateAngles();
}

setInterval(update, 1000 / FPS);