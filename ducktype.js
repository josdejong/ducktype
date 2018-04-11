/**
 * ducktype
 *
 * Data validation using a ducktype interface. For JavaScript and Node.js.
 *
 * Load
 *    var ducktype = require('ducktype');
 *
 * Syntax:
 *     ducktype(type)
 *     ducktype(type, options)
 *     ducktype(type1, type2, ...)
 *     ducktype(type1, type2, ..., options)
 *
 * Where:
 *    type    is a type description
 *    options is an object with properties:
 *        name: String      (optional)
 *        optional: Boolean (optional)
 *        nullable: Boolean (optional)
 */
(function () {
  'use strict';
    
  /**
   * Duck type constructor
   * @param {{name: String, test: Function}} options
   * @constructor DuckType
   */
  function DuckType(options) {
    this.name = options.name;
    this.test = options.test;
  }

  /**
   * Test whether an object matches this DuckType.
   * This function should be overwritten by the DuckType implementation
   * @param {*} object
   * @returns {boolean} match
   */
  DuckType.prototype.test = function (object) {
    return false;
  };

  /**
   * Test whether an object matches this DuckType.
   * Throws a TypeError when the object does not match.
   * @param {*} object
   */
  DuckType.prototype.validate = function (object) {
    if (!this.test(object)) {
      throw new TypeError(object + ' is not a valid ' + (this.name || 'type'));
    }
  };

  /**
   * Create a wrapper around the provided function. The wrapper first validates
   * the function arguments, and throws a TypeError if not correct.
   * When correct, the function will be executed.
   * @param {Function} fn
   * @returns {Function} wrapper
   */
  DuckType.prototype.wrap = function (fn) {
    var ducktype = this

    // TODO: test whether this DuckType is an Array
    // Alter the behavior of the ducktype in case of a test with zero or one arguments

    return function ducktypeWrapper() {
      ducktype.validate(arguments);
      return fn.apply(fn, arguments);
    };
  };

  // The object basic contains all basic types
  var basic = {};

  // type Array
  basic.array = new DuckType({
    name: 'Array',
    test: function isArray(object) {
      return (Array.isArray(object) ||
          ((object != null) && (object.toString() === '[object Arguments]')));
    }
  });

  // type Boolean
  basic.boolean = new DuckType({
    name: 'Boolean',
    test: function isBoolean(object) {
      return ((object instanceof Boolean) || (typeof object === 'boolean'));
    }
  });

  // type Date
  basic.date = new DuckType({
    name: 'Date',
    test: function isDate(object) {
      return (object instanceof Date);
    }
  });

  // type Function
  basic.function = new DuckType({
    name: 'Function',
    test: function isFunction(object) {
      return ((object instanceof Function) || (typeof object === 'function'));
    }
  });

  // type Number
  basic.number = new DuckType({
    name: 'Number',
    test: function isNumber(object) {
      return ((object instanceof Number) || (typeof object === 'number'));
    }
  });

  // type Object
  basic.object = new DuckType({
    name: 'Object',
    test: function isObject(object) {
      return ((object instanceof Object) && (object.constructor === Object));
    }
  });

  // type RegExp
  basic.regexp = new DuckType({
    name: 'RegExp',
    test: function isRegExp(object) {
      return (object instanceof RegExp);
    }
  });

  // type String
  basic.string = new DuckType({
    name: 'String',
    test: function isString(object) {
      return ((object instanceof String) || (typeof object === 'string'));
    }
  });

  // type null
  basic['null'] = new DuckType({
    name: 'null',
    test: function isNull(object) {
      return (object === null);
    }
  });

  // type undefined
  basic['undefined'] = new DuckType({
    name: 'undefined',
    test: function isUndefined(object) {
      return (object === undefined);
    }
  });

  // type url
  basic.url = new DuckType({
    name: 'url',
    test: isUrl
  });

  // type email
  // Be careful: when changing the regexp, double check whether it is still secure.
  // test with https://www.npmjs.com/package/vuln-regex-detector
  var emailRegExp = /^[a-zA-Z][\w.-]*[a-zA-Z0-9]@\w+\.[a-zA-Z]+$/;
  basic.email = new DuckType({
    name: 'email',
    test: function (object) {
      return emailRegExp.test(object);
    }
  });

  // type integer
  basic['integer'] = new DuckType({
    name: 'integer',
    test: function isInteger (object) {
      return ((object instanceof Number) || (typeof object === 'number')) &&
          (object === parseInt(object));
    }
  });

  // TODO: add types like phone number, postcode, ...

  /**
   * Create a ducktype handling an object
   * @param {Object} type
   * @param {{name: String}} [options]
   * @returns {*}
   */
  function createObject (type, options) {
    // retrieve the test functions for each of the objects properties
    var tests = {},
        prop;
    for (prop in type) {
      if (type.hasOwnProperty(prop)) {
        tests[prop] = ducktype(type[prop]).test;
      }
    }

    // non-empty object
    var isObject = basic.object.test;
    return new DuckType({
      name: options && options.name || null,
      test: function test (object) {
        var prop;
        
        // test whether we have an object
        if (!isObject(object)) {
          return false;
        }

        // test each of the defined properties
        for (prop in tests) {
          if (tests.hasOwnProperty(prop)) {
            if (!tests[prop](object[prop])) {
              return false;
            }
          }
        }
        return true;
      }
    });
  }

  /**
   * Create a ducktype handling an array
   * @param {Array} type     An array with multiple elements
   * @param {{name: String}} [options]
   * @returns {*}
   */
  function createArray (type, options) {
    // multiple childs, fixed length
    var tests = [];
    var isArray = basic.array.test;
    for (var i = 0, ii = type.length; i < ii; i++) {
      tests[i] = ducktype(type[i]).test;
    }

    // create the ducktype
    return new DuckType({
      name: options && options.name || null,
      test: function test (object) {
        // test whether object is an array
        if (!isArray(object)) {
          return false;
        }

        // test for correct length
        if (object.length !== tests.length) {
          return false;
        }

        // test all childs of the array
        for (var i = 0, ii = object.length; i < ii; i++) {
          if (!tests[i](object[i])) {
            return false;
          }
        }

        return true;
      }
    });

    // TODO: create an option length, length.min, length.max for the array.
    //       length can be an integer or a function
  }

  /**
   * Create a ducktype handling an array
   * @param {Array} type    An array containing one element
   * @param {{name: String}} [options]
   * @returns {*}
   */
  function createArrayRepeat (type, options) {
    // a single child, repeat for each child
    var childTest = ducktype(type[0]).test;

    // create the ducktype
    return new DuckType({
      name: options && options.name || null,
      test: function test (object) {
        // test whether object is an array
        if (!Array.isArray(object)) {
          return false;
        }

        // test all childs of the array
        for (var i = 0, ii = object.length; i < ii; i++) {
          if (!childTest(object[i])) {
            return false;
          }
        }
        return true;
      }
    });

    // TODO: create an option length, length.min, length.max for the array.
    //       length can be an integer or a function
  }

  /**
   * Create a ducktype handling a prototype
   * @param {Object} type   A prototype function
   * @param {{name: String}} [options]
   * @returns {*}
   */
  function createPrototype (type, options) {
    return new DuckType({
      name: options && options.name || null,
      test: function test (object) {
        return (object instanceof type);
      }
    });
  }

  /**
   * Create a ducktype handling a combination of types
   * @param {Array} types
   * @param {{name: String}} [options]
   * @returns {*}
   */
  function createCombi (types, options) {
    var tests = types.map(function (type) {
      return ducktype(type).test;
    });

    return new DuckType({
      name: options && options.name || null,
      test: function test (object) {
        for (var i = 0, ii = tests.length; i < ii; i++) {
          if (tests[i](object)) {
            return true;
          }
        }
        return false;
      }
    });
  }

  /**
   * Create a ducktype from a test function
   * @param {Function} test   A test function, returning true when a provided
   *                          object matches, or else returns false.
   * @param {{name: String}} [options]
   * @returns {*}
   */
  function createFunction (test, options) {
    return new DuckType({
      name: options && options.name || null,
      test: test
    });
  }

  /**
   * Create a ducktype from a regular expression. The created ducktype
   * will check whether the provided object is a String,
   * and matches with the regular expression
   * @param {RegExp} regexp   A regular expression
   * @param {{name: String}} [options]
   * @returns {*}
   */
  function createRegExp (regexp, options) {
    return new DuckType({
      name: options && options.name || null,
      test: function (object) {
        return ((object instanceof String) || typeof(object) === 'string') && regexp.test(object);
      }
    });
  }

  // TODO: document ducktype.construct(function) and ducktype.construct(regexp)

  /**
   * Create a new duck type. Syntax:
   *     ducktype(type)
   *     ducktype(type, options)
   *     ducktype(type1, type2, ...)
   *     ducktype(type1, type2, ..., options)
   *
   * Where:
   *    type    is a type description
   *    options is an object with properties:
   *        name: String      (optional)
   *        optional: Boolean (optional)
   *        nullable: Boolean (optional)
   *
   * @param {*...} args
   * @return {DuckType} ducktype
   */
  function ducktype (args) {
    // TODO: implement support for ducktype(test: Function) to create a custom type
    // TODO: implement support for ducktype(test: RegExp) to create a custom type

    var i, ii;
    var newDucktype;
    var type = null;
    var types = null;
    var options = null;
    var test;

    // process arguments
    if (arguments.length === 0) {
      throw new SyntaxError('Parameter type missing');
    }
    else if (arguments.length === 1) {
      type = arguments[0];
    }
    else {
      types = [];
      for (i = 0, ii = arguments.length; i < ii; i++) {
        if ((i === ii - 1) && arguments[i].constructor === Object) {
          options = arguments[i];
        }
        else {
          types[i] = arguments[i];
        }
      }

      if (types.length === 1) {
        type = types[0];
        types = null;
      }
    }

    // create a duck type
    if (types) {
      newDucktype = createCombi(types, options);
    }
    else if (type === Array) {
      newDucktype = basic.array;
    }
    else if (type === Boolean) {
      newDucktype = basic.boolean;
    }
    else if (type === Date) {
      newDucktype = basic.date;
    }
    else if (type === Function) {
      newDucktype = basic.function;
    }
    else if (type === Number) {
      newDucktype = basic.number;
    }
    else if (type === Object) {
      newDucktype = basic.object;
    }
    else if (type === String) {
      newDucktype = basic.string;
    }
    else if (type === RegExp) {
      newDucktype = basic.regexp;
    }
    else if (type === null) {
      newDucktype = basic['null'];
    }
    else if (type === undefined) {
      newDucktype = basic['undefined'];
    }
    else if (type instanceof DuckType) {
      newDucktype = type; // already a duck type
    }
    else if (Array.isArray(type)) {
      if (type.length === 0) {
        newDucktype = basic.array;
      }
      else if (type.length === 1) {
        newDucktype = createArrayRepeat(type, options);
      }
      else {
        newDucktype = createArray(type, options);
      }
    }
    else if ((type instanceof Object) && (type.constructor === Object)) {
      if (Object.keys(type).length === 0) {
        newDucktype = basic.object;
      }
      else {
        newDucktype = createObject(type, options);
      }
    }
    else {
      newDucktype = createPrototype(type, options);
    }

    // process options
    if (options) {
      test = newDucktype.test;
      var constructedTest = null;
      var tests = [];
      var name = options.name || newDucktype.name || null;

      if ((options.optional !== undefined) || (options.nullable !== undefined)) {
        var optional = (options.optional !== undefined) ? options.optional : false;
        var nullable = (options.nullable !== undefined) ? options.nullable : false;

        constructedTest = function (object) {
          return test(object) ||
              (nullable && (object === null)) ||
              (optional && (object === undefined));
        };
        tests.push(constructedTest);
      }
      else {
        tests.push(test);
      }

      if (options.integer === true) {
        tests.push(function test_integer (object) {
          return (object === parseInt(object));
        });
      }

      if (options.min !== undefined) {
        tests.push(function test_min (object) {
          return (object >= options.min);
        });
      }

      if (options.max !== undefined) {
        tests.push(function test_max (object) {
          return (object <= options.max);
        });
      }

      if (tests.length === 1) {
        // a single test
        newDucktype = new DuckType({
          name: name,
          test: tests[0]
        });
      }
      else {
        // multiple tests
        newDucktype = new DuckType({
          name: name,
          test: function (object) {
            for (var i = 0, ii = tests.length; i < ii; i++) {
              if (!tests[i](object)) {
                return false;
              }
            }
            return true;
          }
        });
      }
    }

    // return the created ducktype
    return newDucktype;
  }

  /**
   * Create a DuckType from a test function or regular expression
   * @param {String} [name]
   * @param {Function | RegExp} test
   * @return {DuckType} ducktype
   */
  // TODO: document ducktype.construct
  ducktype.construct = function construct(name, test) {
    if (arguments.length === 1) {
      test = arguments[0];
      name = null;
    }

    if (basic.function.test(test)) {
      // function
      return createFunction(test, {
        name: name
      });
    }
    else if (basic.regexp.test(test)) {
      // regexp
      return createRegExp(test, {
        name: name
      });
    }
    else {
      throw new TypeError('Function or RegExp expected');
    }
  };

  // attach each of the basic types to the ducktype function
  for (var type in basic) {
    if (basic.hasOwnProperty(type)) {
      ducktype[type] = basic[type];
    }
  }

  /**
   * RegExps.
   * A URL must match #1 and then at least one of #2/#3.
   * Use two levels of REs to avoid REDOS.
   */
  var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
  var localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
  var nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;

  /**
   * Loosely validate a URL `string`.
   *
   * Source: https://github.com/segmentio/is-url
   *
   * @param {String} string
   * @return {Boolean}
   */
  function isUrl(string){
    if (typeof string !== 'string') {
      return false;
    }

    var match = string.match(protocolAndDomainRE);
    if (!match) {
      return false;
    }

    var everythingAfterProtocol = match[1];
    if (!everythingAfterProtocol) {
      return false;
    }

    return localhostDomainRE.test(everythingAfterProtocol) ||
        nonLocalhostDomainRE.test(everythingAfterProtocol);
  }

  // TODO: implement a parser implements js type annotations

  // TODO: implement non-strict tests and an option strict

  /**
   * Shims for older JavaScript engines
   */

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  if(!Array.isArray) {
    Array.isArray = function (vArg) {
      return Object.prototype.toString.call(vArg) === '[object Array]';
    };
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = (function () {
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

      return function (obj) {
        if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

        var result = [];

        for (var prop in obj) {
          if (hasOwnProperty.call(obj, prop)) result.push(prop);
        }

        if (hasDontEnumBug) {
          for (var i=0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
          }
        }
        return result;
      };
    })();
  }

  /**
   * CommonJS module exports
   */
  if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = ducktype;
  }
  if (typeof exports !== 'undefined') {
    exports = ducktype;
  }

  /**
   * AMD module exports
   */
  if (typeof(define) === 'function') {
    define(ducktype);
  }

  /**
   * Browser exports
   */
  if (typeof(window)  !== 'undefined') {
    window['ducktype'] = ducktype;
  }
})();

