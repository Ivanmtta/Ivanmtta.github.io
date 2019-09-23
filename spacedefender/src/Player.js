function Player(){
	this.size = 46;
	this.x = frame.width / 2 + this.size / 2;
	this.y = frame.height / 2 + this.size / 2;
	this.angle = 0;
	this.velocity = 10;
	this.thrusting = false;
	this.shooting = false;
	this.thrust = {
		x: 0,
		y: 0
	};
	this.playerNormal = new Image();
	this.playerNormal.src = "img/player.png";
	this.playerThrusting = new Image();
	this.playerThrusting.src = "img/playerThrust.png";
	this.playerDamage = new Image();
	this.playerDamage.src = "img/playerDamage.png";
	this.bullets = [];
	this.shootingTics = 0;
	this.hitPoints = 3;
	this.damage = false;
	this.damageTic = 0;
	this.canTakeDamage = true;

	this.damageSound = document.getElementById("eDamage");
	this.deathSound = document.getElementById("pDeath");
	this.shootingSound = document.getElementById("las");
	this.shootingSound.volume = 0.2;

	this.update = function(){
		this.checkCollisions();
		this.calculateAngles();
		this.handlePlayerMovement();
		this.handleEdges();
		this.handleShooting();
		this.checkDeath();
		this.handleDamage();
		for(var i = 0; i < this.bullets.length; i++){
			this.bullets[i].update();
		}
	}

	this.draw = function(){
		for(var i = 0; i < this.bullets.length; i++){
			this.bullets[i].draw();
		}
		graphics.save();
		graphics.translate(this.x - this.size / 2, this.y - this.size / 2);
		graphics.rotate(-this.angle);
		graphics.translate(-this.x - this.size / 2, -this.y - this.size / 2);
		if(this.damage){
			graphics.drawImage(this.playerDamage, this.x, this.y, this.size, this.size);
		}
		else if(this.thrusting){
			graphics.drawImage(this.playerThrusting, this.x, this.y, this.size, this.size);
		}
		else{
			graphics.drawImage(this.playerNormal, this.x, this.y, this.size, this.size);
		}
		graphics.restore();
	}

	this.handleShooting = function(){
		if(this.shooting){
			if(this.shootingTics == 5){
				this.shootingSound.play();
				this.bullets.push(new Bullet(this.x - this.size / 2 - 5, this.y - this.size / 2 - 5, mouse.x, mouse.y));
				this.shootingTics = 0;
			}
			this.shootingTics ++;
		}
	}

	this.handlePlayerMovement = function(){
		if(this.thrusting){
			this.thrust.x += this.velocity * Math.cos(this.angle) / FPS;
			this.thrust.y -= this.velocity * Math.sin(this.angle) / FPS;
		}
		else{
			this.thrust.x -= FRICTION * this.thrust.x / FPS;
			this.thrust.y -= FRICTION * this.thrust.y / FPS;
		}
		this.x += this.thrust.x;
		this.y += this.thrust.y;
	}

	this.calculateAngles = function(){
		this.angle = -Math.atan2(mouse.y - (this.y - this.size / 2), mouse.x - (this.x - this.size / 2));
	}

	this.handleEdges = function(){
		if(this.x + this.size < 0){
			this.x = frame.width;
		}
		if(this.x - this.size > frame.width){
			this.x = 0;
		}
		if(this.y + this.size < 0){
			this.y = frame.height;
		}
		if(this.y - this.size > frame.height){
			this.y = 0;
		}
	}

	this.handleDamage = function(){
		if(this.damageTic == 5){
			this.damageTic = 0;
			this.canTakeDamage = true;
			this.damage = false;
		}
		this.damageTic ++;
	}

	this.checkCollisions = function(){
		for(var i = 0; i < enemies.length; i++){
			if(this.x < enemies[i].x + enemies[i].size &&
				this.x + this.size > enemies[i].x &&
				this.y < enemies[i].y + enemies[i].size &&
				this.y + this.size > enemies[i].y && enemies[i].hitPoints > 0 && this.canTakeDamage){
				enemies[i].hitPoints = 0;
				this.canTakeDamage = false;
				this.damage = true;
				this.hitPoints --;
				this.damageSound.play();
			}
		}
		for(var i = 0; i < enemyBullets.length; i++){
			if(this.x - this.size < enemyBullets[i].x + enemyBullets[i].size &&
				this.x - this.size + this.size > enemyBullets[i].x &&
				this.y - this.size < enemyBullets[i].y + enemyBullets[i].size &&
				this.y - this.size + this.size > enemyBullets[i].y && this.canTakeDamage){
				enemyBullets.splice(i, 1);
				this.canTakeDamage = false;
				this.damage = true;
				this.hitPoints --;
				this.damageSound.play();
			}
		}
	}

	this.checkDeath = function(){
		if(this.hitPoints <= 0){
			this.deathSound.play();
			gameOver = true;
		}
	}
}