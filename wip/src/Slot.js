function Slot(x, y){
	
	this.available = true;
	this.x = x;
	this.y = y;
	this.width = 75;
	this.height = 75;

	this.draw = function(){
		graphics.fillStyle = "#726566";
		graphics.fillRect(this.x, this.y, this.width, this.height);
	}
}