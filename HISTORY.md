# ducktype history

https://github.com/josdejong/ducktype


## 2013-07-31, version 1.1.0

- Support for creating ducktype arrays containing a fixed number of elements
  with different types, which can be used for example to test function
  arguments.
- Ducktype has a new function `wrap(fn)`, which creates a wrapper around
  the provided function which validates the function arguments against the
  ducktype.
- Some minor internal improvements.


## 2013-07-26, version 1.0.0

- Added support for structured arrays, like `ducktype([Number])`.
- Support for combining types, like `ducktype(Number, String)`.
- Added basic types Array, Object, RegExp, null, undefined.


## 2013-07-25, version 0.0.1

- Created ducktype construction function.
- Basic types Boolean, Date, Function, Number, String
- Object interfaces and nested objects.
  Like `ducktype({name: String, Age: Number})`.
- Options `nullable` and `optional`.
