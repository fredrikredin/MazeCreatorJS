var rowColCount = 20;
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
    //strokeWeight(4)
    fill(63, 79, 232);
    stroke(0);
}

function setupCells()
{
    cellSize = (width / rowColCount) - 1;

    cells = new Array(rowColCount);
    for(var i = 0; i < rowColCount; i++)
        cells[i] = new Array(rowColCount);

    for(var i = 0; i < rowColCount; i++)
        for(var j = 0; j < rowColCount; j++)
            cells[i][j] = new Cell(i,j, cellSize);
}

// main loop
function draw() 
{
    background(255); 
    
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
    
    for(var i = 0; i < rowColCount; i++)
    for(var j = 0; j < rowColCount; j++)
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
        rect(cells[rowColCount-1][rowColCount-1].x, cells[rowColCount-1][rowColCount-1].y, cellSize-5, cellSize-5)
    }
}