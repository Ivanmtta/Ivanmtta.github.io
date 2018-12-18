var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");
document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);
graphics.imageSmoothingEnabled = false;

const FPS = 12;
var sprites;
var map;
var player;
var inventory;

window.onload = function(){
	sprites = new SpriteLoader();
	map = new Map();
	map.load();
	player = new Player(generateRandom(20, 80), generateRandom(20, 80));
	while(map.getTile(player.x + player.size / 2, player.y + player.size / 2).type == "water"){
		player.x = generateRandom(20, 80);
		player.y = generateRandom(20, 80);
	}
	inventory = new Inventory();
}

function update(){
	player.update();
	map.collideMap(player.x + player.size / 2, player.y + player.size / 2);
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	graphics.translate(-player.x + frame.width / 2, -player.y + frame.height / 2);
	map.draw(player.x + player.size / 2, player.y + player.size / 2);
	player.draw();
	graphics.translate(player.x - frame.width / 2, player.y - frame.height / 2);
	if(inventory.open){
		inventory.draw();
	}
}

function generateRandom(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return (Math.floor(Math.random() * (max - min + 1)) + min) * 50;
}

function keyPressed(event){
	if(event.keyCode == 69){
		inventory.open = !inventory.open;
		if(inventory.open){
			player.left = false;
			player.right = false;
			player.up = false;
			player.down = false;
		}
	}
	if(!inventory.open){
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