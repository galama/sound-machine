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
const  GRID_START_X = 112;

/**
 * @type {number}
 * GRID start Y
 */
const  GRID_START_Y = 62;

/**
 * @type {number}
 * cell width
 */
const  CELL_WIDTH = 97;

/**
 * @type {number}
 * cell height
 */
const  CELL_HEIGHT = 37;


function process() {

    var grid = [];
    var x = 0, y = 0; jj = 1;
    var cellData;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = document.getElementById('image');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0 );


    for (var i = 0; i <= GRID_CELLS; i++) {
        grid[i] = [];
        for (var j = 0; j < GRID_CELLS; j++) {

            x = GRID_START_X + CELL_WIDTH * j +  CELL_WIDTH / 2;
            y = GRID_START_Y + CELL_HEIGHT * i +  CELL_HEIGHT / 2;

            /**
             * debug dots
             */
            jQuery('<div>', {
                class: 'dot',
                style: "top:" + y +"px; left:" + x +"px"
            }).appendTo('#imgwrapper');
            
            cellData = context.getImageData(x, y, img.width, img.height);

            grid[i][j] = {
                r: cellData.data[0],
                g: cellData.data[1],
                b: cellData.data[2],
                a: cellData.data[3]
            }
        }
    }

    console.log(grid);
}