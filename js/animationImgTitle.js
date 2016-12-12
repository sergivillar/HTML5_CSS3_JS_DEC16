var image = document.getElementById("title-img-animation");

image.addEventListener("mousemove", function(event) {
	image.style.backgroundPosition = event.pageX * -1 / 12 + "px " + event.pageY * -1 / 12 + "px";
});

image.addEventListener("mouseleave", function() {
	image.style.backgroundPosition = "center center";
});