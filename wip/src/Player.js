function Player(){

	this.x = frame.width / 2;
	this.y = frame.height / 2;
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
		if(this.up && this.freeUp){
			this.y -= this.speed;
		}
		if(this.down && this.freeDown){
			this.y += this.speed;
		}
		if(this.left && this.freeLeft){
			this.x -= this.speed;
		}
		if(this.right && this.freeRight){
			this.x += this.speed;
		}
	}

	this.draw = function(){
		graphics.fillStyle = "#3e2843";
		graphics.fillRect(this.x, this.y, this.size, this.size);
	}
}