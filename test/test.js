var test = require('tape');
var FixedArray = require('..');

test('Default values', function (t) {
  t.plan(3);
  var fa = new FixedArray(8,9,{abc:123});
  t.equal(fa.get(7,8).abc,123);
  t.equal(fa.get(0,1).abc,123);
  t.throws(function(){new FixedArray(0,1);});
});

test('getHeight and getWidth', function (t) {
  t.plan(2);
  var fa = new FixedArray(3,17);

  t.equal(fa.getHeight(),3);
  t.equal(fa.getWidth(),17);
});

test('get and set', function (t) {
  t.plan(3);
  var fa = new FixedArray(2,3);
  fa.set(1,2,'This is a string!');
  t.equal(fa.get(1,2),'This is a string!');
  t.throws(function(){fa.set(2,3);});
  t.throws(function(){fa.get(9,9);});
});

test('get correct row and column',function (t) {
  t.plan(6);
  var fa = new FixedArray(2,3);

  t.equal(fa.getRow(0).length,3);
  t.equal(fa.getColumn(1).length,2);

  fa.set(0,1,'This is a string!');
  t.equal(fa.getRow(0)[1],'This is a string!');
  t.equal(fa.getColumn(1)[0],'This is a string!');
  t.throws(function(){fa.getRow(2);});
  t.throws(function(){fa.getColumn(3);});
});

test('set row and column',function (t) {
  t.plan(8);
  var fa = new FixedArray(5,5,0);
  var newPillar = [1,2,3,4,5];

  fa.setRow(0,newPillar);
  t.deepEqual(fa.getRow(0),newPillar);
  fa.setColumn(0,newPillar);
  t.deepEqual(fa.getColumn(0),newPillar);

  t.throws(function(){fa.setRow(-1,newPillar);});
  t.throws(function(){fa.setColumn(-1,newPillar);});

  var smallPillar = [1,2];
  fa.setRow(0,smallPillar);
  t.equal(fa.getRow(0)[3],undefined);
  fa.setColumn(0,smallPillar);
  t.equal(fa.getColumn(0)[3],undefined);

  var largePillar = [1,2,3,4,5,6];
  t.throws(function(){fa.setRow(0,largePillar);});
  t.throws(function(){fa.setColumn(0,largePillar);});
});

test('forEach',function (t) {
  t.plan(1);
  var fa = new FixedArray(10,9,0);

  function fun(currentValue, index, array){
    array.set(index.x, index.y, currentValue+1);
  }

  fa.forEach(fun);
  t.equal(fa.get(0,0),1);
});

test('exception on index out of bounds', function (t) {
  t.plan(2);
  var fa = new FixedArray(2,3);
  t.throws(function(){fa.get(2,3);});
  t.throws(function(){fa.set(-1,-1);});
});

test('sameSize',function (t) {
  t.plan(3);
  var fa = new FixedArray(2,2);
  var faSameSize = new FixedArray(2,2);
  var faNotSameSize = new FixedArray(2,3);
  var nonfa = [2,2,2,2];

  t.true(fa.sameSize(faSameSize));
  t.false(fa.sameSize(faNotSameSize));
  t.throws(function(){fa.sameSize(nonfa);});
});

test('get correct number of neighbours',function (t) {
  t.plan(8);
  var fa = new FixedArray(9,10);
  var treatMeLikeANumber = 2;
  t.equal(fa.getNeighbours(5,5).length,8);
  t.equal(fa.getNeighbours(0,0).length,3);
  t.equal(fa.getNeighbours(1,0).length,5);
  t.equal(fa.getNeighbours(0,0,2).length,8);
  t.equal(fa.getNeighbours(2,2,2).length,24);
  t.equal(fa.getNeighbours(treatMeLikeANumber,treatMeLikeANumber,treatMeLikeANumber).length,24);
  t.equal(fa.getNeighbours(2,2,0).length,0);
  t.equal(fa.getNeighbours(2,2,-2).length,0);
});

test('areNeighbors',function (t) {
  t.plan(6);
  var fa = new FixedArray(10,10);
  t.true(fa.areNeighbours(0,0,1,1));
  t.false(fa.areNeighbours(0,0,2,2));
  t.true(fa.areNeighbours(0,0,2,2,2));
  t.throws(function(){fa.areNeighbours(-1,-1,0,0);});
  t.throws(function(){fa.areNeighbours(0,0,-1,1);});
  t.equal(fa.areNeighbours(0,0,1,1,0),false);
});

test('pushRow',function (t) {
  t.plan(4);
  var fa = new FixedArray(2,3);
  t.equal(fa.pushRow([1,2,3],[1,2]),4);
  t.equal(fa.get(3,2),undefined);
  t.throws(function(){fa.pushRow([1,2,3,4]);});
  t.equal(fa.pushRow(2),4);
});
