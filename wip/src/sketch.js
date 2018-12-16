var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

const FPS = 10;
var map = new Map();
var player = new Player();

window.onload = function(){
	map.load();
}

function update(){
	player.update();
	map.collideMap(player.x + player.size / 2, player.y + player.size / 2);
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	graphics.translate(-player.x + frame.width / 2, -player.y + frame.height / 2);
	map.draw();
	player.draw();
	graphics.translate(player.x - frame.width / 2, player.y - frame.height / 2);
}

function keyPressed(event){
	if(event.keyCode == 87){
		player.up = true;
	}
	if(event.keyCode == 83){
		player.down = true;
	}
	if(event.keyCode == 65){
		player.left = true;
	}
	if(event.keyCode == 68){
		player.right = true;
	}
}

function keyReleased(event){
	if(event.keyCode == 87){
		player.up = false;
	}
	if(event.keyCode == 83){
		player.down = false;
	}
	if(event.keyCode == 65){
		player.left = false;
	}
	if(event.keyCode == 68){
		player.right = false;
	}
}

setInterval(update, 1000 / FPS);