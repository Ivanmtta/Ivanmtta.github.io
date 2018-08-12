function Background(){
	this.backgroundImage = new Image();
	this.backgroundImage.src = "img/background.png";

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
		velocity: 1,
		image: new Image()
	}

	this.startBack2 = {
		x: frame.width,
		velocity: 1,
		image: new Image()
	}

	this.startFront1.image.src = "img/starsFront.png";
	this.startFront2.image.src = "img/starsFront.png";
	this.startBack1.image.src = "img/starsBack.png";
	this.startBack2.image.src = "img/starsBack.png";

	this.update = function(){
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
		this.startFront1.x -= this.startFront1.velocity;
		this.startFront2.x -= this.startFront2.velocity;
		this.startBack1.x -= this.startBack1.velocity;
		this.startBack2.x -= this.startBack2.velocity;
	}

	this.draw = function(){
		graphics.drawImage(this.backgroundImage, 0, 0, frame.width, frame.height);
		graphics.drawImage(this.startFront1.image, this.startFront1.x, 0, frame.width, frame.height);
		graphics.drawImage(this.startFront2.image, this.startFront2.x, 0, frame.width, frame.height);
		graphics.drawImage(this.startBack1.image, this.startBack1.x, 0, frame.width, frame.height);
		graphics.drawImage(this.startBack2.image, this.startBack2.x, 0, frame.width, frame.height);
	}
}