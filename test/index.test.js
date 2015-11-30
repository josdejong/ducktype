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
  t.same(type.test([2,3,4]), true);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});

test('Basic types - Boolean', function (t) {
  var type = ducktype(Boolean);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), true);
  t.same(type.test(false), true);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});

test('Basic types - Date', function (t) {
  var type = ducktype(Date);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), true);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});


test('Basic types - Function', function (t) {
  var type = ducktype(Function);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), true);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});


test('Basic types - Number', function (t) {
  var type = ducktype(Number);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), true);
  t.same(type.test(2.3), true);
  t.same(type.test(NaN), true);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});


test('Basic types - Object', function (t) {
  var type = ducktype(Object);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), true);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});


test('Basic types - String', function (t) {
  var type = ducktype(String);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), true);
  t.same(type.test('string'), true);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});


test('Basic types - RegExp', function (t) {
  var type = ducktype(RegExp);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), true);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});


test('Basic types - null', function (t) {
  var type = ducktype(null);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), true);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), false);
});


test('Basic types - undefined', function (t) {
  var type = ducktype(undefined);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), true);

  // prototype
  t.same(type.test(person), false);
});


test('Basic types - prototype', function (t) {
  var type = ducktype(Person);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), false);
  t.same(type.test(2.3), false);
  t.same(type.test(NaN), false);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);

  // prototype
  t.same(type.test(person), true);
});


test('Combination of two types', function (t) {
  var type = ducktype(String, Number);

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), true);
  t.same(type.test(2.3), true);
  t.same(type.test(NaN), true);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), true);
  t.same(type.test('string'), true);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);
});


test('Combination of three types', function (t) {
  var type = ducktype(String, Number, Array);

  // array
  t.same(type.test([2,3,4]), true);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), true);
  t.same(type.test(2.3), true);
  t.same(type.test(NaN), true);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), true);
  t.same(type.test('string'), true);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), false);
});


test('Options - nullable', function (t) {
  var type = ducktype(Number, {nullable: true});

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), true);
  t.same(type.test(2.3), true);
  t.same(type.test(NaN), true);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), true);
  t.same(type.test(undefined), false);
});


test('Options - optional', function (t) {
  var type = ducktype(Number, {optional: true});

  // array
  t.same(type.test([2,3,4]), false);

  // boolean
  t.same(type.test(true), false);
  t.same(type.test(false), false);

  // date
  t.same(type.test(new Date()), false);

  // function
  t.same(type.test(function () {}), false);

  // number
  t.same(type.test(0), true);
  t.same(type.test(2.3), true);
  t.same(type.test(NaN), true);

  // object
  t.same(type.test({a:2}), false);

  // string
  t.same(type.test('2.3'), false);
  t.same(type.test('string'), false);

  // regexp
  t.same(type.test(/regexp/), false);

  // null, undefined
  t.same(type.test(null), false);
  t.same(type.test(undefined), true);
});


test('Options - integer', function (t) {
  var type = ducktype(Number, {
    integer: true
  });

  t.same(type.test(0), true);
  t.same(type.test(2.3), false);
  t.same(type.test(3), true);
  t.same(type.test(-3), true);
  t.same(type.test(3e2), true);
  t.same(type.test("23"), false);
  t.same(type.test("str"), false);
});

test('Options - min', function (t) {
  var type = ducktype(Number, {
    min: 5
  });

  t.same(type.test(0), false);
  t.same(type.test(5.3), true);
  t.same(type.test(5), true);
  t.same(type.test(new Date()), false);
  t.same(type.test(-5), false);
  t.same(type.test("23"), false);
  t.same(type.test("str"), false);
});


test('Options - max', function (t) {
  var type = ducktype(Number, {
    max: 5
  });

  t.same(type.test(0), true);
  t.same(type.test(5.3), false);
  t.same(type.test(5), true);
  t.same(type.test(-5), true);
  t.same(type.test(new Date()), false);
  t.same(type.test("23"), false);
  t.same(type.test("str"), false);
});


