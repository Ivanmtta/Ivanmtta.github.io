function Tile(x, y, size, value){

	this.x = x;
	this.y = y;
	this.size = size;
	this.value = value;
	this.type = "";
	this.tics = 0;
	this.render = true;

	if(this.value > 0.40){
		this.type = "grass";
	}
	else if(this.value > 0.25){
		this.type = "sand";
	}
	else{
		this.type = "water";
	}

	this.draw = function(){
		if(this.type == "grass"){
			graphics.drawImage(sprites.grass, this.x, this.y, this.size, this.size);
		}
		else if(this.type == "sand"){
			graphics.drawImage(sprites.sand, this.x, this.y, this.size, this.size);
		}
		else{
			if(this.tics == 2){
				this.render = !this.render;
				this.tics = 0;
			}
			this.tics ++;
			if(this.render){
				graphics.drawImage(sprites.water1, this.x, this.y, this.size, this.size);
			}
			else{
				graphics.drawImage(sprites.water2, this.x, this.y, this.size, this.size);
			}
		}
		this.colliding = false;
	}
}