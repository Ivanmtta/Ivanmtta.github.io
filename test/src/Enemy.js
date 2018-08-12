function Enemy(x, y){
	this.size = 46;
	this.y = Math.floor(Math.random() * frame.height);
	this.angle = 0;
	this.velocity = Math.floor(Math.random() * 2) + 2;
	this.xSpeed = 0;
	this.ySpeed = 0;

	this.update = function(){
		this.angle = -Math.atan2((player.y - player.size / 2) - (this.y - this.size / 2), (player.x - player.size / 2) - (this.x - this.size / 2));
		this.xSpeed = this.velocity * Math.cos(this.angle);
		this.ySpeed = this.velocity * Math.sin(this.angle);
		this.x += this.xSpeed;
		this.y -= this.ySpeed;
	}

	this.draw = function(){
		graphics.save();
		graphics.translate(this.x - this.size / 2, this.y - this.size / 2);
		graphics.rotate(-this.angle);
		graphics.translate(-this.x - this.size / 2, -this.y - this.size / 2);
		graphics.drawImage(enemyImage, this.x, this.y, this.size, this.size);
		graphics.restore();
	}

	this.generateX = function(){
		var randNum = Math.floor(Math.random() * 2);
		if(randNum == 0){
			return - (this.size * 2);
		}
		else{
			return frame.width + (this.size * 2);
		}
	}

	this.x = this.generateX();
}