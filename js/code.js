var loaded = false;
var firstLoad = true;

window.onload = function(){
	loaded = true;
}

function animation(){
	if(document.body.style.opacity < 1 && loaded){
		if(firstLoad){
			document.body.style.opacity = 0.1;
			firstLoad = false;
			console.log("loaded!");
		}
		document.body.style.opacity = parseFloat(document.body.style.opacity) + 0.1;
		console.log(document.body.style.opacity);
	}
}

setInterval(animation, 1000/30);