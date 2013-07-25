# ducktype

Data validation using a ducktype interface. For JavaScript and Node.js.

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

Example usage:

```js
// simple type
var number = ducktype(Number);
number.test(2.3);   // true
number.test('hi');  // false
number.test(true);  // false

// create a structured object
var person = ducktype({
  name: String,
  age: Number,
  address: {
    city: String,
    street: String,
    country:
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
  },
  phone: '123-45678'
}); // true

person.test({
  name: 'Mary',
  age: 26
}); // false
```

## API

A ducktype can be constructed as:

```
ducktype(type)
ducktype(type, options)
ducktype(type1, type2, ..., options)
```

Where:
- `type` is a type description. This can be another DuckType,
- `options` is an object with properties
  - A string `name` (optional)
  - A boolean `optional` (optional)
  - A boolean `nullable` (optional)

A created ducktype has methods:

- `test(object)`. A method which returns true when provided object matches
  the ducktype, and false otherwise.
- `validate(object)`. A method which will throw a TypeError when the provided
  object does not match the ducktype.


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
