define([
    'cropper',
    'jquery',
    'js/sequencer'
], function( cropper, $, sequencer ) {
    'use strict';

    const GRID_CELLS = 9;
    const GRID_START_X = 78;
    const GRID_START_Y = 62;
    const CELL_WIDTH = 63;
    const CELL_HEIGHT = 38;
    const CELL_BORDER = 3;

    var canvas = null;

    var grid = [];


    var getColor = function(color) {
        return "rgb(" + color.r +',' + color.g +',' + color.b + ');'
    };

    var drowTable = function(grid) {
        var html = "";
        var x,y = null;
        for (var i = 0; i < GRID_CELLS; i++) {

            html += "<div class='row'>";

            for (var j = 0; j < GRID_CELLS; j++) {

                //if (j === 0) continue;

                x = GRID_START_X + CELL_WIDTH * j + CELL_WIDTH / 2 + CELL_BORDER;
                y = GRID_START_Y + CELL_HEIGHT * i + CELL_HEIGHT / 2 + CELL_BORDER;

                html += "<div class='col-md-1 color-row' style='background: " + getColor(grid[i][j]) + "'> </div>";
            }

            html += "</div>";
        }

        sequencer.init(grid, html);

    };


    var imageParser = {

        process : function() {

            var x = 0, y = 0;
            var cellData;

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var tempImg = document.getElementById('image');

            canvas.width = tempImg.width;
            canvas.height = tempImg.height;

            var img = new Image();
            img.src = tempImg.src;
            img.onload = function()
            {
                context.drawImage(img, 0, 0);

                for (var i = 0; i < GRID_CELLS; i++) {
                    grid[i] = [];
                    for (var j = 0; j < GRID_CELLS; j++) {

                        x = GRID_START_X + CELL_WIDTH * j + CELL_WIDTH / 2 + CELL_BORDER;
                        y = GRID_START_Y + CELL_HEIGHT * i + CELL_HEIGHT / 2 + CELL_BORDER;


                        cellData = context.getImageData(x, y, tempImg.width, tempImg.height);

                        context.rect(x,y,2,2);
                        context.fillStyle = "red";
                        context.fill();

                        grid[i][j] = {
                            r: cellData.data[0],
                            g: cellData.data[1],
                            b: cellData.data[2]
                        }
                    }
                }

                drowTable(grid, tempImg);
            };
        }
    };

    return imageParser;

});