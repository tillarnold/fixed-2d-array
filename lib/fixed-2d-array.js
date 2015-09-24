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
 * Returns the requested row from the grid.
 *
 * @param rowNumber {number} number of the row where top left is (0,0).
 */
Fixed2DArray.prototype.getRow = function getRow(rowNumber) {
  try {
    this.validateCoords(0, rowNumber);
  } catch (err) {
    throw new Error('fixed-2d-array: row number ' + rowNumber + ' is not valid.' +
      ' The size of this array is (' + this._width + '/' + this._height + ')');
  }

  return this._grid[rowNumber];
};

/**
 * Returns the requested column from the grid.
 *
 * @param colNumber {number} number of the column where top left is (0,0).
 */
Fixed2DArray.prototype.getColumn = function getColumn(colNumber) {
  try {
    this.validateCoords(colNumber, 0);
  } catch (err) {
    throw new Error('fixed-2d-array: column number ' + colNumber + ' is not valid.' +
      ' The size of this array is (' + this._width + '/' + this._height + ')');
  }

  var returnArray = [];

  for (var i = 0; i < this._height; i++) {
    returnArray.push(this._grid[i][colNumber]);
  }
  return returnArray;
};

/**
 * Executes a provided function once per array element.
 *
 * @param fn {function} Function to execute for each element, taking three arguments: 
 *
 *  currentValue
 *    The current element being processed in the array.
 *  index
 *    The object index, {x: x, y: y}, of the current element being processed in the 2d array.
 *  array
 *    The Fixed2DArray that forEach is being applied to. 
 *
 * @param thisArg Optional. Value to use as this when executing callback.
 */
Fixed2DArray.prototype.forEach = function forEach(fn, thisArg) {
  for (var i = 0; i < this._width; i++) {
    for (var j = 0; j < this._height; j++) {
      fn.call(thisArg, this._grid[i][j], { x: i, y: j }, this);
    }
  }
};

/**
 * Throws an Error if the given coordinate is invalid.
 *
 * @param x {number} x coordinate
 * @param y {number} y coordinate
 */
Fixed2DArray.prototype.validateCoords = function validateCoords(x, y) {
  if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
    throw new Error('fixed-2d-array: the coordinate (' + x + '/' + y + ') ' +
      'is not valid. The size of this array is (' + this._width + '/' + this._height + ')');
  }
};

/**
 * Returns the value for the coordinate.
 *
 * @param x {number} x coordinate
 * @param y {number} y coordinate
 */
Fixed2DArray.prototype.get = function get(x, y) {
  this.validateCoords(x, y);
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
  this.validateCoords(x, y);
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
 * @param distance {number} length of the neighbor-square around the given coordinate.
 */
Fixed2DArray.prototype.getNeighbours = function getNeighbours(x, y, distance) {
  this.validateCoords(x, y);

  if (typeof distance === 'undefined') { distance = 1; }
  if (distance <= 0) {
    return [];
  }

  var returnArray = [];

  for (var i = x - distance; i <= x + distance; i++) {
    for (var j = y - distance; j <= y + distance; j++) {
      try {
        if (!(i === x && j === y)) {
          var element = this.get(i, j);
          returnArray.push(element);
        }
      } catch (e) {
        //this is a field at the edge of the grid.
        //ignore
      }
    }
  }
  return returnArray;
};

/**
 * Returns true if the given coordinates are neighbors, false otherwise.
 *
 * The distance between each coordinate must be within `distance` or one unit away from 
 * each other for the given coordinates to be considered neighbors.
 *
 * For example, distance not set:
 *
 *    0  1  2 
 * 0 [A][ ][ ]
 * 1 [ ][B][ ]
 * 2 [ ][ ][ ]
 * 3 [ ][ ][ ]
 *
 * The first given coordinate (0,0) is marked with an `A`, the second (1,1), a `B`.
 * A and B are neighbors.
 *
 * If A and B were instead placed at (0,0) and (2,2) respectively, like this:
 *
 *    0  1  2 
 * 0 [A][ ][ ]
 * 1 [ ][ ][ ]
 * 2 [ ][ ][B]
 * 3 [ ][ ][ ]
 *
 * A and B are no longer neighbors.
 *
 * Example, distance = 2:
 *
 *    0  1  2 
 * 0 [A][ ][ ]
 * 1 [ ][ ][ ]
 * 2 [ ][ ][B]
 * 3 [ ][ ][ ]
 *
 * A (0,0) and B (2,2) are neighbors.
 * 
 * @param x1 {number} first x coordinate.
 * @param y1 {number} first y coordinate.
 * @param x2 {number} second x coordinate.
 * @param y2 {number} second y coordinate.
 * @param distance {number} Optional. Maximum distance for coordinates to be considered neighbors.
 */
Fixed2DArray.prototype.areNeighbours = function areNeighbours(x1, y1, x2, y2, distance) {
  this.validateCoords(x1, y1);
  this.validateCoords(x2, y2);

  if (typeof distance === 'undefined') { distance = 1; }
  if (distance <= 0) {
    return false;
  }


  return (Math.abs(x1 - x2) <= distance) && (Math.abs(y1 - y2) <= distance);
};

module.exports = Fixed2DArray;
