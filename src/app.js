define([
    'js/imageLoader',
    'js/player',
    'js/camera'
], function(loader,player,camera) {
    'use strict';

    loader.init();
    player.initialize();
    camera.init();
});