var loaded = false;
var firstLoad = true;

imageF.onload = function(){
	loaded = true;
}

function animation(){
	if(document.body.style.opacity < 1 && loaded){
		if(firstLoad){
			document.body.style.opacity = 0.1;
			firstLoad = false;
		}
		document.body.style.opacity = parseFloat(document.body.style.opacity) + 0.1;
	}
}

setInterval(animation, 1000/30);