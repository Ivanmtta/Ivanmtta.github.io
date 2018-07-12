var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("mousemove", mouseMoved);
document.addEventListener("drag", mouseMoved);
document.addEventListener("click", click);

const FPS = 60;
const bulletSpeed = 8;

var backImage = new Image();

var player = {
	size: 64,
	x: frame.width / 2,
	y: frame.height - 100,
	image: new Image(),
}

var enemy = {
	size: 100,
	x: frame.width / 2,
	y: 0,
	image: new Image(),
}

var bullets = [];

function bullet(x){
	this.x = x;
	this.size = 30;
	this.y = player.y;
	this.image = new Image();
	this.image.src = "bullet.png";
}

backImage.src = "background.png";
player.image.src = "player.png";
enemy.image.src = "enemy.png";

function update(){
	draw();
	removeBullets();
	for(i = 0; i < bullets.length; i++){
		bullets[i].y -= bulletSpeed;
	}
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	drawBackground();
	graphics.drawImage(player.image, player.x, player.y);
	graphics.drawImage(enemy.image, enemy.x, enemy.y);
	for(i = 0; i < bullets.length; i++){
		graphics.drawImage(bullets[i].image, bullets[i].x, bullets[i].y);
	}
}

function drawBackground(){
	graphics.drawImage(backImage, 0, 0);
}

function removeBullets(){
	for(i = 0; i < bullets.length; i++){
		if(bullets[i].y < 0){
			console.log("se fue");
			bullets.shift();
		}
	}
}

function click(){
	bullets.push(new bullet(player.x + player.size / 2));
}

function mouseMoved(){
	player.x = event.clientX - player.size / 2;
}

setInterval(update, 1000 / FPS);