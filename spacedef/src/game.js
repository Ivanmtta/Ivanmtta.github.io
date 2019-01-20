var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

frame.addEventListener("mousedown", mousePressed);
frame.addEventListener("mouseup", mouseReleased);
frame.addEventListener("mousemove", mouseMoved);
frame.addEventListener("drag", mouseMoved);
graphics.imageSmoothingEnabled = false;

const FPS = 60;
const FRICTION = 1;

var background = new Background();
var player = new Player();
var mouse = {
	x: 0,
	y: 0
};
var tics = 120;
var gameOver = true;
var score = 0;
var musicPlaying = false;
var backgroundMusic = document.getElementById("backMusic");

var gameOverImage = new Image();
gameOverImage.src = "img/gameOver.png";
var enemyImage = new Image();
enemyImage.src = "img/enemy.png";
var enemyDamageImage = new Image();
enemyDamageImage.src = "img/enemyDamage.png";
var bulletImage = new Image();
bulletImage.src = "img/bullet.png";
var enemyBulletImage = new Image();
enemyBulletImage.src = "img/enemyBullet.png";
var enemyDeath = [];
for(var i = 0; i < 4; i++){
	enemyDeath[i] = new Image();
}
enemyDeath[0].src = "img/enemyDeath1.png";
enemyDeath[1].src = "img/enemyDeath2.png";
enemyDeath[2].src = "img/enemyDeath3.png";
enemyDeath[3].src = "img/enemyDeath4.png";
var enemies = [];
var enemyBullets = [];

function update(){
	if(!gameOver){
		generateEnemies();
		background.update();
		player.update();
		for(var i = 0; i < enemyBullets.length; i++){
			enemyBullets[i].update();
		}
		for(var i = 0; i < enemies.length; i++){
			enemies[i].update();
		}
	}
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	background.draw();
	drawScore();
	for(var i = 0; i < enemyBullets.length; i++){
		enemyBullets[i].draw();
	}
	for(var i = 0; i < enemies.length; i++){
		enemies[i].draw();
	}
	player.draw();
	if(gameOver){
		graphics.drawImage(gameOverImage, 0, 0, frame.width, frame.height);
	}
}

function drawScore(){
	graphics.font = "bold 30px Helvetica";
	graphics.fillStyle = "white";
	graphics.textAlign = "center";
	graphics.fillText(score, frame.width / 2 - 80, 46);
}

function restardGame(){
	player.x = frame.width / 2 + player.size / 2;
	player.y = frame.height / 2 + player.size / 2;
	player.hitPoints = 3;
	player.canTakeDamage = true;
	player.bullets = [];
	enemies = [];
	enemyBullets = [];
	score = 0;
}

function generateEnemies(){
	if(tics >= 150 && enemies.length <= 50){
		enemies.push(new Enemy());
		tics = 0;
	}
	tics ++;
}

function mousePressed(){
	if(!musicPlaying){
		backgroundMusic.play();
		musicPlaying = true;
	}
	if(!gameOver){
		player.thrusting = true;
		player.shooting = true;
	}
	else{
		gameOver = false;
		restardGame();
	}
}

function mouseReleased(){
	if(!gameOver){
		player.thrusting = false;
		player.shooting = false;
	}
}

function mouseMoved(event){
	var rect = frame.getBoundingClientRect();
	mouse.x = event.clientX - rect.left;
	mouse.y = event.clientY - rect.top;
}

setInterval(update, 1000 / FPS);