var test = require('ava');
var ducktype = require('../ducktype');

// create a prototype
function Person (name, age) {
  this.name = name;
  this.age = age;
}
var person = new Person('John', 28);

test('Basic types - Array', function (t) {
  var type = ducktype(Array);

  // array
  t.is(type.test([2,3,4]), true);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});

test('Basic types - Boolean', function (t) {
  var type = ducktype(Boolean);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), true);
  t.is(type.test(false), true);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});

test('Basic types - Date', function (t) {
  var type = ducktype(Date);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), true);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});


test('Basic types - Function', function (t) {
  var type = ducktype(Function);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), true);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});


test('Basic types - Number', function (t) {
  var type = ducktype(Number);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), true);
  t.is(type.test(2.3), true);
  t.is(type.test(NaN), true);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});


test('Basic types - Object', function (t) {
  var type = ducktype(Object);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), true);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});


test('Basic types - String', function (t) {
  var type = ducktype(String);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), true);
  t.is(type.test('string'), true);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});


test('Basic types - RegExp', function (t) {
  var type = ducktype(RegExp);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), true);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});


test('Basic types - null', function (t) {
  var type = ducktype(null);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), true);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), false);
});


test('Basic types - undefined', function (t) {
  var type = ducktype(undefined);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), true);

  // prototype
  t.is(type.test(person), false);
});


test('Basic types - prototype', function (t) {
  var type = ducktype(Person);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), false);
  t.is(type.test(2.3), false);
  t.is(type.test(NaN), false);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);

  // prototype
  t.is(type.test(person), true);
});


test('Combination of two types', function (t) {
  var type = ducktype(String, Number);

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), true);
  t.is(type.test(2.3), true);
  t.is(type.test(NaN), true);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), true);
  t.is(type.test('string'), true);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);
});


test('Combination of three types', function (t) {
  var type = ducktype(String, Number, Array);

  // array
  t.is(type.test([2,3,4]), true);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), true);
  t.is(type.test(2.3), true);
  t.is(type.test(NaN), true);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), true);
  t.is(type.test('string'), true);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), false);
});


test('Options - nullable', function (t) {
  var type = ducktype(Number, {nullable: true});

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), true);
  t.is(type.test(2.3), true);
  t.is(type.test(NaN), true);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), true);
  t.is(type.test(undefined), false);
});


test('Options - optional', function (t) {
  var type = ducktype(Number, {optional: true});

  // array
  t.is(type.test([2,3,4]), false);

  // boolean
  t.is(type.test(true), false);
  t.is(type.test(false), false);

  // date
  t.is(type.test(new Date()), false);

  // function
  t.is(type.test(function () {}), false);

  // number
  t.is(type.test(0), true);
  t.is(type.test(2.3), true);
  t.is(type.test(NaN), true);

  // object
  t.is(type.test({a:2}), false);

  // string
  t.is(type.test('2.3'), false);
  t.is(type.test('string'), false);

  // regexp
  t.is(type.test(/regexp/), false);

  // null, undefined
  t.is(type.test(null), false);
  t.is(type.test(undefined), true);
});


test('Options - integer', function (t) {
  var type = ducktype(Number, {
    integer: true
  });

  t.is(type.test(0), true);
  t.is(type.test(2.3), false);
  t.is(type.test(3), true);
  t.is(type.test(-3), true);
  t.is(type.test(3e2), true);
  t.is(type.test("23"), false);
  t.is(type.test("str"), false);
});

test('Options - min', function (t) {
  var type = ducktype(Number, {
    min: 5
  });

  t.is(type.test(0), false);
  t.is(type.test(5.3), true);
  t.is(type.test(5), true);
  t.is(type.test(new Date()), false);
  t.is(type.test(-5), false);
  t.is(type.test("23"), false);
  t.is(type.test("str"), false);
});


test('Options - max', function (t) {
  var type = ducktype(Number, {
    max: 5
  });

  t.is(type.test(0), true);
  t.is(type.test(5.3), false);
  t.is(type.test(5), true);
  t.is(type.test(-5), true);
  t.is(type.test(new Date()), false);
  t.is(type.test("23"), false);
  t.is(type.test("str"), false);
});


