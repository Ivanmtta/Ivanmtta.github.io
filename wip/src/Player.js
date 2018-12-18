function Player(x, y){

	this.x = x;
	this.y = y;
	this.size = 50;
	this.speed = 50;
	this.up = false;
	this.down = false;
	this.left = false;
	this.right = false;
	this.freeUp = true;
	this.freeDown = true;
	this.freeLeft = true;
	this.freeRight = true;

	this.update = function(){
		if(this.up && this.freeUp && this.y > map.scale){
			this.y -= this.speed;
		}
		if(this.down && this.freeDown && this.y < (map.dimension * map.scale - (map.scale * 2))){
			this.y += this.speed;
		}
		if(this.left && this.freeLeft && this.x > map.scale){
			this.x -= this.speed;
		}
		if(this.right && this.freeRight && this.x < (map.dimension * map.scale - (map.scale * 2))){
			this.x += this.speed;
		}
	}

	this.draw = function(){
		graphics.drawImage(sprites.playerIdle, this.x, this.y, this.size, this.size);
	}
}