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
    // TODO: add a function testStrict
    this.name = options.name;
    this.test = options.test;
  }

  DuckType.prototype.test = function (object) {
    return false;
  };

  DuckType.prototype.validate = function (object) {
    if (!this.test(object)) {
      throw new TypeError(object + ' is not a valid ' + (this.name || 'type'));
    }
  };

  /**
   * Create a new duck type. Syntax:
   *     ducktype(type)
   *     ducktype(type, options)
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
        // TODO: error, every argument is an instance of Object
        if ((i == ii - 1) && arguments[i] instanceof Object) {
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
      console.log(types, tests)
    }
    else if (type === Boolean) {
      newDucktype = ducktype.boolean;
    }
    else if (type === Date) {
      newDucktype = ducktype.date;
    }
    else if (type === Function) {
      newDucktype = ducktype.function;
    }
    else if (type === Number) {
      newDucktype = ducktype.number;
    }
    else if (type === String) {
      newDucktype = ducktype.string;
    }
    // TODO: types null, undefined, Array, regexp, ...
    else if (type instanceof DuckType) {
      newDucktype = type; // already a duck type
    }
    else if (type instanceof Object) {
      tests = {};
      for (var prop in type) {
        if (type.hasOwnProperty(prop)) {
          tests[prop] = ducktype(type[prop]).test;
        }
      }

      newDucktype = new DuckType({
        name: options && options.name || null,
        test: function test (object) {
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
      // a build-int type expected such as Number, String, Date, ...
      // TODO: optimize by generating the function as new Function(str)
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
      // TODO: option strict

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

  /**
   * Test whether an object is a Number
   * @param {*} object
   * @returns {boolean} isNumber
   */
  function isNumber(object) {
    return ((object instanceof Number) || (typeof object === 'number'));
  }

  /**
   * Test whether an object is a String
   * @param {*} object
   * @returns {boolean} isString
   */
  function isString(object) {
    return ((object instanceof String) || (typeof object === 'string'));
  }

  /**
   * Test whether an object is a boolean
   * @param {*} object
   * @returns {boolean} isBoolean
   */
  function isBoolean(object) {
    return ((object instanceof Boolean) || (typeof object === 'boolean'));
  }

  /**
   * Test whether an object is a function
   * @param {*} object
   * @returns {boolean} isFunction
   */
  function isFunction(object) {
    return ((object instanceof Function) || (typeof object === 'function'));
  }

  /**
   * Test whether an object is a Date
   * @param {*} object
   * @returns {boolean} isDate
   */
  function isDate(object) {
    return (object instanceof Date);
  }

  /**
   * Test an object against a type.
   * Static test.
   * @param {*} type
   * @param {*} object
   * @param {boolean} [strict]
   * @return {boolean} match
   * @private
   */
  // TODO: remove function testAll (first take over the non-strict type tests
  function testAll (type, object, strict) {
    // selected type, replace the .test function
    if (strict === undefined) {
      strict = true;
    }

    // number
    if (type === Number) {
      return isNumber(object) ||
          (!strict && !isNaN(Number(object)));
    }

    // string
    if (type === String) {
      return isString(object) ||
          (!strict && (isNumber(object) || isBoolean(object) || isDate(object))); // TODO: allow more types to be converted to string
    }

    // function
    if (type === Function) {
      return isFunction(object); // TODO: non-strict for a function?
    }

    // boolean
    if (type === Boolean) {
      return ((object instanceof Boolean) ||
          (typeof object === 'boolean')) ||
          (!strict && (isNumber(object) ||
              !isNaN(Number(object)) ||
              (object === 'true') ||
              (object === 'false'))); // TODO: specify and test non-strict bool
    }

    // object
    if (type instanceof Object) { // TODO: not so good way to detect an object
      for (var prop in type) {
        if (type.hasOwnProperty(prop)) {
          if (!testAll(type[prop], object[prop], strict)) {
            return false;
          }
        }
      }

      return true;
    }

    // TODO: date
    // TODO: regexp
    // TODO: undefined
    // TODO: null
    // TODO: array

    return false;
  }

  // ducktype.test(type, object)     // TODO: add static method test
  ducktype.boolean  = new DuckType({name: 'Boolean',   test: isBoolean});
  ducktype.date     = new DuckType({name: 'Date',      test: isDate});
  ducktype.function = new DuckType({name: 'Function',  test: isFunction});
  ducktype.number   = new DuckType({name: 'Number',    test: isNumber});
  ducktype.string   = new DuckType({name: 'String',    test: isString});
  // TODO: add types like url, phone number, postcode, ...

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
  if (typeof(require) != 'undefined' && typeof(define) != 'undefined') {
    define(function () {
      return ducktype;
    });
  }

  /**
   * Browser exports
   */
  if (typeof(window) != 'undefined') {
    window['ducktype'] = ducktype;
  }
})();

