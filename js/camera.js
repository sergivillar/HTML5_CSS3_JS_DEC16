window.addEventListener("DOMContentLoaded", function(event) {
	//initialiceCamera();
});

function initialiceCamera() {
	var video = document.getElementById("video");
	var videoObj = { "video": true };
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	var errBack = function (error) {
		console.log("Video capture error: ", error.code); 
	};

	if (navigator.getUserMedia) {
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}

	document.getElementById("snap").addEventListener("click", function(event) {
		context.drawImage(video, 0, 0, 600, 400);
	});
}