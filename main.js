var colCount = 10;  // fixed
var rowCount = 10;  // set based on canvas height
var cellSize; 
var cells;
var current;
var stack = [];
var complete = false;

function setup() 
{
    var canvasSize = 0.99 * Math.min(windowWidth, windowHeight);
    createCanvas(canvasSize, canvasSize);
    setupDraw();
    setupCells();
    current = cells[0][0];
    current.isVisited = true;
}

function setupDraw()
{
    frameRate(60);
    rectMode(CENTER);
    textSize(30);
    fill(63, 79, 232);
    stroke(220);
}

function setupCells()
{
    cellSize = (width / colCount) - 1;
    rowCount = Math.floor(windowHeight - 10 / cellSize);

    cells = new Array(rowCount);
    for(var i = 0; i < rowCount; i++)
        cells[i] = new Array(colCount);

    for(var i = 0; i < rowCount; i++)
        for(var j = 0; j < colCount; j++)
            cells[i][j] = new Cell(i,j, cellSize);
}

// main loop
function draw() 
{
    background(100); 
    
    if(current.haveUnvisitedNeighbours())
    {
        var next = current.moveToRandomUnvisitedNeighbour();
        stack.push(current);
        current = next;
        current.isVisited = true;
    }
    else if (stack.length > 0)
        current = stack.pop();
    else
    {
        complete = true;
        noLoop();               // stop draw()
    }
    
    // draw cell walls
    strokeWeight(6);
    
    for(var i = 0; i < rowCount; i++)
        for(var j = 0; j < colCount; j++)
            cells[i][j].drawWalls();
    
    //if (complete)
    //    fill(0, 168, 107);

    // draw marker at current cell
    strokeWeight(0);
    rect(current.x, current.y, cellSize-5, cellSize-5)
    
    if(complete)
    {
        fill(0, 168, 107);
        rect(current.x, current.y, cellSize-5, cellSize-5)
        var last = cells[rowCount-1][colCount-1];
        rect(last.x, last.y, cellSize-5, cellSize-5);
    }
}