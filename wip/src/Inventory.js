function Inventory(){

	this.width = 500;
	this.height = 400;
	this.open = false;
	this.slots = [];

	for(var i = 0; i < 5; i++){
		this.slots.push([]);
	}

	for(var i = 0; i < 5; i++){
		for(var j = 0; j < 5; j++){
			this.slots[i][j] = new Slot(i * 100, j * 100);
		}
	}

	this.draw = function(){
		graphics.fillStyle = "#423839";
		graphics.fillRect((frame.width/2) - (this.width/2), (frame.height/2) - (this.height/2), this.width, this.height);

		for(var i = 0; i < this.slots.length; i++){
			for(var j = 0; j < this.slots[0].length; j++){
				this.slots[i][j].draw();
			}
		}
	}
}