test('Options - min, max, integer', function (t) {
  var type = ducktype(Number, {
    integer: true,
    min: 1,
    max: 10
  });

  t.same(type.test(0), false);
  t.same(type.test(1), true);
  t.same(type.test(2), true);
  t.same(type.test(9), true);
  t.same(type.test(10), true);
  t.same(type.test(11), false);
  t.same(type.test(5.3), false);
  t.same(type.test(-5), false);
  t.same(type.test(new Date()), false);
  t.same(type.test("23"), false);
  t.same(type.test("str"), false);
});


test('Object - basic', function (t) {
  var type = ducktype({a: String, b: Number});
  t.same(type.test({a: 'hi', b: 23}), true);
  t.same(type.test({a: 'hi', b: 23, c: true}), true);
  t.same(type.test({a: 1, b: 23}), false);
  t.same(type.test({a: 'hi', b: '23'}), false);
  t.same(type.test({a: 'hi'}), false);
  t.same(type.test({b: 23}), false);
  t.same(type.test({}), false);
  t.same(type.test(function () {}), false);
});


test('Object - empty', function (t) {
  var type = ducktype({});

  t.same(type.test({a: 'hi', b: 23}), true);
  t.same(type.test({}), true);

  t.same(type.test(2), false);
  t.same(type.test('str'), false);
  t.same(type.test(new Date()), false);
  t.same(type.test([1,2,3]), false);
});


test('Object - nesting', function (t) {
  var type = ducktype({
    a: String,
    b: {
      c: Number,
      d: Boolean
    }
  });
  t.same(type.test({a: 'hi', b: {c: 2, d: true}}), true);
  t.same(type.test({a: 'hi', b: {c: 'hi', d: true}}), false);
  t.same(type.test({a: 'hi', b: {c: 'hi'}}), false);
  t.same(type.test({a: 'hi', b: 23}), false);
  t.same(type.test({a: 2, b: {c: 2, d: true}}), false);
  t.same(type.test({a: 'hi', b: {c: 2, d: 2}}), false);
  t.same(type.test({}), false);
});


test('Object - nesting (2)', function (t) {
  var type = ducktype({
    a: String,
    b: {
      c: Function
    }
  });
  t.same(type.test({a: 'hi', b: {c: function () {}}}), true);
  t.same(type.test({a: 2, b: {c: function () {}}}), false);
  t.same(type.test({a: 2, b: {c: 'bla'}}), false);
});


test('Object - optional fields', function (t) {
  var type = ducktype({
    a: String,
    b: ducktype(Number, {optional: true})
  });
  t.same(type.test({a: 'hi', b: 2}), true);
  t.same(type.test({a: 'hi'}), true);
  t.same(type.test({a: 2}), false);
  t.same(type.test({a: false, b: 2}), false);
  t.same(type.test({a: 'string', b: 'string'}), false);
});


test('Array - basic', function (t) {
  var type = ducktype([Number]);
  t.same(type.test([2, 4, 5]), true);
  t.same(type.test([2, 'string', 5]), false);
  t.same(type.test([null, 4, 5]), false);
  t.same(type.test([]), true);
});


test('Array - with object', function (t) {
  var type = ducktype([
    {
      a: String,
      b: Number
    }
  ]);

  t.same(type.test([]), true);
  t.same(type.test([{a: 's', b: 2}]), true);
  t.same(type.test([{a: 's', b: 2}, {a: 's', b: 2}]), true);
  t.same(type.test([{a: 's', b: 2}, {a: 's', b: 's'}]), false);
  t.same(type.test([{a: 's', b: 2}, {a: /regexp/, b: 2}]), false);
});


test('Array - undefined childs', function (t) {
  var type = ducktype([]);

  t.same(type.test([]), true);
  t.same(type.test([{a: 's', b: 2}]), true);
  t.same(type.test([{a: 's', b: 2}, {a: 's', b: 2}]), true);
  t.same(type.test([{a: 's', b: 2}, {a: 's', b: 's'}]), true);
  t.same(type.test([{a: 's', b: 2}, {a: /regexp/, b: 2}]), true);
});


