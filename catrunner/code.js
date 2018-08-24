var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("mousedown", click);
graphics.imageSmoothingEnabled = false;

const FPS = 60;

var points = 0;
var scoreTime = 0;

var playerAnimation = [];
for(var i = 0; i < 5; i++){
	playerAnimation[i] = new Image();
}
playerAnimation[0].src = "Graphics/player1.png";
playerAnimation[1].src = "Graphics/player2.png";
playerAnimation[2].src = "Graphics/player3.png";
playerAnimation[3].src = "Graphics/player4.png";
playerAnimation[4].src = "Graphics/player5.png";


var dogAnimation = [];
for(var i = 0; i < 5; i++){
	dogAnimation[i] = new Image();
}
dogAnimation[0].src = "Graphics/dog1.png";
dogAnimation[1].src = "Graphics/dog2.png";
dogAnimation[2].src = "Graphics/dog3.png";
dogAnimation[3].src = "Graphics/dog4.png";
dogAnimation[4].src = "Graphics/dog5.png";

var spawnTime = 0;
var animationTime = 0;
var playerFrame = 0;
var dogFrame = 0;
var dogs = [];
var backImage = new Image();
var replayImage = new Image();

var player = {
	size: 64,
	x: 400,
	y: 250,
	jumping: false,
	falling: true,
	maxJumpSpeed: 0,
	jumpOriginalValue: 12,
	jumpSpeed: 12,
	jumpAcceleration: 0.4,
	fallSpeed: 0,
	fallAcceleration: 0.6,
	alive: false,
	image: new Image(),
	light: new Image()
};

var building1 = {
	x: 0,
	y: 400,
	size: 2313,
	speed: 4,
	image: new Image()
};

var building2 = {
	x: 2314,
	y: 400,
	size: 1155,
	speed: 4,
	image: new Image()
};

var fish = {
	x: 1032,
	y: 125,
	size: 32,
	xSpeed: 2,
	ySpeed: 4,
	image: new Image()
};

function dog(x){
	this.x = x;
	this.y = 400-64;
	this.size = 64;
	this.speed = 6;
	this.image = new Image();
}

replayImage.src = "Graphics/replay.png";
backImage.src = "Graphics/background.png";
player.light.src = "Graphics/light.png";
building1.image.src = "Graphics/building1.png";
building2.image.src = "Graphics/building2.png";
fish.image.src = "Graphics/fish.png";

function update(){
	draw();
	if(player.alive){
		updatePlayer();
		updateBuilding();
		updateFish();
		updateDogs();
		checkBottomCollision();
		checkPlayerCollision();
		trackTime();
	}
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	graphics.drawImage(backImage, 0, 0, frame.width, frame.height);
	graphics.drawImage(building1.image, building1.x, building1.y);
	graphics.drawImage(building2.image, building2.x, building2.y);
	graphics.drawImage(fish.image, fish.x, fish.y);
	graphics.drawImage(player.light, player.x - 15, player.y - 15);
	graphics.drawImage(player.image, player.x, player.y);
	graphics.font = "bold 40px Helvetica";
	graphics.fillStyle = "white";
	graphics.textAlign = "center";
	graphics.fillText(points, frame.width / 2, 100);
	drawDogs();
	if(!player.alive){
		graphics.drawImage(replayImage, 0, 0);
	}
}

function drawDogs(){
	for(i = 0; i < dogs.length; i++){
		graphics.drawImage(dogs[i].image, dogs[i].x, dogs[i].y);
	}
}

function updateFish(){
	if(fish.y <= 125){
		fish.ySpeed = 4;
	}
	if(fish.y >= 275){
		fish.ySpeed = - 4;
	}
	if(fish.x + fish.size < 0){
		fish.x = 1032;
	}
	fish.x -= fish.xSpeed;
	fish.y += fish.ySpeed;
}

function checkBottomCollision(){
	if(player.y + player.size >= building1.y){
		player.y = building1.y - player.size;
		player.falling = false;
		player.fallSpeed = 0;
		player.jumpSpeed = player.jumpOriginalValue;
	}
}

function checkPlayerCollision(){
	var reduction = 10;
	for(i = 0; i < dogs.length; i++){
		var testDog = dogs[i];
		if(testDog.x + reduction < player.x + player.size - reduction &&
			testDog.x + testDog.size - reduction > player.x + reduction &&
			testDog.y + reduction < player.y + player.size - reduction &&
			testDog.y + testDog.size - reduction > player.y + reduction){
			player.alive = false;
		}
	}
	reduction = 5;
	if(fish.x + reduction < player.x + player.size - reduction &&
		fish.x + fish.size - reduction > player.x + reduction &&
		fish.y + reduction < player.y + player.size - reduction &&
		fish.y + fish.size - reduction > player.y + reduction){
		fish.x = 1100;
		points += 10;
	}
}

function updatePlayer(){
	if(player.jumping){
		if(player.jumpSpeed > player.maxJumpSpeed){
			player.y -= player.jumpSpeed;
			player.jumpSpeed -= player.jumpAcceleration;
		}
		else{
			player.jumpSpeed = player.jumpOriginalValue;
			player.jumping = false;
			player.falling = true;
		}
	}
	else if(player.falling){
		player.y += player.fallSpeed;
		player.fallSpeed += player.fallAcceleration;
	}
}

function updateBuilding(){
	if(building1.x + building1.size < 0){
		building1.x = building2.x + building2.size;
	}
	if(building2.x + building2.size < 0){
		building2.x = building1.x + building1.size;
	}
	building1.x -= building1.speed;
	building2.x -= building2.speed;
}

function updateDogs(){
	if(spawnTime == 100){
		generatePacksOfDogs();
		spawnTime = 0;
	}
	spawnTime ++;
	for(i = 0; i < dogs.length; i++){
		if(dogs[i].x + dogs[i].size < 0){
			dogs.splice(i, 1);
		}
		dogs[i].x -= dogs[i].speed;
	}
}

function generatePacksOfDogs(){
	var numDogs = Math.floor(Math.random() * 3);
	switch(numDogs){
		case 0:
			dogs.push(new dog(frame.width));
			break;
		case 1:
			dogs.push(new dog(frame.width));
			dogs.push(new dog(frame.width + 70));
			break;
		case 2:
			dogs.push(new dog(frame.width));
			dogs.push(new dog(frame.width + 70));
			dogs.push(new dog(frame.width + 140));
			break;
	}
}

function trackTime(){
	if(animationTime == 6){
		managePlayerAnimation();
		manageDogAnimation();
		animationTime = 0;
	}
	if(scoreTime == 100){
		points ++;
		scoreTime = 0;
	}
	animationTime ++;
	scoreTime ++;
}

function managePlayerAnimation(){
	if(player.jumping){
		player.image = playerAnimation[3];
	}
	else if(player.falling){
		player.image = playerAnimation[3];
	}
	else{
		player.image = playerAnimation[playerFrame];
		playerFrame ++;
		if(playerFrame > playerAnimation.length - 1){
			playerFrame = 0;
		}
	}
}

function manageDogAnimation(){
	for(i = 0; i < dogs.length; i++){
		dogs[i].image = dogAnimation[dogFrame];
	}
	dogFrame ++;
	if(dogFrame > dogAnimation.length - 1){
		dogFrame = 0;
	}
}

function restartGame(){
	player.alive = true;
	fish.x = 1032;
	points = 0;
	dogs = [];
}

function click(){
	if(player.alive){
		if(!player.jumping && !player.falling){
			player.jumping = true;
		}
	}
	else{
		restartGame();
		firstDog = true;
	}
}

setInterval(update, 1000 / FPS);
