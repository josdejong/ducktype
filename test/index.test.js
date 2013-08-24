/**
 * tests
 *
 * run these tests as:
 *
 *     nodeunit index.test.js
 */
var ducktype = require('../ducktype.js');


// create a prototype
function Person (name, age) {
  this.name = name;
  this.age = age;
}
var person = new Person('John', 28);


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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

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

  // prototype
  test.same(type.test(person), false);

  test.done();
};


exports['Basic types - prototype'] = function (test) {
  var type = ducktype(Person);

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
  test.same(type.test(undefined), false);

  // prototype
  test.same(type.test(person), true);

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


exports['Object - empty'] = function(test) {
  var type = ducktype({});

  test.same(type.test({a: 'hi', b: 23}), true);
  test.same(type.test({}), true);

  test.same(type.test(2), false);
  test.same(type.test('str'), false);
  test.same(type.test(new Date()), false);
  test.same(type.test([1,2,3]), false);

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


exports['Array - basic'] = function(test) {
  var type = ducktype([Number]);
  test.same(type.test([2, 4, 5]), true);
  test.same(type.test([2, 'string', 5]), false);
  test.same(type.test([null, 4, 5]), false);
  test.same(type.test([]), true);

  test.done();
};


exports['Array - with object'] = function(test) {
  var type = ducktype([
    {
      a: String,
      b: Number
    }
  ]);

  test.same(type.test([]), true);
  test.same(type.test([{a: 's', b: 2}]), true);
  test.same(type.test([{a: 's', b: 2}, {a: 's', b: 2}]), true);
  test.same(type.test([{a: 's', b: 2}, {a: 's', b: 's'}]), false);
  test.same(type.test([{a: 's', b: 2}, {a: /regexp/, b: 2}]), false);

  test.done();
};


exports['Array - undefined childs'] = function(test) {
  var type = ducktype([]);

  test.same(type.test([]), true);
  test.same(type.test([{a: 's', b: 2}]), true);
  test.same(type.test([{a: 's', b: 2}, {a: 's', b: 2}]), true);
  test.same(type.test([{a: 's', b: 2}, {a: 's', b: 's'}]), true);
  test.same(type.test([{a: 's', b: 2}, {a: /regexp/, b: 2}]), true);

  test.done();
};


exports['Array - multiple childs'] = function(test) {
  var type = ducktype([Number, String]);

  test.same(type.test([]), false);
  test.same(type.test([2]), false);
  test.same(type.test([2, 'string']), true);
  test.same(type.test([2, 2]), false);
  test.same(type.test([false, 'string']), false);
  test.same(type.test([2, 'string', 3]), false);

  test.done();
};


exports['Object with Array with Object'] = function (test) {
  var family = ducktype({
    name: String,
    age: ducktype(Number, {optional: true}),
    children: [
      {
        name: String,
        age: ducktype(Number, {optional: true})
      }
    ]
  });

  test.same(family.test({
    name: 'John',
    children: [
      {
        'name': 'Mary',
        'age': 6
      },
      {
        'name': 'Grant'
      }
    ]
  }), true);

  test.done();
};


exports['Function arguments'] = function(test) {
  var type = ducktype([Number, String]);

  (function fn () {
    test.same(type.test(arguments), true);
  })(2, 'string');

  (function fn () {
    test.same(type.test(arguments), false);
  })(2, 'string', 3);

  (function fn () {
    test.same(type.test(arguments), false);
  })(2, 3);

  test.done();
};


exports['Function wrapper'] = function(test) {
  var add = ducktype([Number, Number]).wrap(function (a, b) {
    return a + b;
  });

  test.ok(function () {
    add(2, 3);
  });

  test.throws(function () {
    add(2, 'string');
  }, TypeError);

  test.throws(function () {
    add(2, 3, 4);
  }, TypeError);

  test.throws(function () {
    add(2);
  }, TypeError);

  test.done();
};

exports['Construct function'] = function(test) {
  var ok = ducktype.construct(function (object) {
    return (object === 'OK');
  });

  test.same(ok.test('OK'), true);
  test.same(ok.test('ok'), false);
  test.same(ok.test(2), false);
  test.same(ok.test(null), false);
  test.same(ok.test(undefined), false);
  test.same(ok.test(), false);

  test.done();
};

exports['Construct regexp'] = function(test) {
  var ok = ducktype.construct(/^OK$/);

  test.same(ok.test('OK'), true);
  test.same(ok.test('ok'), false);
  test.same(ok.test(2), false);
  test.same(ok.test(null), false);
  test.same(ok.test(undefined), false);
  test.same(ok.test(), false);

  test.done();
};


// TODO: test the build-in types


exports['url'] = function (test) {
  var type = ducktype.url;

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
  test.same(type.test(undefined), false);

  // type
  test.same(type.test('http://google.com'), true);
  test.same(type.test('http://www.google.com'), true);
  test.same(type.test('http://google.nl'), true);
  test.same(type.test('ftp://mysite.com'), true);
  test.same(type.test('http://mysite.com:8080/bla'), true);
  test.same(type.test('http:/example.com'), false);
  test.same(type.test('http//example.com'), false);
  test.same(type.test('http://example'), false);
  test.same(type.test('www.google.com'), false);

  test.done();
};

exports['email'] = function (test) {
  var type = ducktype.email;

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
  test.same(type.test(undefined), false);

  // type
  test.same(type.test('name@domain.com'), true);
  test.same(type.test('first.last@domain.com'), true);
  test.same(type.test('first_last@domain.com'), true);
  test.same(type.test('@domain.com'), false);
  test.same(type.test('domain.com'), false);
  test.same(type.test('http://domain.com'), false);
  test.same(type.test('fist last@domain.com'), false);
  test.same(type.test('name@domain'), false);

  test.done();
};


