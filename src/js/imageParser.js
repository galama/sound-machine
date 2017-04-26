
loadImageToCanvas = function(e) {
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        
        img.onload = function() {

			jQuery('<img/>', {
				src: event.target.result,
				class: 'image',
				style: 'width:' + this.width +'px; height:' + this.width + 'px;'
			}).appendTo('#canvas')
			.resizable()
			.draggable();
        }

        img.src = event.target.result;

    }
    reader.readAsDataURL(e.target.files[0]);
};

/*** EVENTS ***/
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', loadImageToCanvas, false);

$("#svg")
.mouseout(function() {
	$("#canvas").css('z-index', -10);
})
.mouseover(function() {
	$("#canvas").css('z-index', 10);
})

$("#canvas")
.mouseover(function() {
	$(this).css('z-index', 10);
})
.mouseout(function() {
	$(this).css('z-index', -10);
});