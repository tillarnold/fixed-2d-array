# fixed-2d-array
[![NPM version](https://badge.fury.io/js/fixed-2d-array.svg)](http://badge.fury.io/js/fixed-2d-array)
[![Build Status](https://travis-ci.org/tillarnold/fixed-2d-array.svg?branch=master)](https://travis-ci.org/tillarnold/fixed-2d-array)
[![devDependency Status](https://david-dm.org/tillarnold/fixed-2d-array/dev-status.svg)](https://david-dm.org/tillarnold/fixed-2d-array#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/tillarnold/fixed-2d-array/badge.svg?branch=master)](https://coveralls.io/r/tillarnold/fixed-2d-array?branch=master)
[![Code Climate](https://codeclimate.com/github/tillarnold/fixed-2d-array/badges/gpa.svg)](https://codeclimate.com/github/tillarnold/fixed-2d-array)


> A fixed size 2D array in JavaScript

This module gives you a two-dimensional array with a fixed size. The top left coordinate is (0,0).

## Fixed2DArray(rows, columns, defaultValue)
`rows` is the number of rows the Fixed2DArray will start with, `columns` is the columns.
During the creation of the array the `defaultValue` will be assigned to all elements.

### validateCoords(row, col)
The `validateCoords` method checks if the given coordinates are valid. (lie inside of the array)
If the coordinates are *not* valid an `Error` is thrown.

### get(row, col)
Returns the value of the given coordinate. The coordinate is checked using `validateCoords`.

### getRow(rowIndex)
Returns an array of the requested row.

### getColumn(colIndex)
Returns an array of the requested column.

### set(row, col, value)
Sets the value of the given coordinate to `value`. The coordinate is checked using `validateCoords`.

### setRow(rowIndex, array)
Sets values of the given array as the values of the specified row.

### setColumn(colIndex, array)
Sets values of the given array as the values of the specified column.

### getHeight()
The number of rows corresponds with the height.

### getWidth()
The number of columns corresponds to the width.

### getNeighbours(row, col, [, distance])
Returns an array containing all values of the cells next to the given coordinate.

For example, distance not set:
```
[ ][ ][ ][ ][ ]
[ ][*][*][*][ ]
[ ][*][X][*][ ]
[ ][*][*][*][ ]
[ ][ ][ ][ ][ ]
```

The given coordinate is marked with an `X`. The function will return an array containing the values for the fields marked with an `*`.

Example, distance = 2:
```
[*][*][*][*][*]
[*][*][*][*][*]
[*][*][X][*][*]
[*][*][*][*][*]
[*][*][*][*][*]
```

The function will return an array containing the values for the fields marked with an '*'. Notice that distance will change what cells count as neighbors.

### areNeighbours(row1, col1, row2, col2, [, distance])
Returns true if the given coordinates are neighbors, false otherwise.

The distance between each coordinate must be within `distance` or one unit away from each other for the
given coordinates to be considered neighbors.

For example, distance not set:

```
   0  1  2 
0 [A][ ][ ]
1 [ ][B][ ]
2 [ ][ ][ ]
3 [ ][ ][ ]
```

The first given coordinate (0,0) is marked with an `A`, the second (1,1), a `B`.
A and B are neighbors.

If A and B were instead placed at (0,0) and (2,2) respectively, like this:

```
   0  1  2 
0 [A][ ][ ]
1 [ ][ ][ ]
2 [ ][ ][B]
3 [ ][ ][ ]
```

A and B are no longer neighbors.

Example, distance = 2:

```
   0  1  2 
0 [A][ ][ ]
1 [ ][ ][ ]
2 [ ][ ][B]
3 [ ][ ][ ]
```

A (0,0) and B (2,2) are neighbors.

### forEach(fn, [, thisArg])
Executes a provided function once per array element.

`fn` is the function to execute for each element, taking three arguments: 
  * `currentValue`: The current element being processed in the array.
  * `index`: The object index, {x: x, y: y}, of the current element being processed in the 2d array.
  * `array`: The Fixed2DArray that forEach is being applied to. 
  * `thisArg`: Optional. Value to use as this when executing callback.