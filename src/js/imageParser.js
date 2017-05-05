$("#processbtn").prop('disabled', true);

loadImageToCanvas = function(e) {
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        
        img.onload = function() {

			var me = this;

			jQuery('<img/>', {
				src: event.target.result,
				id: "image",
				class: 'image',
				style: "width:100%; height:100%"
			}).appendTo('#imgwrapper');

			$("#imgwrapper")
				.width(me.width)
				.height(me.height)
				.resizable()
				.draggable();

            $("#processbtn").prop('disabled', false);
        };

        img.src = event.target.result;

    };
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
});

$("#canvas")
.mouseover(function() {
	$(this).css('z-index', 10);
})
.mouseout(function() {
	$(this).css('z-index', -10);
});