test('Options - min, max, integer', function (t) {
  var type = ducktype(Number, {
    integer: true,
    min: 1,
    max: 10
  });

  t.is(type.test(0), false);
  t.is(type.test(1), true);
  t.is(type.test(2), true);
  t.is(type.test(9), true);
  t.is(type.test(10), true);
  t.is(type.test(11), false);
  t.is(type.test(5.3), false);
  t.is(type.test(-5), false);
  t.is(type.test(new Date()), false);
  t.is(type.test("23"), false);
  t.is(type.test("str"), false);
});


test('Object - basic', function (t) {
  var type = ducktype({a: String, b: Number});
  t.is(type.test({a: 'hi', b: 23}), true);
  t.is(type.test({a: 'hi', b: 23, c: true}), true);
  t.is(type.test({a: 1, b: 23}), false);
  t.is(type.test({a: 'hi', b: '23'}), false);
  t.is(type.test({a: 'hi'}), false);
  t.is(type.test({b: 23}), false);
  t.is(type.test({}), false);
  t.is(type.test(function () {}), false);
});


test('Object - empty', function (t) {
  var type = ducktype({});

  t.is(type.test({a: 'hi', b: 23}), true);
  t.is(type.test({}), true);

  t.is(type.test(2), false);
  t.is(type.test('str'), false);
  t.is(type.test(new Date()), false);
  t.is(type.test([1,2,3]), false);
});


test('Object - nesting', function (t) {
  var type = ducktype({
    a: String,
    b: {
      c: Number,
      d: Boolean
    }
  });
  t.is(type.test({a: 'hi', b: {c: 2, d: true}}), true);
  t.is(type.test({a: 'hi', b: {c: 'hi', d: true}}), false);
  t.is(type.test({a: 'hi', b: {c: 'hi'}}), false);
  t.is(type.test({a: 'hi', b: 23}), false);
  t.is(type.test({a: 2, b: {c: 2, d: true}}), false);
  t.is(type.test({a: 'hi', b: {c: 2, d: 2}}), false);
  t.is(type.test({}), false);
});


test('Object - nesting (2)', function (t) {
  var type = ducktype({
    a: String,
    b: {
      c: Function
    }
  });
  t.is(type.test({a: 'hi', b: {c: function () {}}}), true);
  t.is(type.test({a: 2, b: {c: function () {}}}), false);
  t.is(type.test({a: 2, b: {c: 'bla'}}), false);
});


test('Object - optional fields', function (t) {
  var type = ducktype({
    a: String,
    b: ducktype(Number, {optional: true})
  });
  t.is(type.test({a: 'hi', b: 2}), true);
  t.is(type.test({a: 'hi'}), true);
  t.is(type.test({a: 2}), false);
  t.is(type.test({a: false, b: 2}), false);
  t.is(type.test({a: 'string', b: 'string'}), false);
});


test('Array - basic', function (t) {
  var type = ducktype([Number]);
  t.is(type.test([2, 4, 5]), true);
  t.is(type.test([2, 'string', 5]), false);
  t.is(type.test([null, 4, 5]), false);
  t.is(type.test([]), true);
});


test('Array - with object', function (t) {
  var type = ducktype([
    {
      a: String,
      b: Number
    }
  ]);

  t.is(type.test([]), true);
  t.is(type.test([{a: 's', b: 2}]), true);
  t.is(type.test([{a: 's', b: 2}, {a: 's', b: 2}]), true);
  t.is(type.test([{a: 's', b: 2}, {a: 's', b: 's'}]), false);
  t.is(type.test([{a: 's', b: 2}, {a: /regexp/, b: 2}]), false);
});


test('Array - undefined childs', function (t) {
  var type = ducktype([]);

  t.is(type.test([]), true);
  t.is(type.test([{a: 's', b: 2}]), true);
  t.is(type.test([{a: 's', b: 2}, {a: 's', b: 2}]), true);
  t.is(type.test([{a: 's', b: 2}, {a: 's', b: 's'}]), true);
  t.is(type.test([{a: 's', b: 2}, {a: /regexp/, b: 2}]), true);
});


test('Array - multiple childs', function (t) {
  var type = ducktype([Number, String]);

  t.is(type.test([]), false);
  t.is(type.test([2]), false);
  t.is(type.test([2, 'string']), true);
  t.is(type.test([2, 2]), false);
  t.is(type.test([false, 'string']), false);
  t.is(type.test([2, 'string', 3]), false);
});


