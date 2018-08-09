function Cell(x, y, size, alive){
	this.x = x;
	this.y = y;
	this.size = size;
	this.alive = alive;
	this.wasAlive = false;

	this.update = function(aliveNeighbors){
		if(this.alive && (aliveNeighbors < 2 || aliveNeighbors > 3)){
			this.alive = false;
			this.wasAlive = true;
		}
		else if(!this.alive && (aliveNeighbors == 3)){
			this.alive = true;
		}
	}

	this.draw = function(){
		graphics.beginPath();
		graphics.rect(this.x, this.y, this.size, this.size);
		if(this.alive){
			graphics.fillStyle = "#FFFFFF";
		}
		else if(this.wasAlive && showDeadCells){
			graphics.fillStyle = "#636363";
		}
		else{
			graphics.fillStyle = "#1a1a1a";
		}
		graphics.lineWidth = this.size / 10;
		graphics.fill();
		graphics.stroke();
		graphics.closePath();
	}
}