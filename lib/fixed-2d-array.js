/**
 * An array with a fixed height and width.
 *
 * @param row {number} number of rows, corresponds to the height.
 * @param cols {number} number of columns, corresponds to the width.
 * @param defaultValue the initial value for the array elements
 * @class
 */
var Fixed2DArray = function Fixed2DArray(rows, cols, defaultValue) {
  if(rows <= 0 || cols <= 0){
    throw new Error('fixed-2d-array: Must have more then 0 rows and 0 columns.');
  }

  this._width = cols;
  this._height = rows;
  this._grid = [];

  for (var i = 0; i < rows; i++) {
    this._grid[i] = [];
    for (var j = 0; j < cols; j++) {
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
 * @param rowIndex {number} index of the requested row.
 */
Fixed2DArray.prototype.getRow = function getRow(rowIndex) {
  try {
    this.validateCoords(rowIndex,0);
  } catch (err) {
    throw new Error('fixed-2d-array: row index ' + rowIndex + ' is not valid.' +
      ' The size of this array is (' + this._width + '/' + this._height + ')');
  }

  return this._grid[rowIndex];
};

/**
 * Sets the indicated row with the given array.
 *
 * If the given array is smaller then the current row, `undefined` will fill
 * the given array until it is the same length as the current row.
 *
 * @param rowIndex {number} index of the row where top left is (0,0).
 * @param newRow {array} array of values to replace the indicated row's values.
 */
Fixed2DArray.prototype.setRow = function setRow(rowIndex, newRow) {
  try {
    this.validateCoords(0, rowIndex);
  } catch (err) {
    throw new Error('fixed-2d-array: row index ' + rowIndex + ' is not valid.' +
      ' The size of this array is (' + this.getHeight() + '/' + this.getRow() + ')');
  }

  var currentRow = this.getRow(rowIndex);

  if (newRow.length > currentRow.length){
    throw new Error('fixed-2d-array: the length of the new row, '+newRow.length+
      ', can not exceed the length of the current row, '+currentRow.length);
  }

  currentRow.forEach(function(_,index){
    currentRow[index] = newRow[index];
  });
};

/**
 * Adds one or more arrays to the bottom of the Fixed2DArray.
 * Returns the new width of the Fixed2DArray.
 *
 * Only arguments that are arrays will be appended as rows.
 *
 * If the given array is smaller then the height of the Fixed2DArray, `undefined` will fill
 * the given array until it is the same length as the current row.
 */
Fixed2DArray.prototype.pushRow = function pushRow() {
  for (var i = 0; i < arguments.length; i++){
    var newRow = arguments[i];

    if(newRow.constructor !== Array){ continue; }
    else if (newRow.length > this.getWidth()){ //no adding rows that are too wide.
      throw new Error('fixed-2d-array: the length of the new row, '+newRow.length+
        ', can not exceed the length of the current rows, '+this.getWidth());
    }
    else{ //expand a smaller row to be the same size as other rows.
      for (var j = newRow.length; j < this.getWidth(); j++){
        newRow[j] = undefined;
      }
    }
    this._grid[this.getHeight()] = newRow;
    this._height += 1;
  }
  return this.getHeight();
};

/**
 * Returns the requested column from the grid.
 *
 * @param colIndex {number} index of the requested column
 */
Fixed2DArray.prototype.getColumn = function getColumn(colIndex) {
  try {
    this.validateCoords(0, colIndex);
  } catch (err) {
    throw new Error('fixed-2d-array: column index ' + colIndex + ' is not valid.' +
      ' The size of this array is (' + this.getHeight() + '/' + this.getWidth() + ')');
  }

  var returnArray = [];

  for (var i = 0; i < this._height; i++) {
    returnArray.push(this._grid[i][colIndex]);
  }
  return returnArray;
};

/**
 * Sets the indicated column with the given array.
 *
 * If the given array is smaller then the current column, `undefined` will fill
 * the given array until it is the same length as the current column.
 *
 * @param colIndex {number} index of the column where top left is (0,0).
 * @param newColumn {array} array of values to replace the indicated column's values.
 */
Fixed2DArray.prototype.setColumn = function setColumn(colIndex, newColumn) {
  try {
    this.validateCoords(colIndex, 0);
  } catch (err) {
    throw new Error('fixed-2d-array: column index ' + colIndex + ' is not valid.' +
      ' The size of this array is (' + this.getHeight() + '/' + this.getWid() + ')');
  }

  var currentColumn = this.getColumn(colIndex);

  if (newColumn.length > currentColumn.length){
    throw new Error('fixed-2d-array: the length of the new column, '+newColumn.length+
      ', can not exceed the length of the current column, '+currentColumn.length);
  }

  for (var i = 0; i < currentColumn.length; i++){
    this._grid[i][colIndex] = newColumn[i];
  }
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
  for (var i = 0; i < this.getHeight(); i++) {
    for (var j = 0; j < this.getWidth(); j++) {
      fn.call(thisArg, this._grid[i][j], { x: i, y: j }, this);
    }
  }
};

/**
 * Throws an Error if the given coordinate is invalid.
 *
 * @param row {number} index of the requested row
 * @param col {number} index of the requested column
 */
Fixed2DArray.prototype.validateCoords = function validateCoords(row, col) {
  if (row < 0 || col < 0 || row >= this.getHeight() || col >= this.getWidth()) {
    throw new Error('fixed-2d-array: the coordinate (' + row + '/' + col + ') ' +
      'is not valid. The size of this array is (' + this.getHeight() + '/' + this.getWidth() + ')');
  }
};

/**
 * Returns true if the given object has the same height and width as the Fixed2DArray.
 * Returns false if the given object does not have the same height and width as the Fixed2DArray.
 * Throws an error if the given object does not have .getWidth() and .getHeight() methods.
 *
 * @param fixedArray {object with .getWidth() and .getHeight() methods} object to compare size with 
 */
Fixed2DArray.prototype.sameSize = function sameSize(fixedArray){
  try{
    return ((fixedArray.getWidth() === this.getWidth()) && (fixedArray.getHeight() === this.getHeight()));
  }catch(err){
    throw new Error('fixed-2d-array: the given object needs to implement a getWidth and getHeight method ' +
                    'in order for Fixed2DArray to compare size.');
  }
};

/**
 * Returns the value for the coordinate.
 *
 * @param row {number} index of the requested row
 * @param col {number} index of the requested column
 */
Fixed2DArray.prototype.get = function get(row, col) {
  this.validateCoords(row, col);
  return this._grid[row][col];
};

/**
 * Sets the value for the coordinate.
 *
 * @param row {number} index of the requested row
 * @param col {number} index of the requested column
 * @param val new value
 */
Fixed2DArray.prototype.set = function set(row, col, val) {
  this.validateCoords(row, col);
  this._grid[row][col] = val;
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
 * the values for the fields marked with an `*`.
 *
 * @param row {number} index of the requested row
 * @param col {number} index of the requested column
 * @param distance {number} length of the neighbor-square around the given coordinate.
 */
Fixed2DArray.prototype.getNeighbours = function getNeighbours(row, col, distance) {
  this.validateCoords(row, col);

  if (typeof distance === 'undefined') { distance = 1; }
  if (distance <= 0) {
    return [];
  }

  var returnArray = [];

  for (var i = row - distance; i <= row + distance; i++) {
    for (var j = col - distance; j <= col + distance; j++) {
      try {
        if (!(i === row && j === col)) {
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
 * @param row1 {number} first row index.
 * @param col1 {number} first column index.
 * @param row2 {number} second row index.
 * @param col2 {number} second column index.
 * @param distance {number} Optional. Maximum distance for coordinates to be considered neighbors.
 */
Fixed2DArray.prototype.areNeighbours = function areNeighbours(row1, col1, row2, col2, distance) {
  this.validateCoords(row1, col1);
  this.validateCoords(row2, col2);

  if (typeof distance === 'undefined') { distance = 1; }
  if (distance <= 0) {
    return false;
  }


  return (Math.abs(row1 - row2) <= distance) && (Math.abs(col1 - col2) <= distance);
};

module.exports = Fixed2DArray;
