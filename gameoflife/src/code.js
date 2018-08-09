var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

frame.addEventListener("mousedown", mousePressed);
frame.addEventListener("click", singleDraw);
frame.addEventListener("mouseup", mouseReleased);
frame.addEventListener("mousemove", mouseMoved);
frame.addEventListener("drag", mouseMoved);

var scale = 10;
var cols = frame.width / scale + 2;
var rows = frame.height / scale + 2;
var cells = [];
var play = true;
var speedLabel = document.getElementById("speedL");
var speed = 50;
var mousePress;
var showDeadCells = false;

onCreate()

function onCreate(){
	graphics.translate(-scale, -scale);
	for(var i = 0; i < cols; i++){
		cells.push([]);
	}
	generateCells();
}

function update(){
	draw();
	if(play){
		var tempArray = getStaticArray();
		for(var i = 1; i < cols - 1; i++){
			for(var j = 1; j < rows - 1; j++){
				var aliveNeighbors = 0;
				for(var k = i - 1; k < i + 2; k++){
					for(var l = j - 1; l < j + 2; l++){
						if(tempArray[k][l].alive && !(k === i && j === l)){
							aliveNeighbors ++;
						}
					}
				}
				cells[i][j].update(aliveNeighbors);
			}
		}
	}
}

function draw(){
	graphics.clearRect(0, 0, frame.width + scale, frame.height + scale);
	for(var i = 1; i < cols - 1; i++){
		for(var j = 1; j < rows - 1; j++){
			cells[i][j].draw();
		}
	}
}

function getStaticArray(){
	var array = [];
	for(var i = 0; i < cols; i++){
		array.push([]);
	}

	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			array[i][j] = new Cell(i * scale, j * scale, scale, cells[i][j].alive);
		}
	}
	return array;
}

function mousePressed(){
	mousePress = true;
}

function mouseReleased(){
	mousePress = false;
}

function singleDraw(){
	var rect = frame.getBoundingClientRect();
	var x = Math.floor((event.clientX - rect.left) / scale);
	var y = Math.floor((event.clientY - rect.top) / scale);
	cells[x + 1][y + 1].alive = true;
}

function mouseMoved(event){
	if(mousePress){
		var rect = frame.getBoundingClientRect();
		var x = Math.floor((event.clientX - rect.left) / scale);
		var y = Math.floor((event.clientY - rect.top) / scale);
		cells[x + 1][y + 1].alive = true;
	}
}

function controlGame(btn){
	if(play){
		play = false;
		btn.value = "Play";
	}
	else{
		play = true;
		btn.value = "Stop";
	}
}

function clearCells(){
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			cells[i][j].alive = false;
			cells[i][j].wasAlive = false;
		}
	}
}

function generateCells(){
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			if(i == 0 || j == 0 || i == cols - 1 || j == rows -1){
				cells[i][j] = new Cell(i * scale, j * scale, scale, false);
			}
			else{
				cells[i][j] = new Cell(i * scale, j * scale, scale, Math.floor(Math.random() * 5) == 1);
			}
		}
	}
}

function increaseSpeed(){
	if(speed > 10){
		speed -= 10;
		speedLabel.innerHTML = "Speed: " + speed + "ms";
		clearInterval(interval);
		interval = setInterval(update, speed);
	}
}

function decreaseSpeed(){
	if(speed < 1000){
		speed += 10;
		speedLabel.innerHTML = "Speed: " + speed + "ms";
		clearInterval(interval);
		interval = setInterval(update, speed);
	}
}

function manageDeadCells(state){
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			cells[i][j].wasAlive = false;
		}
	}
	showDeadCells = state.checked;
}

var interval = setInterval(update, speed);