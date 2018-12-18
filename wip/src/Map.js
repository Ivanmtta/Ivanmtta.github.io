function Map(){

	this.dimension = 100;
	this.scale = 50;
	this.noiseIncrease = 0.03;
	this.map = [];

	this.load = function(){
		noise.seed(Math.random());
		for(var i = 0; i < this.dimension; i++){
			this.map.push([]);
		}
		var noiseY = 0;
		for(var i = 0; i < this.dimension; i++){
			var noiseX = 0;
			for(var j = 0; j < this.dimension; j++){	
				var r = noise.simplex2(noiseX, noiseY);
				this.map[i][j] = new Tile(i * this.scale, j * this.scale, this.scale, r);
				noiseX += this.noiseIncrease;
			}
			noiseY += this.noiseIncrease;
		}
	}

	this.draw = function(x, y){
		for(var i = 0; i < this.map.length; i++){
			for(var j = 0; j < this.map[0].length; j++){
				this.map[i][j].draw();
			}
		}
	}

	this.collideMap = function(x, y){
		x = Math.floor(x / this.scale);
		y = Math.floor(y / this.scale);
		player.freeUp = true;
		player.freeDown = true;
		player.freeLeft = true;
		player.freeRight = true;
		if(this.map[x + 1][y].type == "water"){
			player.freeRight = false;
		}
		if(this.map[x - 1][y].type == "water"){
			player.freeLeft = false;
		}
		if(this.map[x][y - 1].type == "water"){
			player.freeUp = false;
		}
		if(this.map[x][y + 1].type == "water"){
			player.freeDown = false;
		}
	}

	this.getTile = function(x, y){
		x = Math.floor(x / this.scale);
		y = Math.floor(y / this.scale);
		return this.map[x][y];
	}
}