document.getElementById("video-batman").addEventListener("click" , function(event) {
	launchFullScreen(this);
	this.play();
});

document.getElementById("video-batman").addEventListener("ended", function(event){
	exitFullScreen();
});

function launchFullScreen(element) {
	if (element.requesFullScreen) {
		element.requesFullScreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

function exitFullScreen() {
	if (document.exitFullScreen) {
		document.exitFullScreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if(document.msExitFullscreen) {
		document.msExitFullscreen();
	}
}