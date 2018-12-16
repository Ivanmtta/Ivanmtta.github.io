function Tile(x, y, size, value){

	this.x = x;
	this.y = y;
	this.size = size;
	this.value = value;
	this.colliding = false;
	this.type = "";

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
		if(this.colliding){
			graphics.fillStyle = "#ec5162";
		}
		else if(this.type == "grass"){
			graphics.fillStyle = "#69bf6a";
		}
		else if(this.type == "sand"){
			graphics.fillStyle = "#eedd9b";
		}
		else{
			graphics.fillStyle = "#3991ea";
		}
		graphics.fillRect(x, y, size, size);
		this.colliding = false;
	}
}