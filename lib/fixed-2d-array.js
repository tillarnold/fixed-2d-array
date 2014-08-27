/**
 * width: width of the array
 * height: height of the array
 * defaultValue: the default value for the array 
 */
var Fixed2DArray = function Fixed2DArray(width,height,defaultValue) {
  this._width = width;
  this._height = height;
  this._grid = [];
  for (var i = 0; i < width; i++) {
    this._grid[i] = [];
    for (var j = 0; j < height; j++) {
      this._grid[i][j] = defaultValue;
    }
  }
};

/**
 * Throws an Error if the given coordinate is invalid
 */
Fixed2DArray.prototype.validateCoords = function(x,y) {
  if(x<0 || y<0 || x>=this._width || y>=this._height) {
    throw new Error('fixed-2d-array: the coordinate ('+x+'/'+y+') ' +
                    'are not valid.' + 
                    ' The size of this array is ('+this._width+'/'+this._height+')');
  }
};

/**
 * Returns the coresponding value for the coordinate
 */
Fixed2DArray.prototype.get = function(x,y) {
  this.validateCoords(x,y);
  return this._grid[x][y];
};

/**
 * Sets the value for the coresponding coorinate
 */
Fixed2DArray.prototype.set = function(x,y,val) {
  this.validateCoords(x,y);
  this._grid[x][y] = val;
};

/**
 * Returns all neighbours of the given coordinate.
 *
 * For example: 
 * [ ][ ][ ][ ][ ]
 * [ ][*][*][*][ ]
 * [ ][*][X][*][ ]
 * [ ][*][*][*][ ]
 * [ ][ ][ ][ ][ ]
 *
 * the given coordinate is marked with an `X`
 * the function will return an array containing
 * the values for the fields maked with an `*` 
 */
Fixed2DArray.prototype.getNeighbours = function(x,y){
  this.validateCoords(x,y);
  
  var returnArray = [];

  for(var i=x-1; i<=x+1; i++){
    for(var j=y-1; j<=y+1; j++){
      try {
        if(!(i===x && j===y)) {
          var element = this.get(i,j);
          returnArray.push(element);
          console.log('added',i,j);
        }
      }
      catch(e) {
        //this is a field at the edge of the grid.
        //ignore
      }
    }
  }
  return returnArray;
};

module.exports = Fixed2DArray;
