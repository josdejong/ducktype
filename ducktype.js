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
  /**
   * Duck type constructor
   * @param {{name: String, test: Function}} options
   * @constructor DuckType
   */
  function DuckType (options) {
    this.name = options.name;
    this.test = options.test;
  }

  /**
   * Test whether an object matches this DuckType
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

  // The object base contains all basic types
  var base = {};

  // type Array
  base.array = new DuckType({
    name: 'Array',
    test: function isArray(object) {
      return (Array.isArray(object) ||
          ((object != null) && (object.toString() === '[object Arguments]')));
    }
  });

  // type Boolean
  base.boolean = new DuckType({
    name: 'Boolean',
    test: function isBoolean(object) {
      return ((object instanceof Boolean) || (typeof object === 'boolean'));
    }
  });

  // type Date
  base.date = new DuckType({
    name: 'Date',
    test: function isDate(object) {
      return (object instanceof Date);
    }
  });

  // type Function
  base.function = new DuckType({
    name: 'Function',
    test: function isFunction(object) {
      return ((object instanceof Function) || (typeof object === 'function'));
    }
  });

  // type Number
  base.number = new DuckType({
    name: 'Number',
    test: function isNumber(object) {
      return ((object instanceof Number) || (typeof object === 'number'));
    }
  });

  // type Object
  base.object = new DuckType({
    name: 'Object',
    test: function isObject(object) {
      return ((object instanceof Object) && (object.constructor === Object));
    }
  });

  // type RegExp
  base.regexp = new DuckType({
    name: 'RegExp',
    test: function isRegExp(object) {
      return (object instanceof RegExp);
    }
  });

  // type String
  base.string = new DuckType({
    name: 'String',
    test: function isString(object) {
      return ((object instanceof String) || (typeof object === 'string'));
    }
  });

  // type null
  base['null'] = new DuckType({
    name: 'null',
    test: function isNull(object) {
      return (object === null);
    }
  });

  // type undefined
  base['undefined'] = new DuckType({
    name: 'undefined',
    test: function isUndefined(object) {
      return (object === undefined);
    }
  });

  // TODO: add types like url, phone number, email, postcode, ...

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

    var newDucktype;
    var type = null;
    var types = null;
    var options = null;
    var test, tests;

    // process arguments
    if (arguments.length == 0) {
      throw new SyntaxError('Parameter type missing');
    }
    else if (arguments.length == 1) {
      type = arguments[0];
    }
    else {
      types = [];
      for (var i = 0, ii = arguments.length; i < ii; i++) {
        // TODO: checking the last argument to be an object is a little tricky
        if ((i == ii - 1) && arguments[i].constructor === Object) {
          options = arguments[i];
        }
        else {
          types[i] = arguments[i];
        }
      }

      if (types.length == 1) {
        type = types[0];
        types = null;
      }
    }

    // create a duck type
    if (types) {
      tests = types.map(function (type) {
        return ducktype(type).test;
      });
      newDucktype = new DuckType({
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
    else if (type === Array) {
      newDucktype = base.array;
    }
    else if (type === Boolean) {
      newDucktype = base.boolean;
    }
    else if (type === Date) {
      newDucktype = base.date;
    }
    else if (type === Function) {
      newDucktype = base.function;
    }
    else if (type === Number) {
      newDucktype = base.number;
    }
    else if (type === Object) {
      newDucktype = base.object;
    }
    else if (type === String) {
      newDucktype = base.string;
    }
    else if (type === RegExp) {
      newDucktype = base.regexp;
    }
    else if (type === null) {
      newDucktype = base['null'];
    }
    else if (type === undefined) {
      newDucktype = base['undefined'];
    }
    else if (type instanceof DuckType) {
      newDucktype = type; // already a duck type
    }
    else if (Array.isArray(type)) {
      if (type.length != 1) {
        throw new Error('Array must contain one element');
      }
      // TODO: allow zero childs -> return types.array in that case
      // TODO: support multiple childs (so we can test function arguments)

      // create a test for the childs of the array
      var childTest = ducktype(type[0]).test;

      // create the ducktype
      newDucktype = new DuckType({
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
    }
    else if ((type instanceof Object) && (type.constructor === Object)) {
      // retrieve the test functions for each of the objects properties
      tests = {};
      for (var prop in type) {
        if (type.hasOwnProperty(prop)) {
          tests[prop] = ducktype(type[prop]).test;
        }
      }

      newDucktype = new DuckType({
        name: options && options.name || null,
        test: function test (object) {
          // TODO: how to prevent that ducktype({}).test(2) returns true?
          //       -> or give an error when the given object has no fields?
          //       -> or in case of no fields, just return ducktype.object?
          for (var prop in tests) {
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
    else {
      // A custom type, typically a prototype function.
      newDucktype = new DuckType({
        name: options && options.name || null,
        test: function test (object) {
          return (object instanceof type);
        }
      });
    }

    // process options
    if (options && ((options.optional !== undefined) || (options.nullable !== undefined))) {
      var optional = (options.optional !== undefined) ? options.optional : false;
      var nullable = (options.nullable !== undefined) ? options.nullable : false;
      // TODO: create an option strict

      test = newDucktype.test;
      newDucktype = new DuckType({
        name: options && options.name || newDucktype.name || null,
        test: function (object) {
          return test(object) ||
              ((object === null) && nullable) ||
              ((object === undefined) && optional);
        }
      });
    }

    // return the created ducktype
    return newDucktype;
  }

  // TODO: implement a parser implements js type annotations

  // TODO: implement non-strict tests and an option strict

  // TODO: how to accept a functions arguments as Array?

  /**
   * Shims for older JavaScript engines
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
   */
  if(!Array.isArray) {
    Array.isArray = function (vArg) {
      return Object.prototype.toString.call(vArg) === '[object Array]';
    };
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

