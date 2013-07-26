/**
 * tests
 *
 * run these tests as:
 *
 *     nodeunit index.test.js
 */
var ducktype = require('../ducktype.js');


exports['Basic types - Array'] = function(test) {
  var type = ducktype(Array);

  // array
  test.same(type.test([2,3,4]), true);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Basic types - Boolean'] = function(test) {
  var type = ducktype(Boolean);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), true);
  test.same(type.test(false), true);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Basic types - Date'] = function(test) {
  var type = ducktype(Date);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), true);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Basic types - Function'] = function(test) {
  var type = ducktype(Function);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), true);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Basic types - Number'] = function(test) {
  var type = ducktype(Number);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), true);
  test.same(type.test(2.3), true);
  test.same(type.test(NaN), true);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Basic types - Object'] = function(test) {
  var type = ducktype(Object);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), true);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};

exports['Basic types - String'] = function(test) {
  var type = ducktype(String);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), true);
  test.same(type.test('string'), true);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Basic types - RegExp'] = function(test) {
  var type = ducktype(RegExp);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), true);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Basic types - null'] = function(test) {
  var type = ducktype(null);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), true);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Basic types - undefined'] = function(test) {
  var type = ducktype(undefined);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), false);
  test.same(type.test(2.3), false);
  test.same(type.test(NaN), false);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), true);

  test.done();
};


exports['Combination of two types'] = function(test) {
  var type = ducktype(String, Number);

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), true);
  test.same(type.test(2.3), true);
  test.same(type.test(NaN), true);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), true);
  test.same(type.test('string'), true);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Combination of three types'] = function(test) {
  var type = ducktype(String, Number, Array);

  // array
  test.same(type.test([2,3,4]), true);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), true);
  test.same(type.test(2.3), true);
  test.same(type.test(NaN), true);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), true);
  test.same(type.test('string'), true);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), false);

  test.done();
};


exports['Options - nullable'] = function(test) {
  var type = ducktype(Number, {nullable: true});

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), true);
  test.same(type.test(2.3), true);
  test.same(type.test(NaN), true);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), true);
  test.same(type.test(undefined), false);

  test.done();
};

exports['Options - optional'] = function(test) {
  var type = ducktype(Number, {optional: true});

  // array
  test.same(type.test([2,3,4]), false);

  // boolean
  test.same(type.test(true), false);
  test.same(type.test(false), false);

  // date
  test.same(type.test(new Date()), false);

  // function
  test.same(type.test(function () {}), false);

  // number
  test.same(type.test(0), true);
  test.same(type.test(2.3), true);
  test.same(type.test(NaN), true);

  // object
  test.same(type.test({a:2}), false);

  // string
  test.same(type.test('2.3'), false);
  test.same(type.test('string'), false);

  // regexp
  test.same(type.test(/regexp/), false);

  // null, undefined
  test.same(type.test(null), false);
  test.same(type.test(undefined), true);

  test.done();
};


exports['Object - basic'] = function(test) {
  var type = ducktype({a: String, b: Number});
  test.same(type.test({a: 'hi', b: 23}), true);
  test.same(type.test({a: 'hi', b: 23, c: true}), true);
  test.same(type.test({a: 1, b: 23}), false);
  test.same(type.test({a: 'hi', b: '23'}), false);
  test.same(type.test({a: 'hi'}), false);
  test.same(type.test({b: 23}), false);
  test.same(type.test({}), false);
  test.same(type.test(function () {}), false);

  test.done();
};

exports['Object - nesting'] = function(test) {
  var type = ducktype({
    a: String,
    b: {
      c: Number,
      d: Boolean
    }
  });
  test.same(type.test({a: 'hi', b: {c: 2, d: true}}), true);
  test.same(type.test({a: 'hi', b: {c: 'hi', d: true}}), false);
  test.same(type.test({a: 'hi', b: {c: 'hi'}}), false);
  test.same(type.test({a: 'hi', b: 23}), false);
  test.same(type.test({a: 2, b: {c: 2, d: true}}), false);
  test.same(type.test({a: 'hi', b: {c: 2, d: 2}}), false);
  test.same(type.test({}), false);

  test.done();
};

exports['Object - nesting (2)'] = function(test) {
  var type = ducktype({
    a: String,
    b: {
      c: Function
    }
  });
  test.same(type.test({a: 'hi', b: {c: function () {}}}), true);
  test.same(type.test({a: 2, b: {c: function () {}}}), false);
  test.same(type.test({a: 2, b: {c: 'bla'}}), false);

  test.done();
};

exports['Object - optional fields'] = function(test) {
  var type = ducktype({
    a: String,
    b: ducktype(Number, {optional: true})
  });
  test.same(type.test({a: 'hi', b: 2}), true);
  test.same(type.test({a: 'hi'}), true);
  test.same(type.test({a: 2}), false);
  test.same(type.test({a: false, b: 2}), false);
  test.same(type.test({a: 'string', b: 'string'}), false);

  test.done();
};
