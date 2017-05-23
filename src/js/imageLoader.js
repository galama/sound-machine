define([
    'cropper',
    'jquery',
    'js/imageParser',
    'text!temps/imageUploader.html'
], function(cropper, $, imageParser, imageUploaderTemplate) {
    'use strict';


    var loadImageToCanvas = function(e) {
        var reader = new FileReader();
        $("#imgwrapper").empty();
        reader.onload = function(event) {
            var img = new Image();
            var button = document.getElementById('processbtn');

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

                var image = document.querySelector('#image');
                var cropper = new Cropper(image, {
                    movable: false,
                    zoomable: false,
                    rotatable: false,
                    scalable: false
                });

                button.onclick = function () {
                    var croppedCanvas;
                    croppedCanvas = cropper.getCroppedCanvas();
                    $("#imgwrapper").empty();
                    jQuery('<img/>', {
                        src: croppedCanvas.toDataURL(),
                        id: "image",
                        class: 'image',
                        style: "width:100%; height:100%"
                    }).appendTo('#imgwrapper');

                    imageParser.process();
                };

                $("#processbtn").prop('disabled', false);
            };

            img.src = event.target.result;

        };
        reader.readAsDataURL(e.target.files[0]);
    };


    var imageLoader = {

        init: function() {

            $("#mainCont").append(imageUploaderTemplate);


            /*** EVENTS ***/
            var fileInput = $("#imageLoader");
            fileInput.on("change", loadImageToCanvas);

        }


        
    };

    return imageLoader;

});