/**
 * @type {number} pixels
 * Grid width
 */
const GRID_WIDTH = 950;

/**
 * @type {number} pixels
 * Grid height
 */
const GRID_HEIGHT = 400;

/**
 * @type {number}
 * Number of cells in grid
 */
const GRID_CELLS = 9;

/**
 * @type {number}
 * Grid start X
 */
const GRID_START_X = 78;

/**
 * @type {number}
 * GRID start Y
 */
const GRID_START_Y = 62;

/**
 * @type {number}
 * cell width
 */
const CELL_WIDTH = 63;

/**
 * @type {number}
 * cell height
 */
const CELL_HEIGHT = 38;

const CELL_BORDER = 3;


// function getColor(context, img, x,y) {
//
//     cellData = context.getImageData(x, y, img.width, img.height);
//
//
// }


function process() {

    var grid = [];
    var x = 0, y = 0; jj = 1;
    var cellData;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var tempImg = document.getElementById('image');

    canvas.width = tempImg.width;
    canvas.height = tempImg.height;

   // document.body.appendChild(canvas);

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
                    b: cellData.data[2],
                    a: cellData.data[3]
                }
            }
        }

        drowTable(grid, tempImg);
    };
}

function drowTable(grid, tempImg) {

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = tempImg.width;
    canvas.height = tempImg.height;

    html = "";

    for (var i = 0; i < GRID_CELLS; i++) {
        for (var j = 1; j < GRID_CELLS; j++) {

            x = GRID_START_X + CELL_WIDTH * j + CELL_WIDTH / 2 + CELL_BORDER;
            y = GRID_START_Y + CELL_HEIGHT * i + CELL_HEIGHT / 2 + CELL_BORDER;

            html += "<span style='background: " + getColor(grid[i][j]) + "'> 00 </span>";
            if (j !== 0 && j % 8 === 0) {
                html += "<br/>";
            }
        }
    }

    document.body.innerHTML += html;//= html;
}

function getColor(color) {

    return "rgba(" + color.r +',' + color.g +',' + color.b +',' + color.a + ');'



}