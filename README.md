# ducktype

Flexible data validation using a ducktype interface. For JavaScript and Node.js.

As JavaScript is a loosely typed language, any variable can contain any
type of data, and any type of data can be passed as arguments any function.
When dealing with data inputs coming from external sources, there is a need
to validate the type and contents of the data. Ducktype offers an easy way
to validate both basic data types as well as complex structured data types
in a flexible way.

```js
var ducktype = require('ducktype');

var person = ducktype({
  name: String,
  age: Number
});

person.test({name: 'John', age: 34}); // true
person.test({name: 'Mary'});          // false
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
// basic types
var number = ducktype(Number);
number.test(2.3);   // true
number.test('hi');  // false
number.test(true);  // false

// built-in types
ducktype.string.test('string'); // true
ducktype.string.test(2.3);      // false
ducktype.number.test(2.3);      // true

// types with options
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
- `type` is a type like `Number` or another DuckType.
- `options` is an object with properties:
  - A string `name` (optional)
  - A boolean `optional` (optional)
  - A boolean `nullable` (optional)

A created ducktype has methods:

- `test(object)`. A method which returns true when provided object matches
  the ducktype, and false otherwise.
- `validate(object)`. A method which will throw a TypeError when the provided
  object does not match the ducktype.

Example:

```js
var myType = ducktype(String, {nullable: true});
myType.test('string');  // true
myType.test(null);      // true
myType.validate(2.3);   // will throw a TypeError
```


### functions

The ducktype constructor contains the following built-in types:

- `ducktype.array`
- `ducktype.boolean`
- `ducktype.date`
- `ducktype.function`
- `ducktype.number`
- `ducktype.object`
- `ducktype.regexp`
- `ducktype.string`
- `ducktype.null`
- `ducktype.undefined`

These types can be used as:

```js
ducktype.number.test(2.3);  // true
```
which is equivalent to:

```js
ducktype(Number).test(2.3); // true
```


## Test

To execute tests for the library, run:

    npm test


## License

Copyright (C) 2013 Jos de Jong <wjosdejong@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
