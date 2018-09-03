function Bullet(initialX, initialY, targetX, targetY){
	this.x = initialX;
	this.y = initialY;
	this.size = 10;
	this.theta = Math.atan2(targetY - initialY, targetX - initialX);
	this.velocity = 10;
	this.xSpeed = Math.cos(this.theta) * this.velocity;
	this.ySpeed = Math.sin(this.theta) * this.velocity;

	this.update = function(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.checkBorders();
	}

	this.draw = function(){
		graphics.drawImage(bulletImage, this.x, this.y, this.size, this.size);
	}

	this.checkBorders = function(){
		if(this.x < -this.size || this.x > frame.width + this.size ||
			this.y < - this.size || this.y > frame.height + this.size){
			player.bullets.splice(player.bullets.indexOf(this), 1);
		}
	}
}