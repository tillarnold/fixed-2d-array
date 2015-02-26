# fixed-2d-array
[![NPM version](https://badge.fury.io/js/fixed-2d-array.svg)](http://badge.fury.io/js/fixed-2d-array)
[![Build Status](https://travis-ci.org/tillarnold/fixed-2d-array.svg?branch=master)](https://travis-ci.org/tillarnold/fixed-2d-array)
[![devDependency Status](https://david-dm.org/tillarnold/fixed-2d-array/dev-status.svg)](https://david-dm.org/tillarnold/fixed-2d-array#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/tillarnold/fixed-2d-array/badge.svg?branch=master)](https://coveralls.io/r/tillarnold/fixed-2d-array?branch=master)
[![Code Climate](https://codeclimate.com/github/tillarnold/fixed-2d-array/badges/gpa.svg)](https://codeclimate.com/github/tillarnold/fixed-2d-array)




> A fixed size 2D array in javascript

This module gives you a two-dismesional array with a fixed size. 

## Fixed2DArray(width,height,defaultValue)
`width` is the width of the array and `height` is the height of the array. (That's kinda obvious, isn't it?)
During the creation of the array the `defaultValue` will be asigned to all elements.

### validateCoords(x, y)
The `validateCoords` method checks if the given coordinates are valid. (lie inside of the array)  
If the coordinates are *not* valid a `Error` is thrown.

### get(x, y)
Returns the value of the given coordinate. The coordinate is checked using  `validateCoords`.

### set(x, y, value)
Sets the value of the given coordinate to `value`. The coordinate is checked using  `validateCoords`.

### getNeighbours(x, y)
Returns an array containing all values of the cells next to the given coordinate.
