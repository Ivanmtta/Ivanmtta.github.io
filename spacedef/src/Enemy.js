function Enemy(){
	this.size = 46;
	this.y = Math.floor(Math.random() * frame.height);
	this.angle = 0;
	this.velocity = Math.floor(Math.random() * 2) + 2;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.hitPoints = 3;
	this.damageTic = 0;
	this.deathTic = 0;
	this.deathFrame = 0;
	this.takingDamage = false;
	this.canDamage = true;
	this.death = false;
	this.shotTics = 0;
	this.up = false;
	this.down = false;
	this.left = false;
	this.right = false;

	this.update = function(){
		this.checkDeath();
		if(!this.death){
			this.checkBulletCollision();
			this.getDirection();
			this.checkCollisions();
			this.shotBullets();
			if(this.takingDamage){
				this.checkDamage();
			}
			this.angle = -Math.atan2((player.y - player.size / 2) - (this.y - this.size / 2), 
				(player.x - player.size / 2) - (this.x - this.size / 2));
			this.xSpeed = this.velocity * Math.cos(this.angle);
			this.ySpeed = this.velocity * -Math.sin(this.angle);
			if(this.up){
				this.y += this.ySpeed;
			}
			if(this.down){
				this.y += this.ySpeed;
			}
			if(this.left){
				this.x += this.xSpeed;
			}
			if(this.right){
				this.x += this.xSpeed;
			}
		}
	}

	this.draw = function(){
		graphics.save();
		graphics.translate(this.x - this.size / 2, this.y - this.size / 2);
		graphics.rotate(-this.angle);
		graphics.translate(-this.x - this.size / 2, -this.y - this.size / 2);
		if(this.death){
			graphics.drawImage(enemyDeath[this.deathFrame], this.x, this.y, this.size, this.size);
		}
		else if(this.takingDamage){
			graphics.drawImage(enemyDamageImage, this.x, this.y, this.size, this.size);
		}
		else{
			graphics.drawImage(enemyImage, this.x, this.y, this.size, this.size);
		}
		graphics.restore();
	}

	this.shotBullets = function(){
		if(this.shotTics == 60){
			enemyBullets.push(new EnemyBullet(this.x - 23, this.y - 23, player.x - 23, player.y - 23));
			this.shotTics = 0;
		}
		this.shotTics ++;
	}

	this.generateX = function(){
		var randNum = Math.floor(Math.random() * 2);
		if(randNum == 0){
			return -(this.size * 2);
		}
		else{
			return frame.width + (this.size * 2);
		}
	}

	this.getDirection = function(){
		if(this.xSpeed < 0){
			this.right = true;
			this.left = false;
		}
		else{
			this.left = true;
			this.right = false;
		}
		if(this.ySpeed < 0){
			this.down = true;
			this.up = false;
		}
		else{
			this.up = true;
			this.down = false;
		}
	}

	this.checkBulletCollision = function(){
		for(var i = 0; i < player.bullets.length; i++){
			var hb1 = player.bullets[i];
			if(hb1.x < this.x &&
				hb1.x + hb1.size > this.x - this.size &&
				hb1.y < this.y &&
				hb1.y + hb1.size > this.y - this.size){
				player.bullets.splice(player.bullets.indexOf(player.bullets[i]), 1);
				if(this.canDamage && !this.death){
					this.hitPoints --;
					this.takingDamage = true;
					this.canDamage = false;
				}
			}
		}
	}

	this.checkDamage = function(){
		if(this.damageTic == 5){
			this.damageTic = 0;
			this.takingDamage = false;
			this.canDamage = true;
		}
		this.damageTic ++;
	}

	this.checkCollisions = function(){
		for(var i = 0; i < enemies.length; i++){
			if(this.contains(enemies[i].getTopLeft()) || this.contains(enemies[i].getTopRight())){
				this.up = false;
			}
			if(this.contains(enemies[i].getBotLeft()) || this.contains(enemies[i].getBotRight())){
				this.down = false;
			}
			if(this.contains(enemies[i].getLeftTop()) || this.contains(enemies[i].getLeftBot())){
				this.left = false;
			}
			if(this.contains(enemies[i].getRightTop()) || this.contains(enemies[i].getRightBot())){
				this.right = false;
			}
		}
	}

	this.checkDeath = function(){
		if(this.hitPoints == 0){
			if(this.deathTic == 10){
				if(this.deathFrame == 0){					
					score ++;
				}
				this.deathFrame ++;
				if(this.deathFrame == 4){		
					enemies.splice(enemies.indexOf(this), 1);
				}
				this.deathTic = 0;
			}
			this.deathTic ++;
			this.death = true;
		}
	}

	this.contains = function(point){
		return this.x <= point.x && point.x <= this.x + this.size &&
			this.y <= point.y && point.y <= this.y + this.size;
	}

	this.getTopLeft = function(){
		var point2D = {
			x: this.x,
			y: this.y - this.velocity
		};
		return point2D;
	}

	this.getTopRight = function(){
		var point2D = {
			x: this.x + this.size,
			y: this.y - this.velocity
		};
		return point2D;
	}

	this.getBotLeft = function(){
		var point2D = {
			x: this.x,
			y: this.y + this.size + this.velocity
		};
		return point2D;
	}

	this.getBotRight = function(){
		var point2D = {
			x: this.x + this.size,
			y: this.y + this.size + this.velocity
		};
		return point2D;
	}

	this.getLeftTop = function(){
		var point2D = {
			x: this.x - this.velocity,
			y: this.y
		};
		return point2D;
	}

	this.getLeftBot = function(){
		var point2D = {
			x: this.x - this.velocity,
			y: this.y + this.size
		};
		return point2D;
	}

	this.getRightTop = function(){
		var point2D = {
			x: this.x + this.size + this.velocity,
			y: this.y
		};
		return point2D;
	}

	this.getRightBot = function(){
		var point2D = {
			x: this.x + this.size + this.velocity,
			y: this.y + this.size
		};
		return point2D;
	}

	this.x = this.generateX();
}