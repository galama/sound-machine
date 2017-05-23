requirejs.config({
    paths: {
        cropper: '../bower_components/cropperjs/dist/cropper.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        text: '../bower_components/text/text'
    },

    deps: ['./app']
});
