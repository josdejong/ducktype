# ducktype

Flexible data validation using a duck type interface for JavaScript and Node.js.

As JavaScript is a loosely typed language, any variable can contain any
type of data, and any type of data can be passed as arguments to any function.
When dealing with data inputs coming from external sources, there is a need
to validate the type and contents of the data. Ducktype offers an easy way
to validate both basic data types as well as complex structured data types
in a flexible way.

Replace this kind of type checking mess:

```js
function save (contact) {
  if (contact && isInteger(contact.id) && (contact.id > 0) && isString(contact.name) &&
      contact.address && isString(contact.address.city) && isString(contact.address.street)) {
    // ... save contact
  }
  else {
    throw new Error('Invalid contact');
  }
}
```

with this:

```js
var contactType = ducktype({
  id: ducktype(Number, {integer: true, min: 0}),
  name: String,
  address: {
    city: String,
    street: String,
  }
});

function save (contact) {
  contactType.validate(contact);
  // ... save contact
}
```


## Install

### npm

```sh
npm install ducktype
```

### bower

```sh
bower install ducktype
```

## Load

### Node.js

```js
var ducktype = require('ducktype');
```

### browser

```html
<!DOCTYPE HTML>
<html>
<head>
    <script src="ducktype.js" type="text/javascript"></script>
</head>
<body>
    <script type="text/javascript">
        // use ducktype...
    </script>
</body>
</html>
```

## Use

### Basic types

```js
// use built-in types
ducktype.number.test(2.3);      // true
ducktype.number.test('hi');     // false
ducktype.number.test(true);     // false
ducktype.date.test(new Date()); // true
ducktype.date.test(2.3);        // false
ducktype.string.test('hello');  // true

// create a ducktype
var type = ducktype(Number);
type.test(2.3);                 // true
type.test('hi');                // false
type.test(true);                // false

// create a ducktype with options
var nullableString = ducktype(String, {nullable: true});
nullableString.test('string');  // true
nullableString.test(null);      // true
nullableString.test(2.3);       // false
```

### Combined types

```js
// combination of types
var combi = ducktype(Number, String);
combi.test(2.3);   // true
combi.test('hi');  // true
combi.test(true);  // false
```

### Structured objects

```js
// structured object
var person = ducktype({
  name: String,
  age: Number,
  address: {
    city: String,
    street: String,
    country: String
  },
  email: ducktype(String, {optional: true})
});

person.test({
  name: 'John',
  age: 32,
  address: {
    city: 'Sunnyvale, CA 95125',
    street: '701 First Ave.',
    country: 'United States'
  }
}); // true

person.test({
  name: 'Mary',
  age: 26
}); // false
```

### Structured Arrays

```js
// structured arrays
var numberArray = ducktype([Number]);
numberArray.test([1, 2, 3]);        // true
numberArray.test([1, 'string', 3]); // false

// structured object and array
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

family.test({
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
}); // true

family.test({
  name: 'John',
  children: [
    {
      'firstName': 'Mary',
      'age': 6
    },
    {
      'firstName': 'Grant'
    }
  ]
}); // false
```

### Function arguments

```js
var type = ducktype([Number, Number]);

function add (a, b) {
  type.validate(arguments);
  return a + b;
}

var sum = add(2, 3);        // ok
var sum = add(2, 'string'); // will throw a TypeError
```

Alternatively, a ducktype wrapper can be created which validates the
function arguments against the ducktype:

```js
var add = ducktype([Number, Number]).wrap(function add (a, b) {
  return a + b;
});

var sum = add(2, 3);        // ok
var sum = add(2, 'string'); // will throw a TypeError
```


## API

### construction

A ducktype can be constructed as:

```
ducktype(type)
ducktype(type, options)
ducktype(type1, type2, ...)
ducktype(type1, type2, ..., options)
```

Where:
- `type` can be:
  - A basic type. Choose from `Array`, `Boolean`, `Date`, `Function`, `Number`,
    `Object`, `RegExp`, `String`, `null`, `undefined`.
  - Another ducktype.
  - An object. All properties of the object will be checked. Each property
    can be a basic type, ducktype, object, or array.
  - An array.
    An array can have zero, one or multiple elements which can be
    a basic type, ducktype, object, or array.
    Providing an array with *zero* elements will just return a `ducktype(Array)`.
    Providing an array with *one* element will return a ducktype which will
    test each of tested arrays elements against the given type,
    for example `ducktype([Number]).test(1, 2, 3)`.
    Providing an array with *multiple* elements will validate the length of
    the tested array, and validate each of the array elements one to one
    against the provided types. This can be used to test the number and type
    of function arguments. Example: `ducktype([Number, String]).test(2, 'str')`.

- `options` is an object which can contain properties:
  - A string `name`
  - A boolean `optional`
  - A boolean `nullable`
  - A boolean `integer`. Test whether a number has an integer value.
    Only applicable for Numbers.
  - A number `min`. Test whether a number is larger or equal to a minimum
    value. Only applicable for Numbers.
  - A number `max`. Test whether a number is smaller or equal to a maximum
    value. Only applicable for Numbers.

A created ducktype has functions:

- `test(object)`. A function which returns true when provided object matches
  the ducktype, and false otherwise.
- `validate(object)`. A function which will throw a TypeError when the provided
  object does not match the ducktype.
- `wrap(fn)`. Creates a wrapper function around the provided function, which
  validates the function arguments against the ducktype.
  Only applicable for ducktypes containing an array, as the ducktype is tested
  against an array with the function arguments.

### Built-in types

Ducktype comes with a set of built-in types:

- `ducktype.array`
- `ducktype.boolean`
- `ducktype.date`
- `ducktype.email`
- `ducktype.integer`
- `ducktype.function`
- `ducktype.number`
- `ducktype.object`
- `ducktype.regexp`
- `ducktype.string`
- `ducktype.null`
- `ducktype.undefined`
- `ducktype.url`

The built-in types can be used as:

```js
ducktype.number.test(2.3); // true
ducktype.string.test(2.3); // false
```


## Test

To execute tests for the library, run:

    npm test


## Roadmap

- Implement more options for specific types:
  - Number: finite, odd, even, positive, negative, nan, ...
  - String: lowercase, uppercase, alpha, alphanumeric, empty, ...
  - Array: length, length.min, length.max, ...
- Implement a parser accepting a string describing a type in
  [annotations](https://developers.google.com/closure/compiler/docs/js-for-compiler#types).
- Implement support to define your own tests for custom types.
- Implement non-strict type checking: when an object can be converted to the
  desired type, it is ok. For example a string containing a numeric value can
  be considered a valid Number, or a string containing an ISO date can be
  considered a valid Date.


## License

Copyright (C) 2013-2018 Jos de Jong <wjosdejong@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
