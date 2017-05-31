requirejs.config({
    paths: {
        cropper: '../bower_components/cropperjs/dist/cropper.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        text: '../bower_components/text/text',
        tone: '../bower_components/tone/build/Tone.min'
    },

    deps: ['./app']
});
