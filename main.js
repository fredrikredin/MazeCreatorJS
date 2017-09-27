var colCount;
var rowCount;
var cellSize; 
var cells;
var current;
var stack = [];
var complete = false;

function setup() 
{
    createCanvas(0.99 * windowWidth, 0.99 * windowHeight);
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
    colCount = 20;
    cellSize = ((width - 10) / colCount);
    rowCount = Math.floor(height / cellSize);

    cells = new Array(rowCount);
    for(var i = 0; i < rowCount; i++)
        cells[i] = new Array(colCount);

    for(var i = 0; i < rowCount; i++)
        for(var j = 0; j < colCount; j++)
            cells[i][j] = new Cell(i,j, cellSize);
}

/*
function setColCount()
{
    colCount = parseColCountFromURLParameter();
    
    if(colCount < 1)
        colCount = 1;
    
    if(colCount > 50)
        colCount = 50;
}

function parseColCountFromURLParameter() 
{
    var defaultColCount = 20;

    if(window.location.search === undefined || window.location.search === "")
        return defaultColCount;

    var index = window.location.search.indexOf("?colCount=");

    if(index > 0)
    {
        var value = parseInt(window.location.search.substr("?colCount=".length));

        if(isNaN(value))
            return defaultColCount;
        else
            return value;
    }
    else
        return defaultColCount;
}
*/

// main loop
function draw() 
{
    background(0); 
    
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