test('Array - multiple childs', function (t) {
  var type = ducktype([Number, String]);

  t.same(type.test([]), false);
  t.same(type.test([2]), false);
  t.same(type.test([2, 'string']), true);
  t.same(type.test([2, 2]), false);
  t.same(type.test([false, 'string']), false);
  t.same(type.test([2, 'string', 3]), false);
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

  t.same(family.test({
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
    t.same(type.test(arguments), true);
  })(2, 'string');

  (function fn () {
    t.same(type.test(arguments), false);
  })(2, 'string', 3);

  (function fn () {
    t.same(type.test(arguments), false);
  })(2, 3);
});


test('Function wrapper', function (t) {
  var add = ducktype([Number, Number]).wrap(function (a, b) {
    return a + b;
  });

  t.ok(function () {
    add(2, 3);
  });

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

  t.same(ok.test('OK'), true);
  t.same(ok.test('ok'), false);
  t.same(ok.test(2), false);
  t.same(ok.test(null), false);
  t.same(ok.test(undefined), false);
  t.same(ok.test(), false);
});

test('Construct regexp', function (t) {
  var ok = ducktype.construct(/^OK$/);

  t.same(ok.test('OK'), true);
  t.same(ok.test('ok'), false);
  t.same(ok.test(2), false);
  t.same(ok.test(null), false);
  t.same(ok.test(undefined), false);
  t.same(ok.test(), false);
});


test('url', function (t) {
  var type = ducktype.url;

  t.same(type.test('http://google.com'), true);
  t.same(type.test('http://www.google.com'), true);
  t.same(type.test('http://google.nl'), true);
  t.same(type.test('ftp://mysite.com'), true);
  t.same(type.test('http://mysite.com:8080/bla'), true);
  t.same(type.test('http://192.168.0.1:8080'), true);
  t.same(type.test('http:/example.com'), false);
  t.same(type.test('http//example.com'), false);
  t.same(type.test('http://example'), false);
  t.same(type.test('www.google.com'), false);
});

test('email', function (t) {
  var type = ducktype.email;

  t.same(type.test('name@domain.com'), true);
  t.same(type.test('first.last@domain.com'), true);
  t.same(type.test('first_last@domain.com'), true);
  t.same(type.test('@domain.com'), false);
  t.same(type.test('domain.com'), false);
  t.same(type.test('http://domain.com'), false);
  t.same(type.test('fist last@domain.com'), false);
  t.same(type.test('name@domain'), false);
});

// TODO: extensively test integer

test('Attached types', function (t) {
  t.same(ducktype.array.test([]), true);
  t.same(ducktype.array.test(123), false);

  t.same(ducktype.boolean.test(true), true);
  t.same(ducktype.boolean.test(123), false);

  t.same(ducktype.date.test(new Date()), true);
  t.same(ducktype.date.test('str'), false);

  t.same(ducktype.function.test(function () {}), true);
  t.same(ducktype.function.test('str'), false);

  t.same(ducktype.number.test(23), true);
  t.same(ducktype.number.test('str'), false);

  t.same(ducktype.object.test({}), true);
  t.same(ducktype.object.test('str'), false);

  t.same(ducktype.regexp.test(/regexp/), true);
  t.same(ducktype.regexp.test(123), false);

  t.same(ducktype.string.test('hello world'), true);
  t.same(ducktype.string.test(123), false);

  t.same(ducktype.null.test(null), true);
  t.same(ducktype.null.test(0), false);

  t.same(ducktype.undefined.test(undefined), true);
  t.same(ducktype.undefined.test(null), false);

  t.same(ducktype.url.test('http://example.com'), true);
  t.same(ducktype.url.test('some string'), false);

  t.same(ducktype.email.test('name@email.com'), true);
  t.same(ducktype.email.test('some string'), false);

  t.same(ducktype.integer.test(123), true);
  t.same(ducktype.integer.test(123.4), false);
});
