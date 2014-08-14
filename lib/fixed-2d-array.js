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
 * Throws an Error if the given coordinates are invalid
 */
Fixed2DArray.prototype.validateCoords = function(x,y) {
  if(x<0 || y<0 || x>=this._width || y>=this._height) {
    throw new Error('fixed-2d-array: the coordinates ('+x+'/'+y+') ' +
                    'are not valid in this Grid.' + 
                    ' The grid size is ('+this._width+'/'+this._height+')');
  }
};

/**
 * Returns the coresponding value for the coordinates
 */
Fixed2DArray.prototype.get = function(x,y) {
  this.validateCoords(x,y);
  return this._grid[x][y];
};

/**
 * Sets the value for the coresponding coorinates
 */
Fixed2DArray.prototype.set = function(x,y,val) {
  this.validateCoords(x,y);
  this._grid[x][y] = val;
};

module.exports = Fixed2DArray;