test('Object with Array with Object', function (t) {
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

  t.is(family.test({
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
});


test('Function arguments', function (t) {
  var type = ducktype([Number, String]);

  (function fn () {
    t.is(type.test(arguments), true);
  })(2, 'string');

  (function fn () {
    t.is(type.test(arguments), false);
  })(2, 'string', 3);

  (function fn () {
    t.is(type.test(arguments), false);
  })(2, 3);
});


test('Function wrapper', function (t) {
  var add = ducktype([Number, Number]).wrap(function (a, b) {
    return a + b;
  });

  t.is(add(2, 3), 5); // should not throw an exception

  t.throws(function () {
    add(2, 'string');
  }, TypeError);

  t.throws(function () {
    add(2, 3, 4);
  }, TypeError);

  t.throws(function () {
    add(2);
  }, TypeError);
});

test('Construct function', function (t) {
  var ok = ducktype.construct(function (object) {
    return (object === 'OK');
  });

  t.is(ok.test('OK'), true);
  t.is(ok.test('ok'), false);
  t.is(ok.test(2), false);
  t.is(ok.test(null), false);
  t.is(ok.test(undefined), false);
  t.is(ok.test(), false);
});

test('Construct regexp', function (t) {
  var ok = ducktype.construct(/^OK$/);

  t.is(ok.test('OK'), true);
  t.is(ok.test('ok'), false);
  t.is(ok.test(2), false);
  t.is(ok.test(null), false);
  t.is(ok.test(undefined), false);
  t.is(ok.test(), false);
});


test('url', function (t) {
  var type = ducktype.url;

  t.is(type.test('http://google.com'), true);
  t.is(type.test('http://www.google.com'), true);
  t.is(type.test('http://google.nl'), true);
  t.is(type.test('ftp://mysite.com'), true);
  t.is(type.test('http://mysite.com:8080/bla'), true);
  t.is(type.test('http://192.168.0.1:8080'), true);
  t.is(type.test('http:/example.com'), false);
  t.is(type.test('http//example.com'), false);
  t.is(type.test('http://example'), false);
  t.is(type.test('http://example.com?a=2&b=a%2Bb'), true);
  t.is(type.test('www.google.com'), false);
});

test('email', function (t) {
  var type = ducktype.email;

  t.is(type.test('name@domain.com'), true);
  t.is(type.test('first.last@domain.com'), true);
  t.is(type.test('first_last@domain.com'), true);
  t.is(type.test('@domain.com'), false);
  t.is(type.test('domain.com'), false);
  t.is(type.test('http://domain.com'), false);
  t.is(type.test('fist last@domain.com'), false);
  t.is(type.test('name@domain'), false);
});

// TODO: extensively test integer

test('Attached types', function (t) {
  t.is(ducktype.array.test([]), true);
  t.is(ducktype.array.test(123), false);

  t.is(ducktype.boolean.test(true), true);
  t.is(ducktype.boolean.test(123), false);

  t.is(ducktype.date.test(new Date()), true);
  t.is(ducktype.date.test('str'), false);

  t.is(ducktype.function.test(function () {}), true);
  t.is(ducktype.function.test('str'), false);

  t.is(ducktype.number.test(23), true);
  t.is(ducktype.number.test('str'), false);

  t.is(ducktype.object.test({}), true);
  t.is(ducktype.object.test('str'), false);

  t.is(ducktype.regexp.test(/regexp/), true);
  t.is(ducktype.regexp.test(123), false);

  t.is(ducktype.string.test('hello world'), true);
  t.is(ducktype.string.test(123), false);

  t.is(ducktype.null.test(null), true);
  t.is(ducktype.null.test(0), false);

  t.is(ducktype.undefined.test(undefined), true);
  t.is(ducktype.undefined.test(null), false);

  t.is(ducktype.url.test('http://example.com'), true);
  t.is(ducktype.url.test('some string'), false);

  t.is(ducktype.email.test('name@email.com'), true);
  t.is(ducktype.email.test('some string'), false);

  t.is(ducktype.integer.test(123), true);
  t.is(ducktype.integer.test(123.4), false);
});
