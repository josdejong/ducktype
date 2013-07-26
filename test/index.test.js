/**
 * tests
 *
 * run these tests as:
 *
 *     nodeunit index.test.js
 */
var ducktype = require('../ducktype.js');


exports['Basic types - Number'] = function(test) {
  // strict
  var type = ducktype(Number);
  test.same(type.test(2.3), true);
  test.same(type.test('2.3'), false);
  test.same(type.test('2.3e2'), false);
  test.same(type.test(new Date()), false);
  test.same(type.test(true), false);
  test.same(type.test({a:2}), false);
  test.same(type.test([2,3,4]), false);
  test.same(type.test(/regexp/), false);
  test.same(type.test(null), false);
  test.same(type.test(NaN), true);  // TODO: should this return true?
  test.same(type.test(undefined), false);
  test.same(type.test(function () {}), false);
/* TODO
  // non-strict
  type.strict = false;
  test.same(type.test(2.3), true);
  test.same(type.test('2.3'), true);
  test.same(type.test('2.3e2'), true);
  test.same(type.test(new Date()), true);
  test.same(type.test(true), true);
  test.same(type.test({a:2}), false);
  test.same(type.test([2,3,4]), false);
  test.same(type.test(/regexp/), false);
  test.same(type.test('string'), false);
  test.same(type.test(null), true);
  test.same(type.test(NaN), true);  // TODO: should this return true?
  test.same(type.test(undefined), false);
  test.same(type.test(function () {}), false);
*/
  test.done();
};

exports['Basic types - String'] = function(test) {
  // strict
  var type = ducktype(String);
  test.same(type.test(2.3), false);
  test.same(type.test('2.3'), true);
  test.same(type.test('2.3e2'), true);
  test.same(type.test(new Date()), false);
  test.same(type.test(true), false);
  test.same(type.test({a:2}), false);
  test.same(type.test([2,3,4]), false);
  test.same(type.test(/regexp/), false);
  test.same(type.test('string'), true);
  test.same(type.test(function () {}), false);
/* TODO
  // non-strict
  type.strict = false;
  test.same(type.test(2.3), true);
  test.same(type.test('2.3'), true);
  test.same(type.test('2.3e2'), true);
  test.same(type.test(new Date()), true);
  test.same(type.test(true), true);
  test.same(type.test({a:2}), false);
  test.same(type.test([2,3,4]), false);
  test.same(type.test(/regexp/), false);
  test.same(type.test('string'), true);
  test.same(type.test(function () {}), false);
*/
  test.done();
};

exports['Basic types - Function'] = function(test) {
  // strict
  var type = ducktype(Function);
  test.same(type.test(2.3), false);
  test.same(type.test('2.3'), false);
  test.same(type.test('2.3e2'), false);
  test.same(type.test(new Date()), false);
  test.same(type.test(true), false);
  test.same(type.test({a:2}), false);
  test.same(type.test([2,3,4]), false);
  test.same(type.test(/regexp/), false);
  test.same(type.test('string'), false);
  test.same(type.test(function () {}), true);
/* TODO
  // non-strict
  type.strict = false;
  test.same(type.test(2.3), false);
  test.same(type.test('2.3'), false);
  test.same(type.test('2.3e2'), false);
  test.same(type.test(new Date()), false);
  test.same(type.test(true), false);
  test.same(type.test({a:2}), false);
  test.same(type.test([2,3,4]), false);
  test.same(type.test(/regexp/), false);
  test.same(type.test('string'), false);
  test.same(type.test(function () {}), true);
*/
  test.done();
};

// TODO: test options nullable and optional

exports['Combination of types'] = function(test) {
  // strict
  var type = ducktype(Number, Boolean);
  test.same(type.test(2.3), true);
  test.same(type.test(false), true);
  test.same(type.test(true), true);
  test.same(type.test('23'), false);
  test.same(type.test('string'), false);
  test.same(type.test({}), false);
  test.same(type.test(new Date()), false);
  test.same(type.test([1,2,3]), false);
  test.same(type.test(/regexp/), false);
  test.same(type.test(function() {}), false);

  // strict
  type = ducktype(Boolean, Number);
  test.same(type.test(2.3), true);
  test.same(type.test(false), true);
  test.same(type.test(true), true);
  test.same(type.test('23'), false);
  test.same(type.test('string'), false);
  test.same(type.test({}), false);
  test.same(type.test(new Date()), false);
  test.same(type.test([1,2,3]), false);
  test.same(type.test(/regexp/), false);
  test.same(type.test(function() {}), false);

  test.done();
};

exports['Object - basic'] = function(test) {
  // strict
  var type = ducktype({a: String, b: Number});
  test.same(type.test({a: 'hi', b: 23}), true);
  test.same(type.test({a: 'hi', b: 23, c: true}), true);
  test.same(type.test({a: 1, b: 23}), false);
  test.same(type.test({a: 'hi', b: '23'}), false);
  test.same(type.test({a: 'hi'}), false);
  test.same(type.test({b: 23}), false);
  test.same(type.test({}), false);
  test.same(type.test(function () {}), false);
/* TODO
  // non-strict
  type.strict = false;
  test.same(type.test({a: 'hi', b: 23}), true);
  test.same(type.test({a: 'hi', b: 23, c: true}), true);
  test.same(type.test({a: 1, b: 23}), true);
  test.same(type.test({a: 'hi', b: '23'}), true);
  test.same(type.test({a: 'hi'}), false);
  test.same(type.test({b: 23}), false);
  test.same(type.test({}), false);
  test.same(type.test(function () {}), false);
*/
  test.done();
};

exports['Object - nesting'] = function(test) {
  // strict
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
/* TODO
  // non-strict
  type.strict = false;
  test.same(type.test({a: 'hi', b: {c: 2, d: true}}), true);
  test.same(type.test({a: 'hi', b: {c: 'hi', d: true}}), false);
  test.same(type.test({a: 'hi', b: {c: 'hi'}}), false);
  test.same(type.test({a: 'hi', b: 23}), false);
  test.same(type.test({a: 2, b: {c: 2, d: true}}), true);
  test.same(type.test({a: 'hi', b: {c: 2, d: 2}}), true);
  test.same(type.test({}), false);
*/
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
