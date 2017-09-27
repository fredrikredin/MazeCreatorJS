function Cell(rowIndex, colIndex, cellSize)
{
    this.isVisited = false;
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.walls = {top: true, right: true, bottom: true, left: true};
    this.x = (cellSize / 2) + colIndex*cellSize + 2;
    this.y = (cellSize / 2) + rowIndex*cellSize + 2;
    this.unvisitedNeighbours;
    this.hs = cellSize/2;

    this.drawWalls = function()
    {
        if(!this.isVisited)
            return;

        if(this.walls.top === true)
            line(this.x - this.hs, this.y - this.hs, this.x + this.hs, this.y - this.hs);   

        if(this.walls.right === true)
            line(this.x + this.hs, this.y - this.hs, this.x + this.hs, this.y + this.hs);   

        if(this.walls.bottom === true)
            line(this.x - this.hs, this.y + this.hs, this.x + this.hs, this.y + this.hs);   

        if(this.walls.left === true)
            line(this.x - this.hs, this.y - this.hs, this.x - this.hs, this.y + this.hs);   
    }

    this.haveUnvisitedNeighbours  = function()
    {
        this.updateUnvisitedNeighbours(); 
        return this.unvisitedNeighbours.length > 0;
    }

    this.updateUnvisitedNeighbours = function()
    {
        this.unvisitedNeighbours = [];

        if(this.colIndex > 0 && !cells[this.rowIndex][this.colIndex - 1].isVisited)
            this.unvisitedNeighbours.push(cells[this.rowIndex][this.colIndex - 1]);

        if(this.colIndex <= colCount - 2 && !cells[this.rowIndex][this.colIndex + 1].isVisited)
            this.unvisitedNeighbours.push(cells[this.rowIndex][this.colIndex + 1]);

        if(this.rowIndex > 0 && !cells[this.rowIndex - 1][this.colIndex].isVisited)
            this.unvisitedNeighbours.push(cells[this.rowIndex - 1][this.colIndex]);

        if(this.rowIndex <= rowCount - 2 && !cells[this.rowIndex + 1][this.colIndex].isVisited)
            this.unvisitedNeighbours.push(cells[this.rowIndex + 1][this.colIndex]);
    }

    this.moveToRandomUnvisitedNeighbour = function()
    {
        var randIndex = Math.floor(Math.random()*this.unvisitedNeighbours.length);
        var neighbour = this.unvisitedNeighbours[randIndex];
        
        this.removeWallsToNeighbour(neighbour);
        return neighbour;
    }

    this.removeWallsToNeighbour = function(neighbour)
    {
         if(this.rowIndex === neighbour.rowIndex)
         {
             if(this.colIndex > neighbour.colIndex)           // neighbour to the left
             {
                 this.walls.left = false;
                 neighbour.walls.right = false;
             }
             else if (this.colIndex < neighbour.colIndex)     // neighbour to the right
             {
                 this.walls.right = false;
                 neighbour.walls.left = false;
             }
         }
         else if (this.colIndex === neighbour.colIndex)        
         {
             if(this.rowIndex > neighbour.rowIndex)           // neighbour above
             {
                 this.walls.top = false;
                 neighbour.walls.bottom = false;
             }
             else if (this.rowIndex < neighbour.rowIndex)     // neighbour below
             {
                 this.walls.bottom = false;
                 neighbour.walls.top = false;
             }
         }
    }
}