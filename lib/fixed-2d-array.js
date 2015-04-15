/**
 * An array with a fixed height and width.
 *
 * @param width {number} width of the array
 * @param height {number} height of the array
 * @param defaultValue the initial value for the array elements
 * @class
 */
var Fixed2DArray = function Fixed2DArray(width, height, defaultValue) {
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
 * Returns the height of the grid
 */
Fixed2DArray.prototype.getHeight = function getHeight() {
  return this._height;
};

/**
 * Returns the width of the grid
 */
Fixed2DArray.prototype.getWidth = function getWidth() {
  return this._width;
};

/**
 * Throws an Error if the given coordinate is invalid.
 *
 * @param x {number} x coordinate
 * @param y {number} y coordinate
 */
Fixed2DArray.prototype.validateCoords = function validateCoords(x, y) {
  if(x<0 || y<0 || x>=this._width || y>=this._height) {
    throw new Error('fixed-2d-array: the coordinate ('+x+'/'+y+') ' +
                    'is not valid.' +
                    ' The size of this array is ('+this._width+'/'+this._height+')');
  }
};

/**
 * Returns the value for the coordinate.
 *
 * @param x {number} x coordinate
 * @param y {number} y coordinate
 */
Fixed2DArray.prototype.get = function get(x, y) {
  this.validateCoords(x,y);
  return this._grid[x][y];
};

/**
 * Sets the value for the coordinate.
 *
 * @param x {number} x coordinate
 * @param y {number} y coordinate
 * @param val new value
 */
Fixed2DArray.prototype.set = function set(x, y, val) {
  this.validateCoords(x,y);
  this._grid[x][y] = val;
};

/**
 * Returns all neighbours of the given coordinate.
 *
 * For example:
 * <pre>
 * [ ][ ][ ][ ][ ]
 * [ ][*][*][*][ ]
 * [ ][*][X][*][ ]
 * [ ][*][*][*][ ]
 * [ ][ ][ ][ ][ ]
 * </pre>
 *
 * The given coordinate is marked with an `X`.
 * The function will return an array containing
 * the values for the fields maked with an `*`.
 *
 * @param x {number} x coordinate
 * @param y {number} y coordinate
 */
Fixed2DArray.prototype.getNeighbours = function getNeighbours(x, y){
  this.validateCoords(x,y);

  var returnArray = [];

  for(var i=x-1; i<=x+1; i++){
    for(var j=y-1; j<=y+1; j++){
      try {
        if(!(i===x && j===y)) {
          var element = this.get(i,j);
          returnArray.push(element);
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
