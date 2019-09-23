function Background(){
	this.backgroundImage = new Image();
	this.backgroundImage.src = "img/void.png";
	this.healthBar = new Image();
	this.healthBar.src = "img/health.png";

	this.world1 = {
		x: 0,
		velocity: 0.5,
		image: new Image()
	}

	this.world2 = {
		x: frame.width,
		velocity: 0.5,
		image: new Image()
	}

	this.startFront1 = {
		x: 0,
		velocity: 2,
		image: new Image()
	}

	this.startFront2 = {
		x: frame.width,
		velocity: 2,
		image: new Image()
	}

	this.startBack1 = {
		x: 0,
		velocity: 1.5,
		image: new Image()
	}

	this.startBack2 = {
		x: frame.width,
		velocity: 1.5,
		image: new Image()
	}

	this.world1.image.src = "img/map1.png";
	this.world2.image.src = "img/map2.png";
	this.startFront1.image.src = "img/starsFront.png";
	this.startFront2.image.src = "img/starsFront.png";
	this.startBack1.image.src = "img/starsBack.png";
	this.startBack2.image.src = "img/starsBack.png";

	this.update = function(){
		if(this.world1.x + frame.width < 0){
			this.world1.x = frame.width;
		}
		if(this.world2.x + frame.width < 0){
			this.world2.x = frame.width;
		}
		if(this.startFront1.x + frame.width < 0){
			this.startFront1.x = frame.width;
		}
		if(this.startFront2.x + frame.width < 0){
			this.startFront2.x = frame.width;
		}
		if(this.startBack1.x + frame.width < 0){
			this.startBack1.x = frame.width;
		}
		if(this.startBack2.x + frame.width < 0){
			this.startBack2.x = frame.width;
		}
		this.world1.x -= this.world1.velocity;
		this.world2.x -= this.world2.velocity;
		this.startFront1.x -= this.startFront1.velocity;
		this.startFront2.x -= this.startFront2.velocity;
		this.startBack1.x -= this.startBack1.velocity;
		this.startBack2.x -= this.startBack2.velocity;
	}

	this.draw = function(){
		graphics.drawImage(this.world1.image, 0, 0, frame.width, frame.height);
		graphics.drawImage(this.world1.image, this.world1.x, 0, frame.width, frame.height);
		graphics.drawImage(this.world2.image, this.world2.x, 0, frame.width, frame.height);
		this.drawHealthBar();
		graphics.drawImage(this.backgroundImage, 0, 0, frame.width, frame.height);
		graphics.drawImage(this.startFront1.image, this.startFront1.x, 0, frame.width, frame.height);
		graphics.drawImage(this.startFront2.image, this.startFront2.x, 0, frame.width, frame.height);
		graphics.drawImage(this.startBack1.image, this.startBack1.x, 0, frame.width, frame.height);
		graphics.drawImage(this.startBack2.image, this.startBack2.x, 0, frame.width, frame.height);
	}

	this.drawHealthBar = function(){
		graphics.drawImage(this.healthBar, 630, 28, 166, 16);
		graphics.fillStyle = "#262a43";
		if(player.hitPoints == 2){
			graphics.fillRect(630, 28, 60, 50);
		}
		else if(player.hitPoints == 1){
			graphics.fillRect(630, 28, 110, 50);
		}
		else if(player.hitPoints <= 0){
			graphics.fillRect(630, 28, 200, 50);
		}
	}
}