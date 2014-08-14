var test = require('tape');
var fixedArray = require('..');

test('Default values', function (t) {
  t.plan(2);
  var fa = new fixedArray(10,10,{abc:123});
  t.equal(fa.get(9,9).abc,123);
  t.equal(fa.get(0,0).abc,123);
});

test('get and set', function (t) {
  t.plan(1);
  var fa = new fixedArray(10,10);
  fa.set(9,7,'This is a string!');
  t.equal(fa.get(9,7),'This is a string!');
});

test('exception on index out of bounds', function (t) {
  t.plan(2);
  var fa = new fixedArray(10,10);
  t.throws(function(){fa.get(10,10);});
  t.throws(function(){fa.get(-1,-1);});
});
