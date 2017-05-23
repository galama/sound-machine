define([
    'jquery',
    'text!temps/sequencer.html',
    'scripts/color',
    'js/player'
], function($, sequencerTemplate, color, player) {
    'use strict';

    var _grid = null;
    var RGB = {};
    var sequence = {
        kick: [],
        snare: [],
        closehh: [],
        openhh: [],
        tom1: [],
        tom2: [],
        tom3: []
    };

    var play = function () {

        var color;
        var xMax = 1;
        var xMin = 0;
        var yMax = 0;
        var yMin = 765;



        for (var i = 0, c =_grid.length; i < c; i++) {

            for (var j = 0, cc = _grid[i].length; j < cc; j++) {

                RGB = _grid[i][j];

                if (i < 7) {

                    color = RGB.r + RGB.g + RGB.b;
                    var percent = (color - yMin) / (yMax - yMin);
                    var velocity = percent * (xMax - xMin) + xMin;

                    velocity = (velocity < 0.00) ? 0 : velocity = +velocity.toFixed(2);

                    if (i === 0) {
                        sequence.kick[j] = velocity;
                    }
                    else if (i === 1) {
                        sequence.snare[j] = velocity;
                    }
                    else if (i === 2) {
                        sequence.closehh[j] = velocity;
                    }
                    else if (i === 3) {
                        sequence.openhh[j] = velocity;
                    }
                    else if (i === 4) {
                        sequence.tom1[j] = velocity;
                    }
                    else if (i === 5) {
                        sequence.tom2[j] = velocity;
                    }
                    else {
                        sequence.tom3[j] = velocity;
                    }

                }
            }
        }

        player.play(sequence);


    };

    var sequencer = {
        
        init: function (grid, html) {

            _grid = grid;

            $("#mainCont").empty().append(sequencerTemplate);
            $("#sequencer").append(html);

            $("#playbtn").on('click', function () {
                if ( $("#playbtn").html() === "Play") {
                    play();
                    $("#playbtn").html("Stop");
                    $("#playbtn").toggleClass('btn-info btn-danger');
                    $("#bpm").attr('disabled', true);
                } else {
                    player.stop();
                    $("#playbtn").html("Play");
                    $("#playbtn").toggleClass('btn-danger btn-info');
                    $("#bpm").attr('disabled', false);
                }
            });
        }
        
    };

    return sequencer;
});